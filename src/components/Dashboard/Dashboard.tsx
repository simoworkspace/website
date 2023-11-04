import React, { useContext, useEffect, useState } from "react";
import { borderColor } from "../../utils/theme/border";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import * as iconMD from "react-icons/md";
import * as iconBS from "react-icons/bs";
import * as iconAI from "react-icons/ai";
import { BotStructure } from "../../types";
import { AxiosResponse } from "axios";
import api from "../../utils/api";
import { BotCard } from "../BotList/BotCard";
import { buttonColor } from "../../utils/theme/button";
import { Link } from "react-router-dom";
import { DeleteBot } from "./Delete";

export const DashboardComponent: React.FC = () => {
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const [selectBotMenu, setSelectBotMenu] = useState<boolean>(false);
    const [bots, setBots] = useState<BotStructure[]>();
    const [selectedBot, setSelectedBot] = useState<BotStructure | null>(null);
    const [apiKey, setApiKey] = useState<string>("");
    const [apiKeyLoading, setApiKeyLoading] = useState<boolean>(false);
    const [deleteBot, setDeleteBot] = useState<boolean>(false);

    const handleCreateApiKey = async (botId: string): Promise<void> => {
        if (apiKey) {
            await navigator.clipboard.writeText(apiKey);
            return alert("Copiado apikey para área de transferência.")
        };

        setApiKeyLoading(true);
        const req = await api.createApiKey(botId);
        setApiKey(req.data.api_key);
        return setApiKeyLoading(false);
    };

    const getUserBots = async (): Promise<void> => {
        const req: AxiosResponse<BotStructure[]> = await api.getAllBots();
        const bots = req.data.filter(bot => bot.owners.includes(user?.id as string));
        return setBots(bots);
    };

    const getSelectedBot = (botId: string): void => {
        const selbot = bots?.find(bot => bot._id == botId);
        setSelectBotMenu(false);
        return setSelectedBot(selbot as BotStructure);
    };

    useEffect(() => {
        if (user) {
            getUserBots();
        }
    }, [user]);

    return (
        <main className="max-w-[1500px] flex justify-start">
            <section className="w-screen flex flex-row p-5 text-white items-start justify-center gap-10 xl:flex-col">
                <div className={`${borderColor[color]} border-2 w-[300px] xl:h-[400px] h-[300px] xl:w-[90vw] rounded-lg bg-neutral-900 flex items-center justify-center flex-col`}>
                    <div>
                        <img className="rounded-full" src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`} alt={`${user?.username}'s Avatar`} />
                    </div>
                    <hr className="w-[80%] my-5" />
                    <div className="flex flex-col text-center justify-center">
                        <strong>{user?.username}</strong>
                        <span className="text-[#797979] items-center flex text-[13px] justify-center">
                            ( {user?.id} )
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-start h-full w-full flex-col">
                    <h1 className="text-[33px] text-center">Bem vindo a dashboard, <strong>{user?.username}</strong></h1>
                    <hr className="w-full my-3" />
                    <div className="w-full">
                        <button onClick={() => setSelectBotMenu(!selectBotMenu)} className={`bg-neutral-900 p-3 items-center justify-center flex flex-row ${borderColor[color]} rounded-lg border-2 w-full ${selectedBot ? "h-16" : "h-14"}`}>
                            {selectedBot ? (
                                <div className="flex items-center justify-start w-full gap-3 p-3">
                                    <img className="rounded-full w-12" src={`https://cdn.discordapp.com/avatars/${selectedBot._id}/${selectedBot.avatar}.png`} />
                                    <span className="text-xl">{selectedBot.name}</span>
                                    <span className="text-[#797979] items-center flex text-[13px] xl:invisible justify-center">
                                        ( {user?.id} )
                                    </span>
                                </div>
                            ) : <span className="flex flex-grow">Clique aqui para selecionar um bot para gerenciar.</span>}
                            <iconMD.MdOutlineKeyboardArrowDown className={`transition-all duration-300 ${selectBotMenu ? "rotate-180" : "rotate-0"}`} size={25} />
                        </button>
                    </div>
                    <div className="relative w-full">
                        <div className={`${selectBotMenu ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-300 w-full flex items-center justify-center`}>
                            {selectBotMenu && (
                                <div className={`bg-neutral-900 rounded-b-lg overflow-auto max-h-[300px] w-[95%] ${borderColor[color]} border-2 border-t-0 flex items-center flex-col gap-2 p-3`}>
                                    {bots?.map(bot => (
                                        <button onClick={() => getSelectedBot(bot._id)} className="flex xl:flex-col items-center justify-start w-full gap-3 p-3 transition-colors duration-300 hover:bg-neutral-800 rounded-lg">
                                            <img className="rounded-full w-20" src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png`} />
                                            <span className="text-xl">{bot.name}</span>
                                            <span className="text-[#797979] items-center flex text-[13px] justify-center">
                                                ( {user?.id} )
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    {selectedBot && (
                        <section className={`w-full bg-neutral-900 mt-2 border-2 flex-row ${borderColor[color]} rounded-lg p-4`}>
                            <div className="grid grid-cols-2 xl:grid-cols-1 gap-8 text-white m-2">
                                <BotCard bot={selectedBot} />
                                <div className="w-full flex flex-col gap-3">
                                    <button onClick={() => setDeleteBot(true)} className={`flex flex-row items-center justify-center gap-3 p-3 w-full rounded-lg ${buttonColor["red"]} h-12 transition-colors duration-300 border-2`}>
                                        <iconBS.BsTrashFill />
                                        <span>Deletar bot</span>
                                    </button>
                                    <Link to={`/dashboard/edit/${selectedBot._id}`} className={`flex flex-row items-center justify-center gap-3 p-3 w-full rounded-lg ${buttonColor[color]} h-12 transition-colors duration-300 border-2`}>
                                        <iconMD.MdEditSquare />
                                        <span>Editar bot</span>
                                    </Link>
                                    <div className="flex flex-row xl:flex-col bg-neutral-800 w-full h-full rounded-lg items-center">
                                        <input onAuxClick={async () => {
                                            await navigator.clipboard.writeText(apiKey);
                                        }} disabled value={apiKey} placeholder="Clique no botão para solicitar uma api key" className="flex-grow p-2 bg-transparent xl:break-words" />
                                        <button onClick={() => handleCreateApiKey(selectedBot._id)} className={`${buttonColor[color]} h-full border-2 transition-colors duration-300 rounded-r-lg p-2 xl:w-full xl:rounded-lg flex items-center justify-center`}>
                                            {apiKeyLoading ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={30} className="animate-spin" /> : apiKey ? <iconMD.MdOutlineContentCopy fill="#fff" size={22} /> : "Gerar"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </section>
            <section className={`transiton-opacity duration-300 ${deleteBot ? "visible opacity-100" : "invisible opacity-0"}`}>
                {selectedBot && <DeleteBot setDeleteBot={setDeleteBot} deletebot={deleteBot} bot={selectedBot} />}
            </section>
        </main>
    )
};
