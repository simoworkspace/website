import { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams, Link, Params } from "react-router-dom";
import { BotStructure, DiscordUser } from "../../types";
import starIconFill from "../assets/svgs/starfill.svg";
import starIcon from "../assets/svgs/star.svg";
import discordIcon from "../assets/svgs/discord.svg";
import api from '../../utils/api';
import { Feedbacks } from "../../components/Feedbacks/Feedbacks";
import { Markdown } from "../../components/Markdown/Markdown";
import githubIcon from "../assets/svgs/github.svg";
import globIcon from "../assets/svgs/globo.svg";

export const BotComponent: React.FC = () => {
    const params: Params = useParams<string>();
    const botid: string = params.botid as string;
    const navigate: NavigateFunction = useNavigate();

    const [botData, setBotData] = useState<DiscordUser>();
    const [bot, setBot] = useState<BotStructure>();
    const [stars, setStars] = useState<number>(0);

    const getBotStars = async () => {
        const res = await api.getBotFeedbacks(params.botid as string);
        const stars = res.data.map(a => a.stars);
        let count = 0;
        stars.forEach(value => count += value);
        return setStars(Math.round(count / stars.length));
    };

    const getBotData = async (): Promise<void> => {
        const res: AxiosResponse<DiscordUser> = await api.getDiscordUser(botid);
        return setBotData(res.data);
    };

    const verifyBot = async (): Promise<void> => {
        const res: AxiosResponse<{ exists: boolean }> = await api.verifyBotExists(botid);
        if (!res.data.exists) return navigate("/");
    };

    const getBotInDB = async (): Promise<void> => {
        const res: AxiosResponse<BotStructure> = await api.getBotInfos(botid);
        return setBot(res.data);
    };

    useEffect(() => {
        verifyBot();
        getBotData();
        getBotInDB();
        getBotStars();
    }, []);

    return botData && bot ? (
        <div className="w-[100vw]">
            <div className="flex flex-col items-center justify-center">
                <section className="flex items-center xl:flex-col justify-center w-[100%] xl:h-[300px] h-[200px] text-white">
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
                            <div className="flex mx-6 mt-3 xl:justify-center xl:m-1 flex-row gap-1">
                                {Array(stars).fill(0).map(() => (
                                    <img src={starIconFill} alt="Star" />
                                ))}
                                {Array(5 - stars).fill(0).map((_, index) => (
                                    <img key={index + stars} src={starIcon} alt="Empty Star" />
                                ))}
                            </div>
                        </div>
                        <div className="flex w-[100%] justify-end ">
                            <div className="flex gap-4 items-center justify-center xl:w-[100vw] flex-row m-4">
                                <Link
                                    className="border-2 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-300 p-2 rounded-md w-[120px] text-center"
                                    to={`/vote/${botData.id}`}
                                >
                                    <span>Votar</span>
                                </Link>
                                <Link
                                    className="border-2 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-300 p-2 rounded-md w-[120px] text-center"
                                    to={`https://discord.com/api/oauth2/authorize?client_id=${botData.id}&permissions=70368744177655&scope=bot%20applications.commands`}
                                >
                                    <span>Adicionar</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-[90%]">
                    <div className="flex flex-row">
                        <div className="w-[70%] flex justify-center">
                            <Markdown markdown={bot.longDescription} className="w-[100%]" />
                        </div>
                        <div className="w-[1px] bg-[#8b8b8b]" />
                        <div className="flex flex-col gap-5 text-white px-5 w-[35%]">
                            <div className="w-[100%]">
                                <div className="w-[100%]">
                                    <h1 className="text-2xl text-center">{bot.owners.length > 1 ? "Developers" : "Developer"}</h1>
                                    <hr className="my-4 w-[100%]" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link to="/users/963124227911860264" className="bg-neutral-900 p-2 rounded-lg flex flex-row items-center gap-4 transition-colors duration-300 hover:bg-neutral-800">
                                            <img className="rounded-full h-[60px] w-[60px]" src="https://cdn.discordapp.com/avatars/955095844275781693/a7bcea9877fc1f1de51756e0091d5e71.png?size=2048" alt="oi" />
                                            <span className="text-center">spyei</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl text-center">Informações</h1>
                                <hr className="my-4 w-[100%]" />
                                <div className="flex flex-col w-[100%] gap-3">
                                    <div>
                                        <strong className="text-lg">Prefixo </strong><span>{bot.prefix}</span>
                                    </div>
                                    <div>
                                        <strong className="text-lg">Votos </strong><span>{bot.votes.length}</span>
                                    </div>
                                    <div>
                                        <div className="flex flex-row gap-3 flex-wrap">
                                            <strong className="text-lg">Tags</strong>
                                            {bot.tags.map(tag => (
                                                <div className="bg-neutral-800 p-2 rounded-lg">{tag}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <h1 className="text-2xl text-center">Links</h1>
                                    <hr className="my-1 w-[100%]" />
                                    <div className="flex flex-col gap-3 flex-wrap">
                                        <Link to={bot.supportServer.includes("https://") ? bot.supportServer : "https://" + bot.supportServer} className="flex items-center gap-3 p-2">
                                            <img className="w-[30px]" src={discordIcon} alt="Discord Icon" />
                                            <span>Servidor de suporte</span>
                                        </Link>
                                        {bot.sourceCode && (
                                            <Link to={bot.sourceCode.includes("https://") ? bot.sourceCode : "https://" + bot.sourceCode} className="flex items-center gap-3 p-2">
                                                <img className="w-[30px]" src={githubIcon} alt="Github Icon" />
                                                <span>Repositório</span>
                                            </Link>
                                        )}
                                        {bot.websiteURL && (
                                            <Link to={bot.websiteURL.includes("https://") ? bot.websiteURL : "https://" + bot.websiteURL} className="flex items-center gap-3 p-2">
                                                <img className="w-[30px]" src={globIcon} alt="Globe Icon" />
                                                <span>Website (<span className="text-blue-600">{bot.websiteURL}</span>)</span>
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <Feedbacks />
        </div>
    ) : (
        <div>loading...</div>
    );
};
