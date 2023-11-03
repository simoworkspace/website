import { AxiosResponse } from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, Params } from "react-router-dom";
import { BotStructure, DiscordUser, UserStructure } from "../../types";
import api from '../../utils/api';
import { ThemeContext } from "../../contexts/ThemeContext";
import { Markdown } from "../../components/Markdown/Markdown";
import { borderAndBg } from "../../utils/theme/border&bg";
import { borderColor } from "../../utils/theme/border";
import * as icon from "react-icons/bs";
import { BotLoading } from "../Bot/BotLoading";
import { Button } from "../Mixed/Button";

export const DashboardEdit: React.FC = () => {
    const params: Params<string> = useParams<string>();
    const botid = params.botId as string;

    const { color } = useContext(ThemeContext);

    const [devs, setDevs] = useState<UserStructure[]>([]);
    const [bot, setBot] = useState<BotStructure>();

    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState<string>("");

    const [markdown, setMarkdown] = useState<string>("");

    const [editedBot, setEditedBot] = useState<{
        long_description?: string | undefined;
        short_description?: string | undefined;
        tags?: string[] | undefined;
        support_server?: string | undefined;
        source_code?: string | undefined;
        website_url?: string | undefined;
        prefixes?: string[] | undefined;
    }>({
        long_description: bot?.long_description,
        short_description: bot?.short_description,
        tags: bot?.tags,
        support_server: bot?.support_server,
        source_code: bot?.source_code,
        website_url: bot?.website_url,
        prefixes: bot?.prefixes
    });

    const handleTagSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setTag("");
        setEditedBot({ tags });
        setTags([...tags, tag]);
    };

    const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const tag = event.target.value;
        setTag(tag);
    };

    const getBotInDB = async (): Promise<void> => {
        const res: AxiosResponse<BotStructure> = await api.getBotInfos(botid);
        const { owners } = res.data;

        for (let i = 0; i < owners.length; i++) {
            const res: AxiosResponse<DiscordUser> = await api.getDiscordUser(owners[i]);
            const { username, avatar, id } = res.data;
            setDevs(devs => [...devs, { username: username, avatar: avatar, id: id, signed: true }]);
        }

        return setBot(res.data);
    };


    useEffect(() => {
        const textarea = document.getElementById("textoi");
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    }, [markdown]);
    
    useEffect(() => {
        if (bot?.tags) {
            setTags(bot?.tags);
        }
    }, [bot?.tags]);
    useEffect(() => {
        getBotInDB();
    }, []);

    return bot ? (
        <section className="max-w-[1500px] w-screen">
            {!bot.approved && (
                <div className="fixed flex items-center justify-center backdrop-blur-sm inset-0">
                    <div className="flex gap-3 items-center justify-center flex-col w-full h-[150px] border-2 rounded-lg bg-[#e8a60c] border-[#9e7514]">
                        <icon.BsClockFill size={35} />
                        <span className="text-lg text-center px-2">Bot {bot.name} está em análise, aguarde até que ela seja finalizada.</span>
                    </div>
                </div>
            )}
            <div className="flex flex-col items-center justify-center">
                <section className="flex items-center xl:flex-col justify-center w-full xl:mt-2 mt-[30px] text-white">
                    <div className={`bg-neutral-900 rounded-xl flex xl:flex-col xl:h-[320px] h-[120px] w-[95%] border-2 ${borderColor[color]} items-center justify-center`}>
                        <img
                            className="w-[100px] h-[100px] xl:my-2 rounded-full xl:float-none ml-2"
                            src={`https://cdn.discordapp.com/avatars/${bot._id}/${bot.avatar}.png?size=2048`}
                            alt={bot.name + "'s Avatar"}
                        />
                        <div className="flex flex-col w-full justify-center gap-2">
                            <div className="ml-6 xl:m-0 xl:my-1 text-white flex xl:flex-col xl:items-center flex-row gap-3 text-[26px]">
                                <strong>{bot.name}</strong>
                                <span className="text-[#797979] items-center flex text-[13px]">
                                    ( {bot._id} )
                                </span>
                            </div>
                            <div className="flex mx-6 xl:justify-center xl:m-1 flex-row gap-1">
                                {Array(5).fill(0).map(() => (
                                    <icon.BsStar />
                                ))}
                            </div>
                        </div>
                        <div className="flex w-full justify-end ">
                            <div className="flex gap-4 items-center justify-center xl:w-screen flex-row m-4">
                                <Link
                                    className="border-2 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-300 p-2 rounded-md w-[120px] text-center"
                                    to={`/vote/${bot._id}`}
                                >
                                    <span>Votar</span>
                                </Link>
                                <Link
                                    className="border-2 border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-700 transition-colors duration-300 p-2 rounded-md w-[120px] text-center"
                                    to={`https://discord.com/api/oauth2/authorize?client_id=${bot._id}&permissions=70368744177655&scope=bot%20applications.commands`}
                                >
                                    <span>Adicionar</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
                <section className={`w-[90%] min-w-[680px] mb-5 bg-neutral-900 border-2 ${borderColor[color]} border-t-0 rounded-t-none rounded-lg p-10 xl:p-3`}>
                    <div className="flex flex-row xl:flex-col h-full">
                        <div className="w-[80%] h-full xl:w-full break-words xl:justify-center mr-4">
                            <div className={`justify-center mb-5 items-center flex outline-none bg-[#2c2c2c] w-full h-full rounded-xl p-3 border-[2px] transition-all duration-100 ${borderColor[color]} text-white`}>
                                <textarea
                                    id="textoi"
                                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        setMarkdown(event.target.value);
                                    }}
                                    defaultValue={bot.long_description}
                                    maxLength={2048}
                                    className="bg-transparent outline-none w-full scrollbar-thin disabled:opacity-50"
                                />
                            </div>
                            <Markdown markdown={markdown} />
                        </div>
                        <div className="w-[1px] bg-[#8b8b8b]" />
                        <hr className="xl:my-4 xl:w-full" />
                        <div className="flex flex-col gap-5 text-white px-5 w-[50%] xl:w-full">
                            <div className="w-full">
                                <div className="w-full">
                                    <h1 className="text-2xl text-center">{bot.owners.length > 1 ? "Developers" : "Developer"}</h1>
                                    <hr className="my-4 w-full" />
                                    <div className="grid grid-cols-2 gap-4">
                                        {devs.map((user: UserStructure) => (
                                            <Link to={`/users/${user.id}`} className="bg-neutral-900 border-2 border-neutral-700 p-2 rounded-lg flex flex-row flex-wrap justify-center xl:flex-col items-center gap-4 transition-colors duration-300 hover:bg-neutral-800">
                                                <img className="rounded-full h-[60px] w-[60px]" src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`} alt={`${user.username}'s Avatar`} />
                                                <span className="text-center">{user.username}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl text-center">Informações</h1>
                                <hr className="my-4 w-full" />
                                <div className="flex flex-col w-full gap-3">
                                    <div>
                                        <strong className="text-lg">Prefixo </strong>
                                        <input maxLength={6} required placeholder="Digite um prefixo" defaultValue={bot.prefixes.join(", ")} className={`bg-transparent p-2 rounded-lg focus:outline-none w-1/3 border-2 ${borderAndBg[color]}`} type="text" />
                                    </div>
                                    <div>
                                        <strong className="text-lg">Votos </strong><span>{bot.total_votes}</span>
                                    </div>
                                    <div>
                                        <div className="flex flex-row gap-3 flex-wrap">
                                            <strong className="text-lg">Tags</strong>
                                            {tags.map(tag => (
                                                <div className={`${borderAndBg[color]} p-[6px] rounded-lg border-2`}>{tag}</div>
                                            ))}
                                            {tags.length < 5 && (
                                                <form onSubmit={handleTagSubmit} className="flex flex-row">
                                                    <input value={tag} required maxLength={30} onChange={handleTagInputChange} placeholder="Digite uma tag" className={`bg-transparent p-2 rounded-lg rounded-r-none focus:outline-none border-2 ${borderAndBg[color]}`} type="text" />
                                                    <Button type="submit" clas="rounded-l-none">
                                                        <icon.BsCheck />
                                                    </Button>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                    <h1 className="text-2xl text-center">Links</h1>
                                    <hr className="my-1 w-full" />
                                    <div className="flex flex-col gap-3 flex-wrap">
                                        <div className="flex items-center gap-3 p-2">
                                            <icon.BsDiscord size={30} fill="#5662F6" />
                                            <input defaultValue={bot.support_server} className={`bg-transparent p-2 rounded-lg focus:outline-none w-full border-2 ${borderAndBg[color]}`} placeholder="Servidor de suporte" type="url" />
                                        </div>
                                        <div className="flex items-center gap-3 p-2">
                                            <icon.BsGithub size={30} />
                                            <input defaultValue={bot.source_code} className={`bg-transparent p-2 rounded-lg focus:outline-none w-full border-2 ${borderAndBg[color]}`} placeholder="Repositório" type="url" />
                                        </div>
                                        <div className="flex items-center gap-3 p-2">
                                            <icon.BsGlobe size={30} />
                                            <input defaultValue={bot.website_url} className={`bg-transparent p-2 rounded-lg focus:outline-none w-full border-2 ${borderAndBg[color]}`} placeholder="Website" type="url" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </section >
    ) : (
        <BotLoading />
    );
};
