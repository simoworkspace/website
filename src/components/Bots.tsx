import React, { useState, useEffect } from "react";
import { BotStructure } from "../types";
import { Botloading } from "./Botloading";
import { Link } from "react-router-dom";
import axios, { AxiosResponse } from "axios";

export const Bots: React.FC = () => {
    const [data, setData] = useState<BotStructure[]>();

    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            const res: AxiosResponse = await axios.get<AxiosResponse>(
                (import.meta.env.VITE_API_URL as string) + "/bot/@all",
                {
                    headers: {
                        Authorization: import.meta.env.VITE_API_KEY as string,
                    },
                }
            );
            setData(res.data);
        };
        fetchData();
    }, []);

    return data ? (
        <div className="grid-cols-3 grid gap-8 text-white m-2 xl:grid-cols-1 xl:items-left xl:justify-left">
            {data.map((x: BotStructure) => (
                <div
                    key={x._id}
                    className="card-bc p-1 border-transparent border-[4px] rounded-[10px]"
                >
                    <img
                        className="w-[min(100%,100px)] h-[min(100%,100px)] rounded-full mt-2 mr-2 float-right"
                        src={`https://cdn.discordapp.com/avatars/${x._id}/${x.avatar}.png?size=2048`}
                        alt={x.name}
                    />
                    <h1 className="text-center text-[24px]">{x.name}</h1>
                    <div className="">
                        {x.shortDescription.length > 80
                            ? x.shortDescription.slice(0, 80) + "..."
                            : x.shortDescription}
                    </div>
                    <div className="mt-2 ml-2 mb-2 flex flex-col">
                        <div>
                            <Link
                                to={`https://discord.com/api/oauth2/authorize?client_id=${x._id}&permissions=70368744177655&scope=bot%20applications.commands`}
                            >
                                <button className="max-w-full max-h-full w-[170px] h-[40px] bg-gradient-to-l from-blue-button1 via-blue-button2 to-blue-button1 border-2 border-black text-white rounded-full hover:bg-right bg-[length:250%] transition-bg duration-500 hover:scale-110 focus:scale-110 focus:bg-right focus:outline focus:outline-1 focus:outline-offset-1 focus:utline-1 focus:duration-0">
                                    Adicionar
                                </button>
                            </Link>
                        </div>
                        <div>
                            <Link to={`/bot/${x._id}`}>
                                <button className="max-w-full max-h-full w-[170px] h-[40px] bg-gradient-to-l from-blue-button1 via-blue-button2 to-blue-button1 border-2 border-black text-white rounded-full mt-2 hover:bg-right bg-[length:250%] transition-bg duration-500 hover:scale-110 focus:scale-110 focus:bg-right focus:outline focus:outline-1 focus:outline-offset-1 focus:utline-1 focus:duration-0">
                                    Mais informações
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    ) : (
        <Botloading></Botloading>
    );
};
