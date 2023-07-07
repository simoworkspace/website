import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { BotStructure, VoteStructure } from "../types";
import { UserContext } from "../contexts/UserContext";
import api from '../api';

export const Vote: React.FC = () => {
    const { botid } = useParams<string>();
    const { user } = useContext(UserContext);
    const [botData, setBotData] = useState<BotStructure>();
    const [votes, setVotes] = useState<{ code: number }>();
    const [voteInfo, setVoteInfos] = useState<VoteStructure>();
    
    const fetchBotData = async () => {
        const botData: AxiosResponse<BotStructure> = await api.getBotInfos(botid as string);
        return setBotData(botData.data);
    };
    
    const handleVote = async () => {
        try {
            const req: AxiosResponse<VoteStructure> = await api.voteBot(user?.id as string, botid as string);
            return setVoteInfos(req.data);
        } catch(error: any) {
            return setVotes({ code: error.response.data.code });
        };
    };

    useEffect(() => {
        fetchBotData();
    }, []);

    return user ? (
        <div className="text-white flex flex-col-reverse">
            <button onClick={() => {
                fetchBotData();
                handleVote();
            }} className="border-2 rounded-lg bg-neutral-900 w-[200px] h-[40px]">Votar em but</button>
            <span>status: {voteInfo === undefined ? "Você ja votou hoje, aguarde 24 horas para poder votar novamente!" : "Você pode votar agora!"}</span>
            <span>votos atuais do bot: { botData?.votes.length ? botData?.votes.length : 0 }</span>
        </div>
    ) : (
        <Link to={import.meta.env.VITE_AUTH_LINK} className="bg-black border-2 h-[50px] text-white rounded-lg">você precisa fazer login para poder faser voto clica aqui</Link>
    ); 
};
