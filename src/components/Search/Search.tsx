import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import { AxiosResponse } from "axios";
import { BotStructure } from "../../types";
import { BotCard } from "../BotList/BotCard";

export const SearchComponent: React.FC = () => {
    const [searchParams] = useSearchParams();
    const filter: string | null = searchParams.get("bot");
    const [bots, setBots] = useState<BotStructure[]>();

    const getBots = async (): Promise<AxiosResponse<BotStructure[]> | void> => {
        const req: AxiosResponse<BotStructure[]> = await api.getAllBots();
        return setBots(req.data);
    };

    useEffect(() => { getBots(); }, []);

    const botsFilter = bots?.filter(a => a.name.toLowerCase().includes(filter?.toLocaleLowerCase() as string));

    return (
        <section>
            <div className="grid-cols-2 grid gap-4 text-white m-2 xl:grid-cols-1 xl:items-left xl:justify-left max-w-[1500px]">
                {botsFilter?.map((bot, index) => (<BotCard key={index} bot={bot} />))}
            </div>
        </section>
    );
};