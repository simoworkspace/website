import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { BotStructure } from "../../types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";


export const BotCard: React.FC<{ bot: BotStructure }> = ({ bot }) => {
    const { color } = useContext(ThemeContext);

    return (
        <Link
            to={`/bot/${bot._id}`}
            key={bot._id}
            className={`bg-neutral-950 duration-300 transition-colors text-white hover:bg-neutral-900 shadow-md shadow-black p-3 ${borderColor[color]} border-2 bg-neutral-940 rounded-lg`}
        >
            <img
                className="w-[min(100%,100px)] h-[min(100%,100px)] rounded-full mt-2 mr-2 float-right"
                src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png?size=2048`}
                alt={bot.name}
            />
            <h1 className="text-center text-[24px]">{bot.name}</h1>
            <div className="">
                {bot.shortDescription.length > 80
                    ? bot.shortDescription.slice(0, 80) + "..."
                    : bot.shortDescription}
            </div>
            <div className="mt-2 ml-2 mb-2 gap-2 flex flex-row">
                <Link
                    to={`https://discord.com/api/oauth2/authorize?client_id=${bot._id}&permissions=70368744177655&scope=bot%20applications.commands`}
                >
                    <button className="border-2 border-neutral-700 text-white bg-neutral-900 hover:bg-neutral-700 transition-colors duration-300 rounded-lg max-w-full max-h-full xl:w-[140px] w-[170px] h-[40px]">
                        Adicionar
                    </button>
                </Link>
                <Link to={`/vote/${bot._id}`}>
                    <button className="border-2 text-white border-neutral-700 bg-neutral-900 hover:bg-neutral-700 transition-colors duration-300 rounded-lg max-w-full max-h-full xl:w-[140px] w-[170px] h-[40px]">
                        Votar
                    </button>
                </Link>
            </div>
        </Link>
    );
}