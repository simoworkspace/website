import React, { useContext, useEffect, useState } from "react";
import { borderColor } from "../../utils/theme/border";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import * as iconMD from "react-icons/md";
import * as iconBS from "react-icons/bs";
import * as iconAI from "react-icons/ai";
import { BotStructure } from "../../types";
import api from "../../utils/api";
import { buttonColor } from "../../utils/theme/button";
import { Link } from "react-router-dom";
import { DeleteBot } from "./Delete";
import { borderAndBg } from "../../utils/theme/border&bg";

export const DashboardBot: React.FC = () => {
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const [selectBotMenu, setSelectBotMenu] = useState<boolean>(false);
    const [bots, setBots] = useState<BotStructure[] | null>(null);
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

    const getUserBots = async () => {
        const { data } = await api.getUserBots();

        if (data.length === 1) {
            return setSelectedBot(data[0]);
        }

        return setBots(data ? data : null);
    };

    const getSelectedBot = (botId: string) => {
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
        <main className="flex items-center justify-start h-full w-full flex-col">
            <div className="w-full">
                <button disabled={bots?.length === 1 || !bots} onClick={() => setSelectBotMenu(!selectBotMenu)} className={`bg-neutral-900 p-3 items-center justify-center flex flex-row ${borderColor[color]} rounded-lg border-2 w-full ${selectedBot ? "h-16" : "h-14"}`}>
                    {selectedBot ? (
                        <div className="flex items-center justify-start w-full gap-3 p-3">
                            <img className="rounded-full w-12" src={`https://cdn.discordapp.com/avatars/${selectedBot._id}/${selectedBot.avatar}.png`} />
                            <span className="text-xl">{selectedBot.name}</span>
                            <span className="text-[#797979] items-center flex text-[13px] xl:invisible justify-center">
                                ( {user?._id} )
                            </span>
                        </div>
                    ) : <span className="flex flex-grow">Clique aqui para selecionar um bot para gerenciar.</span>}
                    <iconMD.MdOutlineKeyboardArrowDown className={`transition-all duration-300 ${selectBotMenu ? "rotate-180" : "rotate-0"}`} size={25} />
                </button>
            </div>
            <div className="relative w-full">
                <div className={`${selectBotMenu ? "opacity-100 visible" : "opacity-0 invisible"} relative transition-all duration-300 w-full flex items-center justify-center`}>
                    {selectBotMenu && (
                        <div className={`bg-neutral-900 absolute top-0 rounded-b-lg overflow-auto max-h-[300px] w-[95%] ${borderColor[color]} border-2 border-t-0 flex items-center flex-col gap-2 p-3`}>
                            {bots?.map((bot, index) => (
                                <button key={index} onClick={() => getSelectedBot(bot._id)} className="flex xl:flex-col items-center justify-start w-full gap-3 p-3 transition-colors duration-300 hover:bg-neutral-800 rounded-lg">
                                    <img className="rounded-full w-20" src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png`} />
                                    <span className="text-xl">{bot.name}</span>
                                    <span className="text-[#797979] items-center flex text-[13px] justify-center">
                                        ( {user?._id} )
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
                        <div className={`bg-neutral-900 w-full border-neutral-800 border-2 rounded-lg p-3 transition-colors hover:bg-[#1d1d1d] flex flex-col gap-3`} key={selectedBot._id}>
                            <Link to={`/bot/${selectedBot._id}`} className="flex flex-col gap-3">
                                <div className="flex gap-2 items-center">
                                    <img className="rounded-full w-12" src={`https://cdn.discordapp.com/avatars/${selectedBot._id}/${selectedBot.avatar}.png`} />
                                    <div className="flex gap-2 flex-col">
                                        <span className="font-bold text-lg">{selectedBot.name}</span>
                                    </div>
                                </div>
                                <div className="flex gap-3 flex-col">
                                    <span className="min-h-[48px] break-before-auto">{selectedBot.short_description}</span>
                                    <div className="flex flex-row gap-1 flex-wrap">
                                        {selectedBot.tags.map((tag, index) => (
                                            <div key={index} className={`${borderAndBg[color]} p-[6px] rounded-lg border-2`}>{tag}</div>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        </div>
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
            <section className={`transiton-opacity duration-300 ${deleteBot ? "visible opacity-100" : "invisible opacity-0"}`}>
                {selectedBot && <DeleteBot setDeleteBot={setDeleteBot} deletebot={deleteBot} bot={selectedBot} />}
            </section>
        </main>
    )
};
