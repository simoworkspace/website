import { FC, useEffect, useState, useContext } from "react";
import { Button } from "../Mixed/Button";
import { BotStructure, Team } from "../../types";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { borderColor } from "../../utils/theme/border";
import { ThemeContext } from "../../contexts/ThemeContext";
import * as iconMD from "react-icons/md";
import { borderAndBg } from "../../utils/theme/border&bg";
import { UserContext } from "../../contexts/UserContext";
import * as iconAI from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsPlusLg } from "react-icons/bs";

export const TeamAddbot: FC<{ team?: Team }> = ({ team }) => {
    const [bots, setBots] = useState<BotStructure[] | null>(null);
    const [selectedBot, setSelectedBot] = useState<BotStructure | null>(null);
    const [addbotLoading, setAddbotLoading] = useState<boolean>();
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);

    const getUserBots = async () => {
        const data = (await api.getUserBots()).data.filter((bot) => !bot.team_id);

        return setBots(data ? data : null);
    };

    const addBot = async () => {
        setAddbotLoading(true);

        await api.teamAddBot({
            botID: selectedBot?._id as string,
            teamID: team?.id as string
        });

        setAddbotLoading(false);

        setInterval(() => {
            window.location.reload();
        }, 2_000);
    };

    const getSelectedBot = (botId: string) => {
        const selbot = bots?.find(bot => bot._id === botId);

        return setSelectedBot(selbot as BotStructure);
    };

    useEffect(() => {
        if (user) {
            getUserBots();
        }
    }, [user]);

    return team && bots ? (
        <>
            <main className="flex items-center justify-start h-full w-full flex-col">
                <span className="text-center font-bold text-2xl">Adicionar bot</span>
                {selectedBot ? (
                    <div className="flex items-center justify-start w-full">
                        <Button action={() => setSelectedBot(null)} clas="flex items-center justify-center gap-3"><BiArrowBack /> Voltar</Button>
                    </div>
                ) : bots.length === 0 ? (
                    <div className="flex w-full items-center justify-start gap-2 text-lg">Você não tem bots adicionados que não pertençam a um time</div>
                ) : !selectedBot && (
                    <div className="flex flex-col gap-2 justify-start w-full mt-2">
                        <span className="text-start w-full text-lg">Selecione abaixo um bot para ser adicionado no time</span>
                        <div className="flex items-center w-full gap-2 xl:flex-col">
                            {bots.map((bot) => (
                                <button onClick={() => getSelectedBot(bot._id)} className="flex-col flex rounded-lg p-3 bg-neutral-800 items-center justify-center gap-3 transition duration-300 hover:bg-neutral-700">
                                    <div className="flex gap-2 items-center justify-start w-full">
                                        <img className="rounded-full w-12 h-12" src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png`} />
                                        <div className="flex gap-2 items-center flex-wrap">
                                            <span className="text-lg font-bold">{bot.name}</span>
                                            <span className="text-neutral-500 xl:hidden">({bot._id})</span>
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
                            <div className="flex flex-col gap-4">
                                <span className="text-lg">Você deseja mesmo adicionar seu bot <strong>{selectedBot.name}</strong> no time <strong>{team.name}</strong> ? <span className="text-yellow-300">seu bot não será removido do seu perfil, ele só será adicionado no time, você continua sendo dono dele.</span></span>
                                <Button clas="flex justify-center items-center" disabled={addbotLoading || addbotLoading === false} action={addBot}>{addbotLoading ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={24} className="animate-spin" /> : "Adicionar"}</Button>
                                {addbotLoading === false && <span className="text-green-600">Bot adicionado no time!</span>}
                            </div>
                        </div>
                    </section>
                )}
            </main>
        </>
    ) : (
        <div>Carregando...</div>
    )
};