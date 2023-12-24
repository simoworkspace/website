import React, { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import { Params, useParams } from "react-router-dom";
import { BotStructure, UserStructure } from "../../types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";
import { BotCard } from "../BotList/BotCard";
import { UserLoading } from "./UserLoading";
import simo from "../../assets/images/simo.png";
import { CopyButton } from "../Mixed/Copy";
import { Badges } from "../Badges/Badges";

export const User: React.FC = () => {
    const params: Params = useParams<string>();
    const userid: string = params.userid as string;
    const [user, setUser] = useState<UserStructure>();
    const [userBots, setUserBots] = useState<BotStructure[]>([]);
    const { color } = useContext(ThemeContext);

    const getUserData = async () => {
        try {
            const { data } = await api.getUserFromDB(userid);
            const bots = await api.getAllBots();
            const userBots = bots.data.filter((bot) => bot.owner_id === userid);

            setUserBots(userBots);
            setUser(data);
        } catch (error) {
            console.error(error);
            window.location.href = "/";
        }
    };

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <main className="max-w-[1500px] flex justify-center">
            {!user ? (
                <UserLoading />
            ) : (
                <section className="w-screen flex flex-row p-5 text-white items-start xl:items-center justify-center gap-10 xl:flex-col">
                    <div className={`${borderColor[color]} border-2 ${user.banner_url ? "min-h-[230px]" : "p-6"} ${(user?.flags > 0 && user.banner_url) && "min-h-[300px]"} w-[300px] xl:w-[90vw] rounded-lg bg-neutral-900 flex justify-start flex-col gap-4 relative`}>
                        {user.banner_url && (
                            <img className="w-full h-36 object-cover rounded-md rounded-b-none z-0 mb-[80px]" src={user.banner_url} alt="Possible banner" />
                        )}
                        <div className={`w-full items-center flex justify-center ${user.banner_url && "z-1 absolute top-[50%] left-0 transform -translate-y-1/2"}`}>
                            <img
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = simo;
                                }}
                                className="rounded-full w-32" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                                alt={`${user.username}'s Avatar`}
                            />
                        </div>
                        <div className="flex justify-center gap-2 z-2 relative px-3">
                            <strong>{user.username}</strong>
                            <CopyButton name="ID" text={user.id} key={Math.random()} />
                        </div>
                        <div>
                        {user.flags > 0 && <Badges key={Math.random()} flags={user.flags}/>}
                    </div>
                    </div>
                    <div className="flex items-start w-full flex-col gap-2">
                        <h1 className="text-[33px]">Perfil de <strong>{user.username}</strong></h1>
                        {user?.bio && <span className={user.bio.includes(" ") ? "break-words" : "break-all"}>{user.bio}</span>}
                        <hr className="w-full my-3" />
                        <div className="w-full flex xl:items-center xl:justify-center">
                            {userBots.length === 0 ? (
                                <div className="text-center text-[22px]">{user.username} não tem bots para serem listados.</div>
                            ) : (
                                <div className="grid-cols-2 grid gap-8 text-white m-2 xl:grid-cols-1 xl:place-items-center xl:w-[95vw]">
                                    {userBots.map((bot: BotStructure, index: number) => (<BotCard key={index} bot={bot} />))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
};