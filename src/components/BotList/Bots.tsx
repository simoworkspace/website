import React, { useState, useEffect, useContext } from "react";
import { BotStructure } from "../../types";
import { Botloading } from "./Botloading";
import api from "../../utils/api";
import { AxiosResponse } from "axios";
import { BotCard } from "./BotCard";

export const Bots: React.FC = () => {
    const [data, setData] = useState<BotStructure[]>();

    const fetchData = async () => {
        const res: AxiosResponse<BotStructure[]> = await api.getAllBots();
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return data ? (
        <div className="grid-cols-2 grid gap-8 text-white m-2 xl:grid-cols-1 xl:items-left xl:justify-left">
            {data.map((bot: BotStructure) => (<BotCard bot={bot} />))}
        </div>
    ) : (
        <Botloading />
    );
};
