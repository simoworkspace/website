import { FC, useState, useContext } from "react";
import { BotStructure } from "../../types";
import { PopUp } from "../Mixed/PopUp";
import { borderAndBg } from "../../utils/theme/border&bg";
import * as iconAI from "react-icons/ai";
import api from "../../utils/api";
import { ThemeContext } from "../../contexts/ThemeContext";
import { buttonColor } from "../../utils/theme/button";
import * as icon from "react-icons/bs";
import { Params, useParams } from "react-router-dom";

export const RemoveTeamBot: FC<{
    setRemoveBot: (value: boolean) => void;
    removeBot: boolean
    bot: BotStructure;
    teamID: string
}> = ({ setRemoveBot, bot, removeBot, teamID }) => {
    const [submit, setSubmit] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [botName, setBotName] = useState<string>("");

    const { color } = useContext(ThemeContext);

    const removeBotFunc = async () => {
        setLoading(true);

        await api.removeBotTeam({
            botID: bot._id,
            teamID: teamID as string
        });

        setLoading(false);
        setRemoveBot(false);

        window.location.reload();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSubmit(false);

        const newBotName = event.target.value;
        setBotName(newBotName);

        if (newBotName === bot.name) {
            setSubmit(true);
        }
    };

    return (
        <PopUp setMenu={setRemoveBot} menu={removeBot} >
            <div className="bg-neutral-700 w-full h-[30px] rounded-t-lg items-center justify-end flex flex-row-reverse">
                <button onClick={() => setRemoveBot(false)} className="mr-1">
                    <icon.BsX size={30} className="transition-colors duration-300 hover:fill-red-500" />
                </button>
                <span className="flex-grow flex text-center ml-[30px] gap-1">Deletar<strong>{bot.name}</strong></span>
            </div>
            <div className="flex h-full flex-col items-center w-full justify-center p-3 gap-4">
                <div className="flex flex-row justify-center gap-2 mt-2">
                    <img onError={async ({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = (await import("../../assets/images/simo.png")).default;
                    }} className="w-16 h-16 rounded-full" src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png`} />
                    <div className="flex flex-col justify-center items-center">
                        <span className="font-bold text-lg">{bot.name}</span>
                    </div>
                </div>
                <div className="my-2 flex flex-col gap-2">
                    <span className="">Se deseja mesmo remover seu bot <strong>{bot.name}</strong> do time, digite o nome dele abaixo.</span>
                    <span className="text-yellow-500">Seu bot só será removido do time, não da sua conta.</span>
                </div>
                <div className="flex flex-col gap-1 items-center justify-center w-full">
                    <input placeholder="Digite aqui" required value={botName} onChange={handleInputChange} className={`bg-transparent p-2 rounded-lg focus:outline-none border-2 w-full ${borderAndBg[color]}`} type="text" />
                    <button onClick={removeBotFunc} disabled={!submit || loading} className={`${buttonColor["red"]} border-2 p-2 duration-300 trasition-all w-full flex items-center justify-center rounded-lg disabled:opacity-50 gap-1`}>
                        {loading ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={24} className="animate-spin" /> : <span>Remover</span>}
                    </button>
                </div>
            </div>
        </PopUp>
    )
}