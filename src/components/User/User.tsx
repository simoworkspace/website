import React, { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import { Params, useParams } from "react-router-dom";
import { BotStructure, DiscordUser } from "../../types";
import { AxiosResponse } from "axios";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";
import { BotCard } from "../BotList/BotCard";
import { UserLoading } from "./UserLoading";

export const User: React.FC = () => {
    const params: Params = useParams<string>();
    const userid: string | undefined = params.userid;
    const [discordUser, setDiscordUser] = useState<DiscordUser>();
    const [userBots, setUserBots] = useState<BotStructure[]>();
    const { color } = useContext(ThemeContext);

    if (!userid) return window.location.href = "/";

    const getUserData: () => Promise<void> = async (): Promise<void> => {
        const req: AxiosResponse<DiscordUser> = await api.getDiscordUser(userid);
        return setDiscordUser(req.data);
    };

    const getUserBots: () => Promise<void> = async (): Promise<void> => {
        const req: AxiosResponse<BotStructure[]> = await api.getAllBots();
        const userBots = req.data.filter((bot: BotStructure) => bot.owners.includes(userid));
        return setUserBots(userBots);
    };

    useEffect(() => {
        getUserData();
        getUserBots();
    }, []);

    return (
        <main>
            {!discordUser || !userBots ? (
                <UserLoading />
            ) : (
                <section className="w-[100vw] flex flex-row p-5 text-white items-center justify-center gap-10 xl:flex-col">
                    <div className={`${borderColor[color]} border-2 w-[300px] h-[300px] xl:w-[90vw] rounded-lg bg-neutral-900 flex items-center justify-center flex-col`}>
                        <div>
                            <img className="rounded-full" src={`https://cdn.discordapp.com/avatars/${discordUser.id}/${discordUser.avatar}.png`} alt={`${discordUser.username}'s Avatar`} />
                        </div>
                        <hr className="w-[80%] my-5" />
                        <div className="flex flex-col text-center justify-center">
                            <strong>{discordUser.username}</strong>
                            <span className="text-[#797979] items-center flex text-[13px] justify-center">
                                ( {discordUser.id} )
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-[100%] flex-col">
                        <h1 className="text-[33px]">Perfil de <strong>{discordUser.username}</strong></h1>
                        <hr className="w-full my-3" />
                        <section className="w-full">
                            {userBots.length === 0 ? (
                                <div className="text-center text-[22px]">{discordUser.username} não tem bots para serem listados.</div>
                            ) : (
                                <div className="grid-cols-2 grid gap-8 text-white m-2 xl:grid-cols-1 xl:items-left xl:justify-left">
                                    {userBots.map((bot: BotStructure) => (<BotCard bot={bot} />))}
                                </div>
                            )}
                        </section>
                    </div>
                </section>
            )}
        </main>
    )
};