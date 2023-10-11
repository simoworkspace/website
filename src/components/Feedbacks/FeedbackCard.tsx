import React, { useContext, useState } from "react";
import { FeedbackStructure } from "../../types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";
import * as icon from "react-icons/bs";
import * as iconAI from "react-icons/ai";
import { UserContext } from "../../contexts/UserContext";
import api from "../../utils/api";
import axios, { AxiosResponse } from "axios";

export const FeedbackCard: React.FC<{ feedback: FeedbackStructure, botid: string, updateFeedbacks: () => Promise<void> }> = ({ feedback, botid, updateFeedbacks }) => {
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);

    const [deleted, setDeleted] = useState<boolean>(false);

    return (
        <div className={`bg-neutral-900 rounded-lg p-1 text-white break-words border-2 ${borderColor[color]}`}>
            <div className="flex flex-col p-3 gap-2">
                <div className="flex flex-row items-center justify w-[100%]">
                    <img
                        src={`https://cdn.discordapp.com/avatars/${feedback?.author.id}/${feedback?.author.avatar}.png?size=2048`}
                        alt={`${feedback?.author.username}'s avatar`}
                        className="w-[30px] h-[30px] rounded-full"
                    />
                    <div className="flex gap-2 items-center justify-center">
                        <span className="p-1 ml-1">{feedback?.author.username}</span>
                        <span className="text-neutral-500">{new Date(feedback.posted_at).toLocaleString().split(", ")[0]}</span>
                    </div>
                    {user?.id === feedback?.author.id && (
                        <button onClick={async () => {
                            setDeleted(true);
                            await api.deleteFeedback(botid, user?.id);
                            await updateFeedbacks();
                            setDeleted(false);
                        }} className="flex flex-grow justify-end">
                            {!deleted ? <icon.BsTrash size={20} className="hover:fill-red-500 transition-colors duration-300" /> : <iconAI.AiOutlineLoading3Quarters fill="#fff" size={20} className="animate-spin" />}
                        </button>
                    )}
                </div>
                <div className="py-2">{feedback.content}</div>
                <div className="flex flex-row gap-1">
                    {Array(feedback.stars).fill(0).map(() => (
                        <icon.BsStarFill />
                    ))}
                    {Array(5 - feedback.stars).fill(0).map((_, index) => (
                        <icon.BsStar />
                    ))}
                </div>
            </div>
        </div>
    )
}