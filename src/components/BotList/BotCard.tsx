import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BotStructure } from "../../types";
import { ThemeContext } from "../../contexts/ThemeContext";
import simo from "../../assets/images/simo.png";
import { TiArrowSortedUp } from "react-icons/ti";
import { borderAndBg } from "../../utils/theme/border&bg";
import { buttonColor } from "../../utils/theme/button";

export const BotCard: React.FC<{ bot: BotStructure }> = ({ bot }) => {
    const { color } = useContext(ThemeContext);

    return (
        <div className={`bg-neutral-900 w-full rounded-lg p-3 transition-colors ${color === "black" && "border-[#1d1d1d] border-2"} hover:bg-[#1d1d1d] flex flex-col gap-3 xl:w-[95vw]`} key={bot._id}>
            <Link to={`/bot/${bot._id}`} className="flex flex-col gap-3 h-full">
                <div className="flex gap-2 items-center">
                    <img className="rounded-full w-12" src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png`} onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = simo }} />
                    <div className="flex gap-2 flex-col">
                        <span className="font-bold text-lg">{bot.name}</span>
                        <div className="flex">
                            <TiArrowSortedUp size={20} />
                            <span className="text-sm">{bot.votes.reduce((votesCount, vote) => votesCount + vote.votes, 0)}</span>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 flex-col">
                    <div className="min-h-[48px]">
                        <span>{bot.short_description.length > 80
                            ? bot.short_description.slice(0, 80) + "..."
                            : bot.short_description}</span>
                    </div>
                    <div className="flex flex-row gap-1 flex-wrap">
                        {bot.tags.map((tag, index) => (
                            <div key={index} className={`${borderAndBg[color]} p-[6px] rounded-lg border-2`}>{tag}</div>
                        ))}
                    </div>
                </div>
            </Link>
            <div className="flex gap-3 w-full">
                <div className="flex w-full flex-grow">
                    <Link to={bot.invite_url} className={`${buttonColor[color]} text-center border-2 transition-all duration-300 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-default w-full bg-neutral-900`}>Adicionar</Link>
                </div>
                <div>
                    <Link to={`/vote/${bot._id}`} className={`${buttonColor[color]} text-center border-2 transition-all duration-300 text-white p-3 rounded-lg disabled:opacity-50 disabled:cursor-default px-5 flex gap-2 items-center justify-center w-full bg-neutral-900`}>
                        <span>Votar</span>
                        <TiArrowSortedUp size={22} />
                    </Link>
                </div>
            </div>
        </div>
    );
}