import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { botDataStructure } from '../types';

export const Bot: React.FC = () => {
    const params = useParams<string>();
    const navigate: NavigateFunction = useNavigate();
    const [botData, setBotData] = useState<botDataStructure>();
    const [verifyBot, setVerifyBot] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const res: AxiosResponse = await axios.get<AxiosResponse>(
                `${import.meta.env.VITE_API_URL}/bot/${params.botid}/discord`,
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY as string,
                    },
                }
            );
            setBotData(res.data);
        };
        const verifyBotExists = async (): Promise<void> => {
            const res: AxiosResponse = await axios.get<AxiosResponse>(
                import.meta.env.VITE_API_URL + "/findbot/" + params.botid,
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY as string,
                    },
                }
            );
            if (res.data.length == 0) return setVerifyBot(false);
        };
        verifyBotExists();
        fetchData();
    }, []);

    if (!verifyBot) navigate("/notfound");

    return botData ? (
        <img
            src={`https://cdn.discordapp.com/avatars/${botData.id}/${botData.avatar}.png?size=2048`}
            alt="Bot Avatar"
        />
    ) : (
        <div>loading...</div>
    );
};
