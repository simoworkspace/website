import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { BotStructure, DiscordUser } from "../../types";
import { UserContext } from "../../contexts/UserContext";
import api from '../../utils/api';
import { ThemeContext } from "../../contexts/ThemeContext";
import { VoteLoading } from "./Loading";
import { buttonColor } from "../../utils/theme/button";

export const VoteComponent: React.FC = () => {
    const { user } = useContext(UserContext);
    const { botid } = useParams<string>();
    const { color } = useContext(ThemeContext);

    const [voteStatus, setVoteStatus] = useState<{ can_vote: boolean; restTime: string; }>();
    const [discordBotData, setDiscordBotData] = useState<DiscordUser>();
    const [votes, setVotes] = useState<number>(0);
    const [voted, setVoted] = useState<boolean>();

    const getVoteStatus = async () => {
        const res: AxiosResponse<{ can_vote: boolean; restTime: string; }> = await api.voteStatus(botid as string, user?.id as string);
        return setVoteStatus(res.data);
    };

    const getVoteData = async () => {
        const res: AxiosResponse<BotStructure> = await api.getBotInfos(botid as string);
        let totalVotes = 0;
        res.data.votes.forEach(vote => totalVotes += vote.votes);
        setVotes(totalVotes);
    };

    const getDiscordBotData = async () => {
        const res: AxiosResponse<DiscordUser> = await api.getDiscordUser(botid as string);
        return setDiscordBotData(res.data);
    };

    const handleVote = async () => {
        await api.voteBot(user?.id as string, botid as string);
        getVoteData();
        setVoted(true);
        getVoteStatus();
        return;
    };

    useEffect(() => {
        getDiscordBotData();
        getVoteData();
    }, []);

    useEffect(() => {
        if (user) {
            getVoteStatus();
        };
    }, [user]);

    return user ? (
        discordBotData ? (
            <section className="text-white p-3 w-[100vw] flex flex-col items-center justify-center">
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
                <div className="flex xl:flex-col border-2 xl:w-[100%] xl:justify-center xl:items-center xl:h-[100%] w-[60vw] h-[80px] flex-row rounded-lg items-center bg-neutral-900">
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
                    <div className="flex justify-end xl:mb-3">
                        <button
                            className={`transition-all duration-300 border-2 rounded-xl ${buttonColor[color]} w-[100px] h-[50px] disabled:opacity-40`}
                            disabled={!voteStatus?.can_vote}
                            onClick={handleVote}
                        >Votar</button>
                    </div>
                </div>
            </section>
        ) : (
            <VoteLoading />
        )
    ) : (
        <section className="text-white p-3 w-[100vw] flex flex-col items-center justify-center">
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
    )
};
