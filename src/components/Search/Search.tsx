import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import { AxiosResponse } from "axios";
import { BotStructure } from "../../types";
import { BotCard } from "../../components/Bot/BotCard";

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
        <section className="flex flex-col items-center justify-center">
            <h1 className="text-white m-2 text-[29px]">Bots encontrados com a pesquisa: <strong>{filter}</strong></h1>
            <hr className="w-[90vw] mb-2 rounded-full"/>
            <div className="grid-cols-2 grid gap-8 text-white m-2 xl:grid-cols-1 xl:items-left xl:justify-left xl:mb-[80px]">
                {botsFilter?.map(bot => (<BotCard bot={bot} />))}
            </div>
        </section>
    );
};