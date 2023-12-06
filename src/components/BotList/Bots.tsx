import React, { useState, useEffect, useContext, useRef } from "react";
import { BotStructure } from "../../types";
import { Botloading } from "./Botloading";
import api from "../../utils/api";
import { AxiosResponse } from "axios";
import { BotCard } from "./BotCard";
import { ThemeContext } from "../../contexts/ThemeContext";
import { buttonColor } from "../../utils/theme/button";

export const Bots: React.FC = () => {
    const { color } = useContext(ThemeContext);
    const [data, setData] = useState<BotStructure[]>([]);
    const [botsToShow, setBotsToShow] = useState<number>(6);
    const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
    const [botLoading, setBotLoading] = useState<boolean>(false);

    const bottomOfPageRef = useRef<HTMLDivElement>(null);

    const fetchData = async (startAt: number, endAt: number) => {
        setBotLoading(true);

        const res: AxiosResponse<BotStructure[]> = await api.getAllBots(startAt, endAt);
        setData((prevData) => [...prevData, ...res.data]);

        if (res.data.length === 0) {
            setShowLoadMore(false);
        }

        setBotLoading(false);
    };

    const handleScroll = () => {
        if (bottomOfPageRef.current && window.innerHeight + document.documentElement.scrollTop >= bottomOfPageRef.current.offsetTop) {
            loadMoreBots();
        }
    };

    useEffect(() => {
        fetchData(0, botsToShow);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [botsToShow]);

    const loadMoreBots = (): void => {
        setBotsToShow(botsToShow + 6);
        fetchData(botsToShow, botsToShow + 6);
    };

    return (
        <div className="max-w-[1500px] w-screen flex-col gap-2 justify-center items-center">
            <div className="grid-cols-2 grid gap-3 text-white p-3 xl:w-full xl:grid-cols-1 w-full">
                {data.map((bot: BotStructure, index: number) => (
                    <BotCard bot={bot} key={index} />
                ))}
            </div>
            <div ref={bottomOfPageRef} />
            {showLoadMore && !botLoading && (
                <div className="max-w-[1500px] flex justify-center items-center w-screen">
                    <button onClick={loadMoreBots} disabled={!showLoadMore} className={`${buttonColor[color]} border-2 transition-all duration-300 w-[98%] text-white p-3 rounded-lg mb-2`}>Carregar Mais</button>
                </div>
            )}
            {botLoading && <Botloading fills={6} />}
        </div>
    );
};
