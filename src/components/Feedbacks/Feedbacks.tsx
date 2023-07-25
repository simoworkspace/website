import React, { useContext, useEffect, useState } from "react";
import { FeedbackStructure } from "../../types";
import api from "../../utils/api";
import { useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import starIcon from "../../assets/svgs/star.svg";
import starIconFill from '../../assets/svgs/starfill.svg';

export const Feedbacks: React.FC = () => {
    const [feedbacks, setFeedbacks] = useState<FeedbackStructure[]>();
    const params = useParams();
    const { user } = useContext(UserContext);

    const getBotFeedbacks = async (): Promise<void> => {
        const res = await api.getBotFeedbacks(params.botid as string);
        return setFeedbacks(res.data);
    };

    useEffect(() => { getBotFeedbacks(); }, []);

    return (
        <div className="w-[500px] flex flex-col gap-2">
            {feedbacks?.map(feedback => (
                <div className="h-[150px] bg-neutral-900 rounded-lg p-1 text-white break-words">
                    <div className="flex flex-col">
                        <div className="flex flex-row items-center m-1 justify">
                            <img
                                src={`https://cdn.discordapp.com/avatars/${feedback?.author.id}/${feedback?.author.avatar}.png?size=2048`}
                                alt={`${feedback?.author.username}'s avatar`}
                                className="w-[30px] h-[30px] rounded-full"
                            />
                            <span className="p-1">{feedback?.author.username}</span>
                        </div>
                        <div className="p-2">{feedback.content}</div>
                        <div className="flex flex-row">
                            {Array(feedback.stars).fill(0).map(() => (
                                <img src={starIconFill} alt="Star" />
                            ))}
                            {Array(5 - feedback.stars).fill(0).map((_, index) => (
                                <img key={index + feedback.stars} src={starIcon} alt="Empty Star" />
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
};