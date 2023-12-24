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
import { Button } from "../Mixed/Button";
import { BiArrowBack } from "react-icons/bi";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const DashboardBot: React.FC = () => {
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const [bots, setBots] = useState<BotStructure[] | null>(null);
    const [selectedBot, setSelectedBot] = useState<BotStructure | null>(null);
    const [apiKey, setApiKey] = useState<string>("");
    const [apiKeyLoading, setApiKeyLoading] = useState<boolean>(false);
    const [deleteBot, setDeleteBot] = useState<boolean>(false);
    const [showApiKey, setShowApiKey] = useState<boolean>(false);

    const handleCreateApiKey = async () => {
        setApiKeyLoading(true);

        const { data: { api_key } } = await api.createApiKey(selectedBot?.id as string);
        setApiKey(api_key);

        setApiKeyLoading(false);
    };

    const getUserBots = async () => {
        const { data } = await api.getUserBots();

        return setBots(data ? data : null);
    };

    const getBotApiKey = async () => {
        const { data: { api_key } } = await api.getApiKey(selectedBot?.id as string);

        setApiKey(api_key || "");
    };

    const getSelectedBot = (botId: string) => {
        const selbot = bots?.find(bot => bot.id == botId);

        return setSelectedBot(selbot as BotStructure);
    };

    useEffect(() => {
        if (user) getUserBots();
    }, [user]);

    useEffect(() => {
        if (selectedBot) {
            getBotApiKey();
        }
    }, [selectedBot]);

    return bots ? (
        <main className="flex items-start justify-center h-full w-full flex-col">
            {selectedBot ? (
                <div className="flex items-center justify-start w-full xl:flex-col-reverse xl:gap-2">
                    <Button action={() => setSelectedBot(null)} clas="flex items-center justify-center gap-3 xl:w-full"><BiArrowBack /> Voltar</Button>
                    <div className="w-10/12 items-center justify-center flex">
                        <span className="font-bold text-2xl xl:text-base">Bot selecionado - {selectedBot.name}</span>
                    </div>
                </div>
            ) : bots.length === 0 ? (
                <div className="flex w-full items-center justify-start gap-2 text-lg">Você não tem bots, que tal adicionar um bot<Link className="text-blue-500 underline" to="/addbot">clicando aqui?</Link></div>
            ) : !selectedBot && (
                <div className="flex flex-col gap-2 w-full">
                    <span className="text-xl font-bold">Seus bots</span>
                    <Button link to="/addbot" clas="disabled:opacity-50 flex items-center justify-center gap-2 w-full"><iconBS.BsPlusLg size={22} />Adicionar um bot</Button>
                    <div className="flex xl:flex-col items-center w-full gap-2">
                        {bots.map((bot) => (
                            <button onClick={() => getSelectedBot(bot.id)} className="flex-col flex rounded-lg p-3 bg-neutral-800 items-center justify-center gap-3 transition duration-300 hover:bg-neutral-700">
                                <div className="flex gap-2 items-center justify-start w-full">
                                    <img onError={async ({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = (await import("../../assets/images/simo.png")).default;
                                    }} className="rounded-full w-12 h-12" src={`https://cdn.discordapp.com/avatars/${bot.id}/${bot.avatar}.png`} />
                                    <div className="flex gap-2 items-center flex-wrap">
                                        <span className="text-lg font-bold">{bot.name}</span>
                                        <span className="text-neutral-500 xl:hidden">({bot.id})</span>
                                    </div>
                                </div>
                                <div className="text-start">{bot.short_description}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
            {selectedBot && (
                <section className={`w-full bg-neutral-900 mt-2 border-2 flex-row ${borderColor[color]} rounded-lg p-4`}>
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2 text-white m-2">
                            <div className={`bg-neutral-900 w-full border-neutral-800 border-2 rounded-lg p-3 transition-colors hover:bg-[#1d1d1d] flex flex-col gap-3`} key={selectedBot.id}>
                                <Link to={`/bot/${selectedBot.id}`} className="flex flex-col gap-3">
                                    <div className="flex gap-2 items-center">
                                        <img onError={async ({ currentTarget }) => {
                                            currentTarget.onerror = null;
                                            currentTarget.src = (await import("../../assets/images/simo.png")).default;
                                        }} className="rounded-full w-12" src={`https://cdn.discordapp.com/avatars/${selectedBot.id}/${selectedBot.avatar}.png`} />
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
                            <span className="text-lg font-bold">Ações</span>
                            <div className="w-full flex flex-col gap-3 items-center justify-center">
                                <button onClick={() => setDeleteBot(true)} className={`flex flex-row items-center justify-center gap-3 p-3 w-full rounded-lg ${buttonColor["red"]} h-12 transition-colors duration-300 border-2`}>
                                    <iconBS.BsTrashFill />
                                    <span>Deletar bot</span>
                                </button>
                                <Link to={`/dashboard/edit/${selectedBot.id}`} className={`flex flex-row items-center justify-center gap-3 p-3 w-full rounded-lg ${buttonColor[color]} h-12 transition-colors duration-300 border-2`}>
                                    <iconMD.MdEditSquare />
                                    <span>Editar bot</span>
                                </Link>
                            </div>
                        </div>
                        <span className="text-lg font-bold">Chave de api</span>
                        <div className="flex flex-row xl:flex-col bg-neutral-800 w-full rounded-lg items-center">
                            <div className="flex gap-2 items-center justify-start w-full px-3">
                                <button onClick={() => setShowApiKey(!showApiKey)}>
                                    {showApiKey ? <FaEyeSlash size={22} /> : <FaEye size={22} />}
                                </button>
                                <input disabled value={showApiKey ? apiKey : apiKey.replaceAll(apiKey, "*".repeat(apiKey.length))} placeholder="Solicite uma nova api key" className="flex-grow p-2 bg-transparent xl:w-full" />
                            </div>
                            <div className="flex xl:w-full">
                                <Button clas="rounded-r-none" action={async () => {
                                    await navigator.clipboard.writeText(apiKey);
                                    alert("Copiado para área de transferências.")
                                }}>
                                    <iconMD.MdOutlineContentCopy fill="#fff" size={24} />
                                </Button>
                                <Button disabled={apiKeyLoading} action={handleCreateApiKey} clas="h-full xl:w-full items-center justify-center rounded-l-none">{apiKeyLoading ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={24} className="animate-spin" /> : apiKey ? "Atualizar" : "Gerar"}</Button>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <section className={`transiton-opacity duration-300 ${deleteBot ? "visible opacity-100" : "invisible opacity-0"}`}>
                {selectedBot && <DeleteBot setDeleteBot={setDeleteBot} deletebot={deleteBot} bot={selectedBot} />}
            </section>
        </main>
    ) : <div>Carregando...</div>
};
