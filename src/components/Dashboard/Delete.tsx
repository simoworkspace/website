import { FC, useEffect, useContext, useState } from "react";
import * as icon from "react-icons/bs";
import * as iconAI from "react-icons/ai";
import { BotStructure } from "../../types";
import { borderAndBg } from "../../utils/theme/border&bg";
import { ThemeContext } from "../../contexts/ThemeContext";
import { buttonColor } from "../../utils/theme/button";
import api from "../../utils/api";
import { PopUp } from "../Mixed/PopUp";

export const DeleteBot: FC<{
    setDeleteBot: (value: boolean) => void;
    deletebot: boolean
    bot: BotStructure;
}> = ({ setDeleteBot, bot, deletebot }) => {
    const { color } = useContext(ThemeContext);
    const [botName, setBotName] = useState<string>("");
    const [submit, setSubmit] = useState<boolean>(false);
    const [stars, setStars] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false);

    const deleteBot = async (): Promise<void> => {
        setLoading(true);

        await api.deleteBot(bot._id);

        setLoading(false);
        setDeleteBot(false);

        window.location.reload();
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setSubmit(false);

        const newBotName = event.target.value;
        setBotName(newBotName);

        if (newBotName === bot.name) {
            setSubmit(true);
        }
    };

    const getBotStars = async (): Promise<void> => {
        const res = await api.getBotFeedbacks(bot._id);
        const stars = res.data.map(a => a.stars);
        const count = stars.reduce((a, b) => (a as number) += (b as number));

        return setStars(Math.round((count as number) / stars.length));
    };

    useEffect(() => {
        getBotStars();
    }, []);

    return (
        <PopUp setMenu={setDeleteBot} menu={deletebot} >
            <div className="bg-neutral-700 w-full h-[30px] rounded-t-lg items-center justify-end flex flex-row-reverse">
                <button onClick={() => setDeleteBot(false)} className="mr-1">
                    <icon.BsX size={30} className="transition-colors duration-300 hover:fill-red-500" />
                </button>
                <span className="flex-grow flex text-center ml-[30px] gap-1">Deletar<strong>{bot.name}</strong></span>
            </div>
            <div className="flex h-full flex-col items-center w-full justify-center p-3 gap-4">
                <div className="flex flex-row justify-center gap-2 mt-2">
                    <img className="w-16 h-16 rounded-full" src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png?size=2048`} alt={`${bot.name}'s avatar`} />
                    <div className="flex flex-col justify-start items-start">
                        <span className="font-bold text-lg">{bot.name}</span>
                        <div className="flex flex-row gap-1">
                            {Array(stars).fill(0).map((_, index) => (
                                <icon.BsStarFill key={index} />
                            ))}
                            {Array(5 - stars).fill(0).map((_, index) => (
                                <icon.BsStar key={index} />
                            ))}
                        </div>
                    </div>
                </div>
                <span className="my-2">Se deseja mesmo deletar seu bot <strong>{bot.name}</strong>, digite o nome dele abaixo.</span>
                <div className="flex flex-col gap-1 items-center justify-center w-full">
                    <input placeholder="Digite aqui" required value={botName} onChange={handleInputChange} className={`bg-transparent p-2 rounded-lg focus:outline-none border-2 w-full ${borderAndBg[color]}`} type="text" />
                    <button onClick={deleteBot} disabled={!submit || loading} className={`${buttonColor["red"]} border-2 p-2 duration-300 trasition-all w-full flex items-center justify-center rounded-lg disabled:opacity-50 gap-1`}>
                        {loading ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={24} className="animate-spin" /> : <><icon.BsTrashFill /><span>Deletar</span></>}
                    </button>
                </div>
            </div>
        </PopUp>
    )
};