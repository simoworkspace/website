import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { BotStructure, UserStructure, VoteStructure } from "../types";
import { UserContext } from "../contexts/UserContext";
import api from '../api';

export const Vote: React.FC = () => {
    const { user } = useContext(UserContext);
    const { botid } = useParams<string>();

    const [voteStatus, setVoteStatus] = useState<{ canVote: boolean; restTime: string; }>();
    const [botData, setBotData] = useState<BotStructure>();
    const [time, setTime] = useState<string>();

    const getVoteStatus = async () => {
        const res: AxiosResponse<{ canVote: boolean; restTime: string; }> = await api.voteStatus(botid as string, user?.id as string);
        return setVoteStatus(res.data);
    };

    const handleVote = async () => {
        await api.voteBot(user?.id as string, botid as string);
        return;
    };

    const timeStatus = voteStatus?.restTime as any;
    const restTime = () => { return new Date(timeStatus - Date.now()).toLocaleString().split(", ")[1]; };

    useEffect(() => setTime(restTime()), [restTime]);

    useEffect(() => {
        if (user) {
            getVoteStatus();
        };
    }, [user]);

    return user ? (
        <div className="flex flex-col text-white">
            <span>status do voto: {voteStatus?.canVote ? "você pode votar agora" : "calma lá amigão, volte daqui " + time + " horas"}</span>
            <button className="border-2 rounded-lg bg-black hover:bg-neutral-800 w-[200px]" onClick={handleVote}>vota nessa bosta</button>
        </div>
    ) : (
        <div>você precisa logar para votar</div>
    )
};
