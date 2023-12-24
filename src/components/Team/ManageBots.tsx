import { FC, useEffect, useState, useContext } from "react";
import { Button } from "../Mixed/Button";
import { BotStructure, Team } from "../../types";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { borderColor } from "../../utils/theme/border";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderAndBg } from "../../utils/theme/border&bg";
import { UserContext } from "../../contexts/UserContext";
import { buttonColor } from "../../utils/theme/button";
import { RemoveTeamBot } from "./RemoveTeamBot";
import { BiArrowBack } from "react-icons/bi";;

export const TeamManageBots: FC<{ team?: Team }> = ({ team }) => {
    const [bots, setBots] = useState<BotStructure[] | null>(null);
    const [removeBot, setRemoveBot] = useState<boolean>(false);
    const [selectedBot, setSelectedBot] = useState<BotStructure | null>(null);

    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);

    const getTeamBots = async () => {
        const { data } = await api.getTeamBots(team?.id as string);

        return setBots(data ? data : null);
    };

    const getSelectedBot = (botId: string) => {
        const selbot = bots?.find(bot => bot.id == botId);

        return setSelectedBot(selbot as BotStructure);
    };

    useEffect(() => {
        if (user) {
            getTeamBots();
        }
    }, [user]);

    return team ? (
        <main className="flex items-center justify-start h-full w-full flex-col">
            <span className="text-center font-bold text-2xl">Gerenciar {(bots?.length as number) <= 1 ? "bot" : "bots"}</span>
            {selectedBot ? (
                <div className="flex items-center justify-start w-full">
                    <Button action={() => setSelectedBot(null)} clas="flex items-center justify-center gap-3"><BiArrowBack /> Voltar</Button>
                </div>
            ) : !bots ? (
                <div className="flex w-full items-center justify-start gap-2 text-lg mt-2">O time não tem bots para serem gerenciados</div>
            ) : !selectedBot && (
                <div className="flex flex-col gap-2 justify-start w-full mt-2">
                    <span className="text-start w-full text-lg">Selecione abaixo um bot para ser gerenciado</span>
                    <div className="flex items-center w-full gap-2 xl:flex-col">
                        {bots?.map((bot) => (
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
            {selectedBot ? (
                <section className={`w-full bg-neutral-900 mt-2 border-2 flex-row ${borderColor[color]} rounded-lg p-4`}>
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
                        <div className="flex flex-col gap-4">
                            <Button action={() => setRemoveBot(true)} clas={`${buttonColor["red"]}`}>Remover bot do time</Button>
                        </div>
                    </div>
                </section>
            ) : null}
            <section className={`transiton-opacity duration-300 ${removeBot ? "visible opacity-100" : "invisible opacity-0"}`}>
                {removeBot && <RemoveTeamBot teamID={team.id as string} bot={selectedBot as BotStructure} removeBot={removeBot} setRemoveBot={setRemoveBot} />}
            </section>
        </main>
    ) : (
        <div>Carregando...</div>
    )
};