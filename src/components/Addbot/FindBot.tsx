import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";
import { shadowColor } from "../../utils/theme/shadow";
import { BotStructure, DiscordUser, FindBotStructure } from "../../types";
import { AxiosResponse } from "axios";
import api from "../../utils/api";
import { buttonColor } from "../../utils/theme/button";

export const FindBot: React.FC<{
    setSteps: (value: number) => void;
    setBotData: (value: FindBotStructure) => void;
    botData: FindBotStructure | undefined;
}> = ({ setSteps, setBotData, botData }) => {
    const { color } = useContext(ThemeContext);

    const [id, setID] = useState<string>();
    const [isBot, setIsBot] = useState<boolean>(false);

    const [submit, setSubmit] = useState<boolean>(false);
    const [alreadyExists, setAlreadyExists] = useState<boolean>();

    const getBotData = async (botid: string): Promise<void> => {
        try {
            const req: AxiosResponse<DiscordUser> = await api.getDiscordUser(botid);
            const { id, avatar, username, flags } = req.data;
            const date: number = Math.round(new Date(id as any / 4194304 + 1420070400000).getTime() / 1000);
            const createdAt: string = new Date(date).toISOString();
            const allbots: AxiosResponse<BotStructure[]> = await api.getAllBots();
            const verified: boolean = (flags & (1 << 16)) !== 0;
            
            setIsBot(Object.keys(req.data).includes("bot"));
            setAlreadyExists(allbots.data.map((bot: BotStructure) => bot._id).includes(botid));

            setBotData({
                id: id,
                avatar: avatar,
                username: username,
                created_at: createdAt,
                discord_date: date,
                verified: verified
            });

        } catch {
            setIsBot(false);
        };
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setID(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        getBotData(id as string);
    };

    useEffect(() => {
        getBotData(id as string);
    }, [submit]);

    return (
        <section className="flex items-center justify-center w-screen h-[600px] p-3">
            <div className={`bg-neutral-900 ${borderColor[color]} border-2 ${shadowColor[color]} h-[400px] max-w-[1200px] w-[900px] rounded-lg shadow-md flex items-center justify-center flex-col p-4`}>
                <div className="text-white xl:text-[26px] text-[40px] mb-8 xl:m-0 xl:mb-8">
                    <h1 className="text-white flex flex-row mx-10">
                        <strong className="text-[#ffffff] text-[32px] xl:text-[28px] xl:mr-0">Adicione seu Bot</strong>
                    </h1>
                </div>
                {submit ? (
                    botData ? (
                        <>
                            {!alreadyExists && isBot ? (
                                <div className="flex flex-col items-center justify-center gap-3 p-3">
                                    <div className={`bg-neutral-800 flex p-2 xl:w-full h-[110px] items-center justify-center gap-3 rounded-lg border-2 ${borderColor[color]}`}>
                                        <img className="rounded-full w-[80px]" src={`https://cdn.discordapp.com/avatars/${botData.id}/${botData.avatar}.png`} alt={`${botData.username}'s Avatar`} />
                                        <div className="flex xl:flex-col gap-2 text-white">
                                            <span><strong>{botData.username}</strong></span>
                                            <span className="text-neutral-300">({botData.id})</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-3 flex-row-reverse">
                                        <button onClick={() => setSteps(1)} className={`text-white ${buttonColor[color]} p-2 rounded-lg w-[160px] transition-colors duration-300 border-2`}>Próximo paço</button>
                                        <button onClick={() => window.location.reload()} className={`text-white ${buttonColor[color]} p-2 rounded-lg w-[160px] transition-colors duration-300 border-2`}>Trocar ID</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-full flex-col flex items-center justify-center">
                                    <div className="text-white p-2 mb-1 bg-red-600 border-2 rounded-lg border-red-500 flex w-[50%] justify-center items-center">
                                        <span>{alreadyExists ? "Esse bot ja está na botlist." : "Digite um ID válido."}</span>
                                    </div>
                                    <div>
                                        <button onClick={() => window.location.reload()} className={`${buttonColor[color]} text-white transition-colors duration-300 w-[130px] p-2 border-2 rounded-lg`}>Voltar</button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={`bg-neutral-800 flex p-2 h-[110px] xl:w-[80vw] items-center justify-center gap-3 rounded-lg border-2 ${borderColor[color]}`}>
                            <div className="rounded-full w-[80px] h-[80px] bg-neutral-900 animate-pulse"></div>
                            <div className="flex gap-2 text-white flex-row xl:flex-col">
                                <div className="bg-neutral-900 w-[120px] h-[23px] rounded-full animate-pulse"></div>
                                <div className="text-neutral-300 flex flex-row animate-pulse">(<div className="bg-neutral-900 w-[180px] rounded-full"></div>)</div>
                            </div>
                        </div>
                    )
                ) : (
                    <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col gap-3">
                        <div className="text-white xl:w-[88vw] xl:flex-col flex-row flex">
                            <div className="w-[700px] xl:w-full break-words flex-col flex mr-2">
                                <div className="text-center">
                                    <strong>ID</strong>
                                </div>
                                <span className="text-center">Digite o id do bot que deseja ser enviado a análise.</span>
                            </div>
                            <div className="flex flex-col items-center w-full">
                                <div className={`justify-center flex outline-none bg-[#2c2c2c] w-full h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100  border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white text-white`}>
                                    <input required className="bg-transparent outline-none w-full" onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center w-full text-white">
                            <div className="flex justify-center flex-grow items-center m-4 xl:m-0 xl:mt-2">
                                <button type="submit" onClick={() => setSubmit(true)} className={`cursor-pointer xl:w-full w-[300px] transition-all duration-300 items-center border-2 rounded-xl h-[60px] text-white ${buttonColor[color]}`}>
                                    <span>Verificar ID</span>
                                </button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </section>
    )
};