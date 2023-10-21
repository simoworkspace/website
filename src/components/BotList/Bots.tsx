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
    const [data, setData] = useState<BotStructure[]>([]);
    const [botsToShow, setBotsToShow] = useState<number>(6);
    const [showLoadMore, setShowLoadMore] = useState<boolean>(true);
    const [botLoading, setBotLoading] = useState<boolean>(false);

    const fetchData = async (startAt: number, endAt: number) => {
        setBotLoading(true);

        const res: AxiosResponse<BotStructure[]> = await api.getAllBots(startAt, endAt);
        setData((prevData) => [...prevData, ...res.data]);

        if (res.data.length === 0) {
            setShowLoadMore(false);
        }

        setBotLoading(false);
    };

    useEffect(() => {
        fetchData(0, botsToShow);
    }, []);

    const loadMoreBots = (): void => {
        const newBotsToShow: number = botsToShow + 6;
        setBotsToShow(newBotsToShow);

        const startAt: number = botsToShow;
        const endAt: number = botsToShow + 6;
        fetchData(startAt, endAt);
    };

    const sortedBots = data.sort((a, b): number => {
        let totalVotesA: number = 0;
        let totalVotesB: number = 0;

        a.votes.forEach((vote) => {
            totalVotesA += vote.votes;
        });

        b.votes.forEach((vote) => {
            totalVotesB += vote.votes;
        });

        return totalVotesB - totalVotesA;
    });

    return !botLoading ? (
        <>
            <div className="grid-cols-2 grid gap-8 text-white m-2 xl:grid-cols-1 xl:items-left xl:justify-left max-w-[1500px]">
                {sortedBots.slice(0, botsToShow).map((bot: BotStructure) => (
                    <BotCard bot={bot} key={bot._id} />
                ))}
            </div>
            {showLoadMore && (
                <div className="w-[100w] px-2 max-w-[1500px]">
                    <button onClick={loadMoreBots} className={`${buttonColor[color]} border-2 transition-all duration-300 w-full text-white p-3 rounded-lg my-3`}>Carregar Mais</button>
                </div>
            )}
        </>
    ) : (
        <Botloading fills={6} />
    );
};
