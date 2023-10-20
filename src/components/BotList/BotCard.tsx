import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BotStructure } from "../../types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";
import * as icon from "react-icons/bs";

export const BotCard: React.FC<{ bot: BotStructure }> = ({ bot }) => {
    const { color } = useContext(ThemeContext);

    return (
        <Link
            to={`/bot/${bot._id}`}
            key={bot._id}
            className={`bg-neutral-950 duration-300 xl:h-full transition-colors text-white hover:bg-neutral-900 shadow-md shadow-black p-3 ${borderColor[color]} border-2 bg-neutral-940 rounded-lg`}
        >
            {!bot.approved && (
                <figure className="flex w-full h-0 items-center justify-end relative top-20 right-1">
                    <icon.BsClockFill className="fill-[#e8a60c]" size={23} />
                </figure>
            )}
            <img
                className="w-[100px] h-[100px] rounded-full mt-2 mr-2 float-right"
                src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png?size=2048`}
                alt={bot.name}
            />
            <h1 className="text-center text-[24px]">{bot.name}</h1>
            <div className="xlr:h-[50px] break-before-all w-[70%]">
                {bot.short_description.length > 80
                    ? bot.short_description.slice(0, 80) + "..."
                    : bot.short_description}
            </div>
            <div className="mt-2 ml-2 mb-2 gap-2 flex flex-row xl:ml-0">
                <a href={`https://discord.com/api/oauth2/authorize?client_id=${bot._id}&permissions=70368744177655&scope=bot%20applications.commands`} target="_blank" className="border-2 border-neutral-700 text-white bg-neutral-900 hover:bg-neutral-700 transition-colors duration-300 flex justify-center items-center rounded-lg max-w-full max-h-full xl:w-[100%] w-[170px] h-[40px]">
                    Adicionar
                </a>
                <Link className="border-2 text-white border-neutral-700 bg-neutral-900 hover:bg-neutral-700 transition-colors flex justify-center items-center duration-300 rounded-lg max-w-full max-h-full xl:w-[100%] w-[170px] h-[40px]" to={`/vote/${bot._id}`}>
                    Votar
                </Link>
            </div>
        </Link>
    );
}