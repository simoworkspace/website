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
import { buttonColor } from "../../utils/theme/button";
import { RemoveTeamBot } from "./RemoveTeamBot";

export const TeamManageBots: FC<{ team?: Team }> = ({ team }) => {
    const [selectBotMenu, setSelectBotMenu] = useState<boolean>(false);
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
        const selbot = bots?.find(bot => bot._id == botId);
        setSelectBotMenu(false);
        return setSelectedBot(selbot as BotStructure);
    };

    useEffect(() => {
        if (user) {
            getTeamBots();
        }
    }, [user]);

    return team ? (
        <main className="flex items-center justify-start h-full w-full flex-col">
            <div className="w-full flex gap-3 flex-col">
                <span className="text-center font-bold text-2xl">Gerenciar bots</span>
                <button disabled={!!(bots?.length === 1 && selectedBot) || !bots} onClick={() => setSelectBotMenu(!selectBotMenu)} className={`bg-neutral-900 p-3 items-center justify-center flex flex-row ${borderColor[color]} rounded-lg border-2 w-full ${selectedBot ? "h-16" : "h-14"}`}>
                    {selectedBot ? (
                        <div className="flex items-center justify-start w-full gap-3 p-3">
                            <img className="rounded-full w-12" src={`https://cdn.discordapp.com/avatars/${selectedBot._id}/${selectedBot.avatar}.png`} />
                            <span className="text-xl">{selectedBot.name}</span>
                            <span className="text-[#797979] items-center flex text-[13px] xl:invisible justify-center">
                                ( {selectedBot?._id} )
                            </span>
                        </div>
                    ) : <span className="flex flex-grow">{bots ? "Clique aqui para selecionar um bot para gerenciar.":  "Esse time não tem bots."}</span>}
                    <iconMD.MdOutlineKeyboardArrowDown className={`transition-all duration-300 ${selectBotMenu ? "rotate-180" : "rotate-0"}`} size={25} />
                </button>
            </div>
            <div className="w-full">
                <div className={`${selectBotMenu ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-300 w-full flex items-center justify-center`}>
                    {selectBotMenu && (
                        <div className={`bg-neutral-900 rounded-b-lg overflow-auto max-h-[300px] w-[95%] ${borderColor[color]} border-2 border-t-0 flex items-center flex-col gap-2 p-3`}>
                            {bots?.map((bot, index) => (
                                <button key={index} onClick={() => getSelectedBot(bot._id)} className="flex xl:flex-col items-center justify-start w-full gap-3 p-3 transition-colors duration-300 hover:bg-neutral-800 rounded-lg">
                                    <img className="rounded-full w-20" src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png`} />
                                    <span className="text-xl">{bot.name}</span>
                                    <span className="text-[#797979] items-center flex text-[13px] justify-center">
                                        ( {bot._id} )
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
                        <div className="flex flex-col gap-4">
                            <Button action={() => setRemoveBot(true)} clas={`${buttonColor["red"]}`}>Remover bot do time</Button>
                        </div>
                    </div>
                </section>
            )}
            <section className={`transiton-opacity duration-300 ${removeBot ? "visible opacity-100" : "invisible opacity-0"}`}>
                {removeBot && <RemoveTeamBot teamID={team.id as string} bot={selectedBot as BotStructure} removeBot={removeBot} setRemoveBot={setRemoveBot} />}
            </section>
        </main>
    ) : (
        <div>Carregando...</div>
    )
};