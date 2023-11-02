import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { BotStructure, DiscordUser } from "../../types";
import { UserContext } from "../../contexts/UserContext";
import api from '../../utils/api';
import { ThemeContext } from "../../contexts/ThemeContext";
import { VoteLoading } from "./Loading";
import { buttonColor } from "../../utils/theme/button";
import { borderColor } from "../../utils/theme/border";
import * as icon from "react-icons/ai";
import { BotCard } from "../BotList/BotCard";
import { Botloading } from "../BotList/Botloading";

export const VoteComponent: React.FC = () => {
    const { user } = useContext(UserContext);
    const { botid } = useParams<string>();
    const { color } = useContext(ThemeContext);

    const [voteStatus, setVoteStatus] = useState<{ can_vote: boolean; restTime: string; }>();
    const [discordBotData, setDiscordBotData] = useState<DiscordUser>();
    const [votes, setVotes] = useState<number>(0);
    const [voted, setVoted] = useState<boolean>();
    const [clicked, setClicked] = useState<boolean>(false);
    const [bots, setBots] = useState<BotStructure[]>([]);
    const [botLoading, setBotLoading] = useState<boolean>(false);

    const getVoteStatus = async (): Promise<void> => {
        const res: AxiosResponse<{ can_vote: boolean; restTime: string; }> = await api.voteStatus(botid as string, user?.id as string);
        return setVoteStatus(res.data);
    };

    const getVoteData = async (): Promise<void> => {
        const res: AxiosResponse<BotStructure> = await api.getBotInfos(botid as string);
        setVotes(res.data.total_votes as number);
    };

    const getDiscordBotData = async (): Promise<void> => {
        const res: AxiosResponse<DiscordUser> = await api.getDiscordUser(botid as string);
        return setDiscordBotData(res.data);
    };

    const getRandomMinMax = (length: number): number[] => {
        const min = Math.floor(Math.random() * (length - 2));
        const max = min + 2;

        return [min, max];
    };

    const getSuggestedBots = async (): Promise<void> => {
        setBotLoading(true);

        const botCount = await api.getApiStatus();

        const [min, max] = getRandomMinMax(botCount.data.bots);

        const allBots = await api.getAllBots(min, max);

        setBots(allBots.data);

        setBotLoading(false);
    };

    const handleVote = async (): Promise<void> => {
        setClicked(true);
        await api.voteBot(user?.id as string, botid as string);
        getVoteData();
        getVoteStatus();
        setClicked(false);
        setVoted(true);
    };

    useEffect(() => {
        getDiscordBotData();
        getVoteData();
        getSuggestedBots();
    }, []);

    useEffect(() => {
        if (user) {
            getVoteStatus();
        };
    }, [user]);

    return (
        <>
            {user ? (
                discordBotData ? (
                    <section className="text-white p-3 w-screen flex flex-col items-center justify-center">
                        <div className="flex flex-row rounded-lg items-center gap-3 max-w-[900px] xl:text-center xl:flex-col xl:w-[80vw] p-4 justify-center">
                            <img
                                className="w-[100px] rounded-full"
                                src={`https://cdn.discordapp.com/avatars/${discordBotData?.id}/${discordBotData?.avatar}.png?size=2048`}
                                alt={`${discordBotData?.username}'s Avatar`}
                            />
                            <div>
                                <h1 className="flex text-2xl">Votar em {discordBotData?.username}</h1>
                                <span>Votos: {votes}</span>
                            </div>
                        </div>
                        <div className={`flex xl:flex-col border-2 ${borderColor[color]} xl:w-full xl:justify-center xl:items-center xl:h-full w-full h-[80px] flex-row rounded-lg items-center bg-neutral-900  max-w-[1500px]`}>
                            <span className="text-[20px] w-[82%] ml-3 xl:items-center xl:flex xl:justify-center xl:ml-0 xl:mb-2 xl:flex-col">{
                                voted
                                    ?
                                    <div className="xl:p-2 xl:text-center">
                                        <div>Voto confirmado com sucesso!</div>
                                        <span className="text-[14px]">Obrigado por votar em {discordBotData?.username}.</span>
                                    </div>
                                    : (
                                        voteStatus?.can_vote
                                            ? <span className="text-center p-2">Você pode votar agora!</span>
                                            : <span className="text-center p-2">Calma lá amigão, você ja votou hoje, volte amanhã.</span>
                                    )
                            }</span>
                            <div className="flex justify-end xl:mb-3 flex-grow mr-6">
                                <button
                                    className={`transition-all duration-300 border-2 rounded-xl ${buttonColor[color]} w-[100px] h-[50px] disabled:opacity-40 flex items-center justify-center`}
                                    disabled={!voteStatus?.can_vote || clicked}
                                    onClick={handleVote}
                                > {clicked ? <icon.AiOutlineLoading3Quarters fill="#fff" size={30} className="animate-spin" /> : "Votar"}</button>
                            </div>
                        </div>
                    </section>
                ) : (
                    <VoteLoading />
                )
            ) : (
                <section className="text-white p-3 w-screen flex flex-col items-center justify-center">
                    <div className="flex flex-row p-3 rounded-lg items-center gap-3">
                        <img
                            className="w-[100px] rounded-full"
                            src={`https://cdn.discordapp.com/avatars/${discordBotData?.id}/${discordBotData?.avatar}.png?size=2048`}
                            alt={`${discordBotData?.username}'s Avatar`}
                        />
                        <div>
                            <h1 className="flex text-2xl">Votar em {discordBotData?.username}</h1>
                            <span>Votos: {votes}</span>
                        </div>
                    </div>
                    <div className="flex border-2 w-[60vw] h-[80px] flex-row rounded-lg items-center bg-neutral-900 xl:flex-col xl:h-[160px] xl:justify-center xl:w-full">
                        <span className="text-[20px] w-[82%] ml-3 xl:flex xl:text-center xl:ml-0 xl:mb-3">Você precisar estar logado para poder votar.</span>
                        <div className="flex justify-end">
                            <button
                                className={`transition-all duration-300 border-2 rounded-xl ${buttonColor[color]} w-[100px] h-[50px] disabled:opacity-40`}
                                disabled
                                onClick={handleVote}
                            >Votar</button>
                        </div>
                    </div>
                </section>
            )}
            <section className="text-white p-3 w-screen flex flex-col items-center justify-center gap-4">
                <div className="w-screen max-w-[1500px] flex items-center justify-center flex-col">
                    <h1 className="font-extrabold text-white text-2xl">Bots sugeridos</h1>
                    <div className="grid grid-cols-2 xl:grid-cols-1 place-content-center gap-8 w-full p-3">
                        {botLoading ? (
                            <Botloading fills={2} grid />
                        ) : (
                            bots.map(bot => (<BotCard bot={bot} />))
                        )}
                    </div>
                </div>
            </section>
        </>
    )
};
