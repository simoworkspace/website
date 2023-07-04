import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AxiosResponse } from "axios";
import { BotStructure, VoteStructure } from "../types";
import { UserContext } from "../contexts/UserContext";
import api from '../api';

export const Vote: React.FC = () => {
    const { botid } = useParams<string>();
    const { user } = useContext(UserContext);
    const [voteData, setVoteData] = useState<{ code?: number; status?: string }>();
    const [votes, setVotes] = useState<number>();

    const fetchVotes = async () => {
        const botData: AxiosResponse<BotStructure> = await api.getBotInfos(botid as string);
        return setVotes(botData.data.votes.length);
    };
    fetchVotes();
    
    const handleVote = async () => {
        try {
            await api.voteBot(user?.id as string, botid as string);
            return setVoteData({ code: 201 });
        } catch(error: any) {
            return setVoteData({ code: error.response.data.code });
        };
    };

    return (
        <div className="text-white flex flex-col-reverse">
            <button onClick={() => {
                fetchVotes();
                handleVote();
            }} className="border-2 rounded-lg bg-neutral-900 w-[200px] h-[40px]">Votar em but</button>
            <span>status: {voteData?.code === 400 && "Você ja votou hoje, aguarde 24 horas para poder votar novamente!"}</span>
            <span>votos atuais do bot: { votes ? votes : 0 }</span>
        </div>
    );
};
