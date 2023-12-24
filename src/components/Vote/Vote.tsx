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

    const [voteStatus, setVoteStatus] = useState<{ can_vote: boolean; rest_time: number; }>();
    const [botData, setBotData] = useState<BotStructure>();
    const [votes, setVotes] = useState<number>(0);
    const [voted, setVoted] = useState<boolean>();
    const [clicked, setClicked] = useState<boolean>(false);
    const [bots, setBots] = useState<BotStructure[]>([]);
    const [botLoading, setBotLoading] = useState<boolean>(false);
    const [restTime, setRestTime] = useState<number>();

    const getVoteStatus = async (): Promise<void> => {
        const { data: { rest_time }, data } = await api.voteStatus(botid as string);

        const timestamp = Math.floor((rest_time / 1000) / 3600);

        setRestTime(timestamp);

        return setVoteStatus(data);
    };
    const getVoteData = async () => {
        const { data: { votes }, data } = await api.getBotInfos(botid as string);

        setBotData(data);
        setVotes(votes.reduce((votesCount, vote) => votesCount + vote.votes, 0) as number);
    };

    const getRandomMinMax = (length: number): number[] => {
        const min = Math.floor(Math.random() * (length - 2));
        const max = min + 2;

        return [min, max];
    };

    const getSuggestedBots = async () => {
        setBotLoading(true);

        const botCount = await api.getApiStatus();

        const [min, max] = getRandomMinMax(botCount.data.bots);

        const allBots = await api.getAllBots(min, max);

        setBots(allBots.data);

        setBotLoading(false);
    };

    const handleVote = async () => {
        setClicked(true);
        await api.voteBot(user?.id as string, botid as string);
        getVoteData();
        getVoteStatus();
        setClicked(false);
        setVoted(true);
    };

    useEffect(() => {
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
            {
                botData && voteStatus ? (
                    <section className="text-white p-3 w-screen flex flex-col items-center justify-center">
                        <div className="flex flex-row rounded-lg items-center gap-3 max-w-[900px] xl:text-center xl:flex-col xl:w-[80vw] p-4 justify-center">
                            <img
                                onError={async ({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = (await import("../../assets/images/simo.png")).default;
                                }}
                                className="w-[100px] rounded-full"
                                src={`https://cdn.discordapp.com/avatars/${botData.id}/${botData.avatar}.png?size=2048`}
                                alt={`${botData.name}'s Avatar`}
                            />
                            <div>
                                <h1 className="flex text-2xl">Votar em {botData.name}</h1>
                                <span>Votos: {votes}</span>
                            </div>
                        </div>
                        <div className={`flex xl:flex-col border-2 ${borderColor[color]} xl:w-full xl:justify-center xl:items-center xl:h-full w-full h-[80px] flex-row rounded-lg items-center bg-neutral-900  max-w-[1500px]`}>
                            <span className="text-[20px] w-[82%] ml-3 xl:items-center xl:flex xl:justify-center xl:ml-0 xl:mb-2 xl:flex-col">{
                                voted
                                    ?
                                    <div className="xl:p-2 xl:text-center">
                                        <div>Voto confirmado com sucesso!</div>
                                        <span className="text-[14px]">{botData.vote_message ? botData.vote_message : `Obrigado por votar em ${botData.name}`}</span>
                                    </div>
                                    : (
                                        voteStatus?.can_vote
                                            ? <span className="text-center p-2">{user ? "Você pode votar agora!" : "Você precisa estar logado para poder votar"}</span>
                                            : <span className="text-center p-2">{user ? `Calma lá amigão, você ja votou hoje, volte em ${restTime} ${restTime === 1 ? "hora" : restTime as number < 0 ? "minutos" : (restTime as number > 0 && restTime === 1) ? "minuto" : "horas"}` : "Você precisa estar logado para poder votar"}</span>
                                    )
                            }</span>
                            <div className="flex justify-end xl:mb-3 flex-grow mr-6">
                                {user ? (
                                    <button
                                        className={`transition-all duration-300 border-2 rounded-xl ${buttonColor[color]} w-[100px] h-[50px] disabled:opacity-40 flex items-center justify-center`}
                                        disabled={!voteStatus?.can_vote || clicked}
                                        onClick={handleVote}
                                    >{clicked ? <icon.AiOutlineLoading3Quarters fill="#fff" size={30} className="animate-spin" /> : "Votar"}</button>
                                ) : (
                                    <a href={import.meta.env.VITE_AUTH_LINK} className={`transition-all duration-300 border-2 rounded-xl ${buttonColor[color]} w-[100px] h-[50px] disabled:opacity-40 flex items-center justify-center`}>
                                        Login
                                    </a>
                                )}
                            </div>
                        </div>
                    </section>
                ) : (
                    <VoteLoading />
                )}
            <section className="text-white p-3 w-screen flex flex-col items-center justify-center gap-4">
                <div className="w-screen max-w-[1500px] flex items-center justify-center flex-col">
                    <h1 className="font-extrabold text-white text-2xl">Bots sugeridos</h1>
                    <div className="grid grid-cols-2 xl:grid-cols-1 place-content-center gap-2 w-full p-3">
                        {botLoading ? (
                            <Botloading fills={2} grid />
                        ) : (
                            bots.map((bot, index) => (<BotCard key={index} bot={bot} />))
                        )}
                    </div>
                </div>
            </section>
        </>
    )
};
