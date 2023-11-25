import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BotStructure } from "../../types";
import { ThemeContext } from "../../contexts/ThemeContext";
import simo from "../../assets/images/simo.png";
import { TiArrowSortedUp } from "react-icons/ti";
import { borderColor } from "../../utils/theme/border";
import * as icon from "react-icons/bs";
import { Button } from "../Mixed/Button";
import { borderAndBg } from "../../utils/theme/border&bg";

export const BotCard: React.FC<{ bot: BotStructure }> = ({ bot }) => {
    const { color } = useContext(ThemeContext);

    return (
        <div className="bg-neutral-900 w-full border-2 border-neutral-800 rounded-lg p-3 transition-colors hover:bg-[#1d1d1d] flex flex-col gap-3 xl:w-[95vw]" key={bot._id}>
            <Link to={`/bot/${bot._id}`} className="flex flex-col gap-3">
                <div className="flex gap-2 items-center">
                    {!bot.approved && (
                        <figure className="flex w-full h-0 items-center justify-end relative top-20 right-1">
                            <icon.BsClockFill className="fill-[#e8a60c]" size={23} />
                        </figure>
                    )}
                    <img className="rounded-full w-12" src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png`} onError={({ currentTarget }) => { currentTarget.onerror = null; currentTarget.src = simo }} />
                    <div className="flex gap-2 flex-col">
                        <span className="font-bold text-lg">{bot.name}</span>
                        <div className="flex gap-1">
                            <TiArrowSortedUp size={22} />
                            <span className="text-sm">{bot.total_votes}</span>                            
                        </div>
                    </div>
                </div>
                <div className="flex gap-3 flex-col">
                    <span className="min-h-[48px]">{bot.short_description}</span>
                    <div className="flex flex-row gap-3 flex-wrap">
                        {bot.tags.map(tag => (
                            <div className={`${borderAndBg[color]} p-[6px] rounded-lg border-2`}>{tag}</div>
                        ))}
                    </div>
                </div>
            </Link>
            <div className="flex gap-3 p-y2">
                <Button clas="w-full p-1">Adicionar</Button>
                <Button link to={`/vote/${bot._id}`} clas="px-5 flex gap-2 items-center justify-center w-[25%] xl:w-full">
                    <span>Votar</span>
                    <TiArrowSortedUp size={22} />
                </Button>
            </div>
        </div>
    );
}
/*
src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png`}
*/