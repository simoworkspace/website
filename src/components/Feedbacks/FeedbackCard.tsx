import React from "react";
import { FeedbackStructure } from "../../types";
import starIcon from "../../assets/svgs/star.svg";
import starIconFill from '../../assets/svgs/starfill.svg';

export const FeedbackCard: React.FC<{ feedback: FeedbackStructure }> = ({ feedback }) => {
    return (
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
    )
}