import React, { useState, useEffect, useContext, useRef } from "react";
import { BotStructure } from "../../types";
import { Botloading } from "./Botloading";
import api from "../../utils/api";
import { BotCard } from "./BotCard";
import { ThemeContext } from "../../contexts/ThemeContext";
import { buttonColor } from "../../utils/theme/button";

export const Bots: React.FC = () => {
    const { color } = useContext(ThemeContext);
    const [data, setData] = useState<BotStructure[]>([]);
    const [botsToShow, setBotsToShow] = useState<number>(6);
    const [prevBotsToShow, setPrevBotsToShow] = useState<number>(0);
    const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
    const [botLoading, setBotLoading] = useState<boolean>(false);

    const fetchData = async (startAt: number, endAt: number) => {
        setBotLoading(true);

        const res = await api.getAllBots(startAt, endAt);
        setData((prevData) => [...prevData, ...res.data]);

        const status = await api.getApiStatus();

        if (res.data.length === 0 || data.length >= status.data.bots) {
            setShowLoadMore(false);
        } else {
            setShowLoadMore(true);
        }

        setBotLoading(false);
    };

    useEffect(() => {
        fetchData(prevBotsToShow, botsToShow);
    }, [botsToShow]);

    const loadMoreBots = () => {
        setBotsToShow((bots) => {
            setPrevBotsToShow(() => prevBotsToShow + 6);
            return bots + 6
        });
    };

    return (
        <div className="max-w-[1500px] w-screen flex-col gap-2 justify-center items-center">
            <div className="grid-cols-2 grid gap-3 text-white p-3 xl:w-full xl:grid-cols-1 w-full">
                {data.map((bot: BotStructure, index: number) => (
                    <BotCard bot={bot} key={index} />
                ))}
            </div>
            {!botLoading && showLoadMore && (
                <div className="max-w-[1500px] flex justify-center items-center w-screen">
                    <button
                        onClick={loadMoreBots}
                        className={`${buttonColor[color]} border-2 transition-all duration-300 w-[98%] text-white p-3 rounded-lg mb-2`}
                    >
                        Carregar Mais
                    </button>
                </div>
            )}
            {botLoading && <Botloading fills={6} />}
        </div>
    );
};
