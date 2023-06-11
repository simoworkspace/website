import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import {
    NavigateFunction,
    useNavigate,
    useParams,
    Link,
    Params,
} from "react-router-dom";
import { BotStructure, botDataStructure } from "../types";
import starIconFill from "../assets/svg/starfill.svg";
import starIcon from "../assets/svg/star.svg";

export const Bot: React.FC = () => {
    const params: Params = useParams<string>();
    const navigate: NavigateFunction = useNavigate();
    const [botData, setBotData] = useState<botDataStructure>();
    const [verifyBot, setVerifyBot] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const res: AxiosResponse = await axios.get<
                AxiosResponse<BotStructure>
            >(`${import.meta.env.VITE_API_URL}/users/${params.botid}`, {
                headers: {
                    Authorization: import.meta.env.VITE_API_KEY as string,
                },
            });
            setBotData(res.data);
        };
        const verifyBotExists = async (): Promise<void> => {
            const res: AxiosResponse = await axios.get<
                AxiosResponse<BotStructure>
            >(import.meta.env.VITE_API_URL + "/findbot/" + params.botid, {
                headers: {
                    Authorization: import.meta.env.VITE_API_KEY as string,
                },
            });
            if (res.data.length === 0) return setVerifyBot(false);
        };
        verifyBotExists();
        fetchData();
    }, []);

    if (!verifyBot) navigate("/notfound");

    return botData ? (
        <div className="h-[100vh] w-[100vw]">
            <div className="flex items-center xl:flex-col justify-center w-[100%] xl:h-[300px] h-[200px] text-white">
                <img
                    className="w-[min(100%,100px)] h-[min(100%,100px)] xl:my-2 rounded-full xl:float-none float-left"
                    src={`https://cdn.discordapp.com/avatars/${botData.id}/${botData.avatar}.png?size=2048`}
                    alt={botData.username + "'s Avatar"}
                />
                <div className="border-2 border-l-0 xl:border-l-2 rounded-xl flex xl:flex-col xl:h-[200px] h-[100px] w-[85vw]">
                    <div className="flex flex-col w-[100%]">
                        <div className="ml-6 xl:m-0 xl:my-1 text-white flex xl:flex-col xl:items-center flex-row gap-3 text-[26px]">
                            <strong>{botData.username}</strong>
                            <span className="text-[#797979] items-center flex text-[13px]">
                                ( {botData.id} )
                            </span>
                        </div>
                        <div className="flex mx-6 mt-3 xl:justify-center xl:m-1 flex-row">
                            {Array(5).fill(
                                <img
                                    className="ml-1 w-[17px]"
                                    src={starIconFill}
                                    alt="Star Icon"
                                />
                            )}
                        </div>
                    </div>
                    <div className="flex w-[100%] justify-end ">
                        <div className="flex gap-4 items-center justify-center xl:w-[100vw] flex-row m-4">
                            <Link
                                className="bg-neutral-900 transition-all duration-300 hover:bg-neutral-800 p-2 rounded-md w-[87px] text-center"
                                to={`/vote/${botData.id}`}
                            >
                                <span>Votar</span>
                            </Link>
                            <Link
                                className="bg-neutral-900 transition-all duration-300 hover:bg-neutral-800 p-2 rounded-md"
                                to={`/bhfuidshduip`}
                            >
                                <span>Adicionar</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div>loading...</div>
    );
};
