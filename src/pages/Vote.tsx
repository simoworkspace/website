import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserStructure, VoteStructure } from "../types";

export const Vote: React.FC = () => {
    const params = useParams<string>();
    const [userId, setUserID] = useState<string>("");
    const [voteData, setVoteData] = useState<VoteStructure>();
    const { botid } = params;

    useEffect(() => {
        const fetchData = async () => {
            axios.get("/api/auth/user", {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY as string,
                    },
                })
                .then((res: { data: { data: UserStructure } }) => setUserID(res.data.data.id));
        };
        fetchData();
    }, []);

    const handleVote = async () => {
        await axios.get('/api/vote')
    };

    return (
        <div className="text-white flex flex-col-reverse">
            <button onClick={handleVote} className="border-2 rounded-lg bg-neutral-900 w-[200px] h-[40px]">Votar em but</button>
            <span>votar no bot $username[{botid}]</span>
        </div>
    );
};
