import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";
import { shadowColor } from "../../utils/theme/shadow";
import { DiscordUser, UserStructure } from "../../types";
import { AxiosResponse } from "axios";
import api from "../../utils/api";
import { buttonColor } from "../../utils/theme/button";

export const FindBot: React.FC<{
    setSteps: (value: number) => void;
    setBotData: (value: UserStructure) => void;
    botData: UserStructure | undefined;
}> = ({ setSteps, setBotData, botData }) => {
    const { color } = useContext(ThemeContext);
    const [submit, setSubmit] = useState<boolean>(false);
    const [id, setID] = useState<string>();
    const [isBot, setIsBot] = useState<boolean>(false);

    const getBotData = async (botid: string): Promise<void> => {
        try {
            const req: AxiosResponse<DiscordUser> = await api.getDiscordUser(botid);
            const { id, avatar, username } = req.data;

            setIsBot(Object.keys(req.data).includes("bot"));

            setBotData({
                id: id,
                avatar: avatar,
                username: username
            });

        } catch (error) {
            setIsBot(false);
        };
    };

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setID(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();

        return getBotData(id as string);
    };

    useEffect(() => {
        getBotData(id as string);
    }, [submit]);

    return (
        <section className="flex items-center justify-center w-[100vw] h-[600px]">
            <div className={`bg-black ${borderColor[color]} border-2 ${shadowColor[color]} h-[400px] w-[80%] max-w-[1200px] rounded-lg shadow-md flex items-center justify-center flex-col`}>
                <h1 className="text-white xl:text-[26px] text-[40px] m-5">
                    <h1 className="text-white flex flex-row text-[32px] mx-10 my-3">
                        <strong className="text-[#ffffff] xl:text-[24px] xl:mr-0 mr-2">
                            Adicione seu Bot
                        </strong>
                    </h1>
                </h1>
                {submit ? (
                    botData ? (
                        <>
                            {isBot ? (
                                <div className="flex flex-col items-center justify-center gap-3">
                                    <div className={`bg-neutral-800 flex p-2 h-[110px] items-center justify-center gap-3 rounded-lg border-2 ${borderColor[color]}`}>
                                        <img className="rounded-full w-[80px]" src={`https://cdn.discordapp.com/avatars/${botData.id}/${botData.avatar}.png`} alt={`${botData.username}'s Avatar`} />
                                        <div className="flex gap-2 text-white">
                                            <span><strong>{botData.username}</strong></span>
                                            <span className="text-neutral-300">({botData.id})</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button onClick={() => setSteps(1)} className={`text-white ${buttonColor[color]} p-2 rounded-lg w-[160px] transition-colors duration-300 border-2`}>Próximo paço</button>
                                    </div>
                                </div>
                            ) : (
                                <div className="w-[100%] flex-col flex items-center justify-center">
                                    <div className="text-white p-2 mb-1 bg-red-600 border-2 rounded-lg border-red-500 flex w-[50%] justify-center items-center">
                                        <span>Digite um ID válido.</span>
                                    </div>
                                    <div>
                                        <button onClick={() => window.location.reload()} className={`${buttonColor[color]} text-white transition-colors duration-300 w-[130px] p-2 border-2 rounded-lg`}>Voltar</button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className={`bg-neutral-800 flex p-2 h-[110px] items-center justify-center gap-3 rounded-lg border-2 ${borderColor[color]}`}>
                            <div className="rounded-full w-[80px] h-[80px] bg-neutral-900 animate-pulse"></div>
                            <div className="flex gap-2 text-white flex-row">
                                <div className="bg-enutr bg-neutral-900 w-[120px] rounded-full animate-pulse"></div>
                                <span className="text-neutral-300 flex flex-row animate-pulse">(<div className="bg-neutral-900 w-[180px] rounded-full"></div>)</span>
                            </div>
                        </div>
                    )
                ) : (
                    <form onSubmit={handleSubmit} className="flex items-center justify-center flex-col">
                        <div className="text-white xl:w-[88vw] xl:flex-col flex-row flex">
                            <div className="w-[700px] xl:w-[100%] break-words flex-col flex mr-2">
                                <div className="text-center">
                                    <strong>ID</strong>
                                </div>
                                <span className="text-center">Digite o id do bot que deseja ser enviado a análise.</span>
                            </div>
                            <div className="flex flex-col items-center w-[100%]">
                                <div className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100  border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white text-white`}>
                                    <input className="bg-transparent outline-none w-[100%]" onChange={handleInputChange} />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-row items-center w-[100%] text-white">
                            <div className="flex justify-center flex-grow items-center xl:w-[80vw] m-4">
                                <button type="submit" onClick={() => setSubmit(true)} className="cursor-pointer focus:duration-0 transition-all duration-300 items-center border-neutral-700 bg-neutral-900 hover:bg-neutral-700 border-2 w-[300px] rounded-xl h-[60px] text-white focus:bg-neutral-700">
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