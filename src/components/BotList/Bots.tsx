import React, { useState, useEffect, useContext } from "react";
import { BotStructure } from "../../types";
import { Botloading } from "./Botloading";
import api from "../../utils/api";
import { AxiosResponse } from "axios";
import { BotCard } from "./BotCard";
import { ThemeContext } from "../../contexts/ThemeContext";
import { buttonColor } from "../../utils/theme/button";

export const Bots: React.FC = () => {
    const { color } = useContext(ThemeContext);
    const [data, setData] = useState<BotStructure[]>();
    const [botsToShow, setBotsToShow] = useState<number>(6);
    const [showLoadMore, setShowLoadMore] = useState<boolean>(true);

    const fetchData = async () => {
        const res: AxiosResponse<BotStructure[]> = await api.getAllBots();
        setData(res.data);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const loadMoreBots = () => {
        const newBotsToShow = botsToShow + 6;
        if (newBotsToShow >= (data?.length || 0)) {
            setShowLoadMore(false);
        }
        setBotsToShow(newBotsToShow);
    };

    return data ? (
        <>
            <div className="grid-cols-2 grid gap-8 text-white m-2 xl:grid-cols-1 xl:items-left xl:justify-left max-w-[1500px]">
                {data.slice(0, botsToShow).map((bot: BotStructure) => (
                    <BotCard bot={bot} key={bot._id} />
                ))}
            </div>
            {showLoadMore && (
                <div className="w-[100w] px-2 max-w-[1500px]">
                    <button onClick={loadMoreBots} className={`${buttonColor[color]} border-2 transition-all duration-300 w-[100%] text-white p-3 rounded-lg my-3`}>Carregar Mais</button>
                </div>
            )}
        </>
    ) : (
        <Botloading fills={6} />
    );
};
