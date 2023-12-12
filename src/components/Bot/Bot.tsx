import { useEffect, useState, useContext, FC } from "react";
import { useParams, Link, Params } from "react-router-dom";
import { BotStructure, Team } from "../../types";
import api from '../../utils/api';
import { ThemeContext } from "../../contexts/ThemeContext";
import { Feedbacks } from "../../components/Feedbacks/Feedbacks";
import { Markdown } from "../../components/Markdown/Markdown";
import { borderAndBg } from "../../utils/theme/border&bg";
import { borderColor } from "../../utils/theme/border";
import * as icon from "react-icons/bs";
import { BotLoading } from "./BotLoading";
import { Helmet } from "react-helmet";

export const BotComponent: FC = () => {
    const params: Params = useParams<string>();
    const botid: string = params.botid as string;
    const { color } = useContext(ThemeContext);

    const [botData, setBotData] = useState<BotStructure>();
    const [stars, setStars] = useState<number>(0);
    const [dev, setDev] = useState<{ id: string, avatar: string, username: string }>();
    const [team, setTeam] = useState<Team | null>();

    const getBotStars = async () => {
        const res = await api.getBotFeedbacks(params.botid as string);
        const stars = res.data.map(a => a.stars);
        let count = 0;
        stars?.forEach(value => count += value as number);
        return setStars(Math.round(count / stars.length));
    };

    const getBotData = async () => {
        const { data: { owner_id }, data } = await api.getBotInfos(botid);

        const { data: { username, avatar, id } } = await api.getDiscordUser(owner_id);

        if (data.team_id) {
            const team = await api.getTeam(data.team_id as string);

            setTeam(!team.data ? null : team.data);
        }

        setDev({ username, avatar, id, });

        setBotData(data);
    };

    useEffect(() => {
        getBotData();
        getBotStars();
    }, []);

    return botData ? (
        <section className="max-w-[1500px] w-screen">
            {!botData.approved && (
                <div className="fixed flex items-center justify-center backdrop-blur-sm inset-0">
                    <div className="flex gap-3 items-center justify-center flex-col w-full h-[150px] border-2 rounded-lg bg-[#e8a60c] border-[#9e7514]">
                        <icon.BsClockFill size={35} />
                        <span className="text-lg text-center px-2">Bot {botData.name} está em análise, aguarde até que ela seja finalizada.</span>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center justify-center">
                <section className="flex items-center xl:flex-col justify-center w-full xl:mt-2 mt-[30px] text-white">
                    <div className={`bg-neutral-900 rounded-xl flex xl:flex-col xl:h-[320px] h-[120px] w-[95%] border-2 ${borderColor[color]} items-center justify-center`}>
                        <img
                            className="w-[100px] h-[100px] xl:my-2 rounded-full xl:float-none ml-2"
                            src={`https://cdn.discordapp.com/avatars/${botData._id}/${botData.avatar}.png`}
                            alt={botData.name + "'s Avatar"}
                        />
                        <div className="flex flex-col w-full justify-center gap-2">
                            <div className="ml-6 xl:m-0 xl:my-1 text-white flex xl:flex-col xl:items-center flex-row gap-3 text-[26px]">
                                <strong>{botData.name}</strong>
                                <span className="text-[#797979] items-center flex text-[13px]">
                                    ( {botData._id} )
                                </span>
                            </div>
                            <div className="flex mx-6 xl:justify-center xl:m-1 flex-row gap-1">
                                {Array(stars).fill(0).map((_, index) => (
                                    <icon.BsStarFill key={index} />
                                ))}
                                {Array(5 - stars).fill(0).map((_, index) => (
                                    <icon.BsStar key={index} />
                                ))}
                            </div>
                        </div>
                        <div className="flex w-full justify-end ">
                            <div className="flex gap-4 items-center justify-center xl:w-screen flex-row m-4">
                                <Link
                                    className="border-2 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-300 p-2 rounded-md w-[120px] text-center"
                                    to={`/vote/${botData._id}`}
                                >
                                    <span>Votar</span>
                                </Link>
                                <Link
                                    className="border-2 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-300 p-2 rounded-md w-[120px] text-center"
                                    to={`https://discord.com/api/oauth2/authorize?client_id=${botData._id}&permissions=70368744177655&scope=bot%20applications.commands`}
                                >
                                    <span>Adicionar</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={`w-[90%] mb-5 bg-neutral-900 border-2 ${borderColor[color]} border-t-0 rounded-t-none rounded-lg p-10 xl:p-3`}>
                    <div className="flex flex-row xl:flex-col">
                        <div className="w-[80%] xl:w-full flex break-words xl:justify-center p-2">
                            <Markdown markdown={botData.long_description} />
                        </div>
                        <div className="w-[1px] bg-[#8b8b8b]" />
                        <hr className="xl:my-4 xl:w-full" />
                        <div className="flex flex-col gap-5 text-white px-5 w-[50%] xl:w-full">
                            <div className="w-full">
                                <div className="w-full">
                                    <h1 className="text-2xl text-center">Developer</h1>
                                    <hr className="my-4 w-full" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link to={`/user/${dev?.id}`} className="bg-neutral-900 border-2 border-neutral-700 p-2 rounded-lg flex flex-row flex-wrap justify-center xl:flex-col items-center gap-4 transition-colors duration-300 hover:bg-neutral-800">
                                            <img className="rounded-full h-[60px] w-[60px]" src={`https://cdn.discordapp.com/avatars/${dev?.id}/${dev?.avatar}.png?size=2048`} alt={`${dev?.username}'s Avatar`} />
                                            <span className="text-center">{dev?.username}</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            {team && (
                                <div className="w-full">
                                    <h1 className="text-2xl text-center">Time</h1>
                                    <hr className="my-4 w-full" />
                                    <div className="grid grid-cols-2 gap-4">
                                        <Link to={`/team/${team.id}`} className="bg-neutral-900 border-2 border-neutral-700 p-2 rounded-lg flex flex-row flex-wrap justify-center xl:flex-col items-center gap-4 transition-colors duration-300 hover:bg-neutral-800">
                                            <img className="rounded-full h-[60px] w-[60px]" src={team.avatar_url} />
                                            <span className="text-center">{team.name}</span>
                                        </Link>
                                    </div>
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl text-center">Informações</h1>
                                <hr className="my-4 w-full" />
                                <div className="flex flex-col w-full gap-3">
                                    <div>
                                        <strong className="text-lg">Prefixo </strong><span>{botData.prefixes.join(", ")}</span>
                                    </div>
                                    <div>
                                        <strong className="text-lg">Votos </strong><span>{botData.votes.reduce((votesCount, vote) => votesCount + vote.votes, 0)}</span>
                                    </div>
                                    <div>
                                        <div className="flex flex-row gap-3 flex-wrap">
                                            <strong className="text-lg">Tags</strong>
                                            {botData.tags.map((tag, index) => (
                                                <div key={index} className={`${borderAndBg[color]} p-[6px] rounded-lg border-2`}>{tag}</div>
                                            ))}
                                        </div>
                                    </div>
                                    {(botData.support_server || botData.source_code || botData.website_url) && (
                                        <>
                                            <h1 className="text-2xl text-center">Links</h1>
                                            <hr className="my-1 w-full" />
                                            <div className="flex flex-col gap-3 flex-wrap">
                                                {botData?.support_server && (
                                                    <Link to={botData?.support_server.includes("https://") ? botData?.support_server : "https://" + botData?.support_server} className="flex items-center gap-3 p-2">
                                                        <icon.BsDiscord size={30} fill="#5662F6" />
                                                        <span>Servidor de suporte</span>
                                                    </Link>
                                                )}
                                                {botData?.source_code && (
                                                    <Link to={botData?.source_code.includes("https://") ? botData?.source_code : "https://" + botData?.source_code} className="flex items-center gap-3 p-2">
                                                        <icon.BsGithub size={30} />
                                                        <span>Repositório</span>
                                                    </Link>
                                                )}
                                                {botData?.website_url && (
                                                    <Link to={botData?.website_url.includes("https://") ? botData?.website_url : "https://" + botData?.website_url} className="flex items-center gap-3 p-2">
                                                        <icon.BsGlobe size={30} />
                                                        <span>Website (<span className="text-blue-600">{botData?.website_url}</span>)</span>
                                                    </Link>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Feedbacks botid={botid} bot={botData} dev={dev} />
            </div>
            <Helmet>
                <title>Simo Botlist - {botData.name}</title>
                <meta property="og:title" content={botData.name} />
                <meta property="og:type" content="website" />
                <meta property="og:image" content={`https://cdn.discordapp.com/avatars/${botData._id}/${botData.avatar}.png`} />
                <meta property="og:description" content={botData.short_description} />
                <meta name="theme-color" content="#FFFFFF" />
            </Helmet>
        </section>
    ) : (
        <BotLoading />
    );
};
