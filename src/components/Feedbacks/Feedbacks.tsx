import React, { useEffect, useState, useContext } from "react";
import { FeedbackStructure } from "../../types";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import { FeedbackCard } from "./FeedbackCard";
import * as icon from "react-icons/bs";
import * as iconAI from "react-icons/ai";
import { borderColor } from "../../utils/theme/border";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import { buttonColor } from "../../utils/theme/button";

export const Feedbacks: React.FC<{ botid: string }> = ({ botid }) => {
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);

    const [rating, setRating] = useState<number>(1);
    const [feedback, setFeedback] = useState<string>("");
    const [feedbackSent, setFeedbackSent] = useState<boolean>(false);
    const [submited, setSubmited] = useState<boolean>(false);

    const handleStarClick = (selectedRating: number) => {
        setRating(selectedRating);
    };

    const [feedbacks, setFeedbacks] = useState<FeedbackStructure[]>();
    const params = useParams();

    const getBotFeedbacks = async (): Promise<void> => {
        const res = await api.getBotFeedbacks(params.botid as string);
        return setFeedbacks(res.data);
    };

    useEffect(() => { getBotFeedbacks(); }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setSubmited(true);

        await api.postFeedback(rating, new Date().toISOString(), feedback, botid, user?.id as string).catch(() => {
            setFeedbackSent(true)
            setSubmited(false);
        });

        await getBotFeedbacks();
        setSubmited(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
        event.preventDefault();

        setFeedback(event.target.value);
    };

    return (
        <div className="w-[100vw] max-w-[1500px] flex flex-row ml-[150px] mb-[30px] text-white gap-5">
            <div className="flex flex-col gap-2 w-[500px]">
                <span className="text-[26px] mb-2"><strong>Envie seu feedback!</strong></span>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <div className={`bg-neutral-800 rounded-lg ${borderColor[color]} border-2 text-white w-[500px]`}>
                        <textarea rows={4} onChange={handleChange} className="bg-transparent w-[100%] focus:outline-none p-2" cols={22} required placeholder="Digite aqui" maxLength={500} />
                    </div>
                    <div className="flex flex-row gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span onClick={() => handleStarClick(star)} className="cursor-pointer">
                                {star <= rating ? <icon.BsFillStarFill size={30} fill="#fff" /> : <icon.BsStar size={30} fill="#fff" />}
                            </span>
                        ))}
                    </div>
                    <div className="flex gap-3 items-center justify-center">
                        <input disabled={submited} className={`disabled:cursor-default disabled:opacity-70 border-2 duration-300 transition-all cursor-pointer ${buttonColor[color]} p-3 rounded-lg w-[100%] text-white`} type="submit" value="Enviar" />
                        {submited && <iconAI.AiOutlineLoading3Quarters fill="#fff" size={30} className="animate-spin" />}
                    </div>
                </form>
                {feedbackSent && (<div className="text-red-500">Você já enviou um feedback.</div>)}
            </div>
            <div className="w-[500px] flex flex-col gap-2">
                <span className="text-[26px] mb-2"><strong>Feedbacks</strong></span>
                {feedbacks ? (
                    feedbacks?.map(feedback => (<FeedbackCard feedback={feedback} botid={botid} updateFeedbacks={getBotFeedbacks} />))
                ) : (
                    <div>Sem feedbacks.</div>
                )}
            </div>
        </div>
    )
};