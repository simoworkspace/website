import { AxiosResponse } from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, Params } from "react-router-dom";
import { BotStructure, DiscordUser, ErrorStructure } from "../../types";
import api from '../../utils/api';
import { ThemeContext } from "../../contexts/ThemeContext";
import { Markdown } from "../../components/Markdown/Markdown";
import { borderAndBg } from "../../utils/theme/border&bg";
import { borderColor } from "../../utils/theme/border";
import * as icon from "react-icons/bs";
import * as iconAI from "react-icons/ai";
import { BotLoading } from "../Bot/BotLoading";
import { Button } from "../Mixed/Button";
import { PopUpError } from "../Mixed/Error";
import { ApiErrors } from "../../utils/api/errors";

export const DashboardEdit: React.FC = () => {
    const params: Params<string> = useParams<string>();
    const botid = params.botId as string;

    const { color } = useContext(ThemeContext);

    const [dev, setDev] = useState<{ id: string, avatar: string, username: string }>();
    const [bot, setBot] = useState<BotStructure>();

    const [tags, setTags] = useState<string[]>([]);
    const [tag, setTag] = useState<string>("");

    const [error, setError] = useState<ErrorStructure>();

    const [markdown, setMarkdown] = useState<string>("");
    const [changesMade, setChangesMade] = useState<{ changes?: boolean; loading?: boolean }>({ changes: false, loading: false });

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

    const handleSupportServerChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;

        setEditedBot({ support_server: value });
        setChangesMade({ changes: true });
    };

    const handleSourceCodeChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;

        setEditedBot({ source_code: value });
        setChangesMade({ changes: true });
    };

    const handleWebsiteChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;

        setEditedBot({ website_url: value });
        setChangesMade({ changes: true });
    };

    const handlePrefixChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = event.target;

        setEditedBot({ prefixes: value.split(", ") });
        setChangesMade({ changes: true });
    };

    const handleTagSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setTag("");
        setEditedBot({ tags });
        setTags([...tags, tag]);
        setChangesMade({ changes: true });
    };

    const handleTagInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const tag = event.target.value;
        setTag(tag);
    };

    const deleteTag = (tag: string): void => {
        const newTags = tags.filter((a) => a !== tag);
        setTags(newTags);
        setChangesMade({ changes: true });
    };

    const getBotInDB = async (): Promise<void> => {
        const res1: AxiosResponse<BotStructure> = await api.getBotInfos(botid);
        const { owner_id } = res1.data;

        const res: AxiosResponse<DiscordUser> = await api.getDiscordUser(owner_id);
        const { username, avatar, id } = res.data;

        setDev({ username, avatar, id, });

        return setBot(res1.data);
    };

    const updateBot = async (): Promise<void> => {
        try {
            setChangesMade({ loading: true, changes: true });

            const updatedBotData = {
                long_description: markdown || bot?.long_description,
                short_description: editedBot.short_description,
                tags: tags,
                support_server: editedBot.support_server,
                source_code: editedBot.source_code,
                website_url: editedBot.website_url,
                prefixes: editedBot.prefixes,
            };

            //@ts-ignore
            await api.patchBot(botid, updatedBotData);

            setChangesMade({ changes: false, loading: false });
        } catch (error: any) {
            setChangesMade({ changes: false, loading: false });
            setError({
                title: "Ocoreu um erro ao atualizar seu bot",
                show: true,
                //@ts-ignore
                message: ApiErrors[error.response.data.code] || JSON.stringify(error.response.data)
            });
        }
    };

    useEffect(() => {
        const textarea = document.getElementById("textoi");
        if (textarea) {
            textarea.style.height = `${textarea.scrollHeight}px`;
        }

        window.onbeforeunload = () => {
            if (changesMade.changes) {
                return "Você pode perder o seu salvament NIOFSAHJKLAHJKLFHJLSK  se fechar a opágina";
            }
        };
    });

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
                <section className={`w-[90%] min-w-[680px] xl:min-w-0 mb-5 bg-neutral-900 border-2 ${borderColor[color]} border-t-0 rounded-t-none rounded-lg p-10 xl:p-3`}>
                    <div className="flex flex-row xl:flex-col h-full">
                        <div className="w-[80%] h-full xl:w-full break-words xl:justify-center mr-4">
                            <div className={`justify-center mb-5 items-center flex outline-none bg-[#2c2c2c] w-full xl:w-[80vw] h-full rounded-xl p-3 border-[2px] transition-all duration-100 ${borderColor[color]} text-white`}>
                                <textarea
                                    id="textoi"
                                    onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                                        setMarkdown(event.target.value);
                                        setChangesMade({ changes: true });
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
                            <div>
                                <h1 className="text-2xl text-center">Informações</h1>
                                <hr className="my-4 w-full" />
                                <div className="flex flex-col w-full gap-3">
                                    <div>
                                        <strong className="text-lg">Prefixo </strong>
                                        <input onChange={handlePrefixChange} maxLength={6} required placeholder="Digite um prefixo" defaultValue={bot.prefixes.join(", ")} className={`bg-transparent p-2 rounded-lg focus:outline-none w-1/3 border-2 ${borderAndBg[color]}`} type="text" />
                                    </div>
                                    <div>
                                        <strong className="text-lg">Votos </strong><span>{bot.total_votes}</span>
                                    </div>
                                    <div>
                                        <div className="flex flex-row gap-3 flex-wrap">
                                            <strong className="text-lg">Tags</strong>
                                            {tags.map(tag => (
                                                <div className={`${borderAndBg[color]} p-[6px] rounded-lg border-2 flex flex-row gap-2`}>
                                                    <span>{tag}</span>
                                                    {tags.length > 1 && (
                                                        <button onClick={() => deleteTag(tag)}>
                                                            <icon.BsX />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                            {tags.length < 5 && (
                                                <form onSubmit={handleTagSubmit} className="flex flex-row xl:w-full">
                                                    <input value={tag} required maxLength={30} onChange={handleTagInputChange} placeholder="Digite uma tag" className={`bg-transparent p-2 rounded-lg rounded-r-none focus:outline-none border-2 xl:w-full ${borderAndBg[color]}`} type="text" />
                                                    <Button type="submit" clas="rounded-l-none xlr:w-full">
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
                                            <input onChange={handleSupportServerChange} defaultValue={bot.support_server} className={`bg-transparent p-2 rounded-lg focus:outline-none w-full border-2 ${borderAndBg[color]}`} placeholder="Servidor de suporte" type="url" />
                                        </div>
                                        <div className="flex items-center gap-3 p-2">
                                            <icon.BsGithub size={30} />
                                            <input onChange={handleSourceCodeChange} defaultValue={bot.source_code} className={`bg-transparent p-2 rounded-lg focus:outline-none w-full border-2 ${borderAndBg[color]}`} placeholder="Repositório" type="url" />
                                        </div>
                                        <div className="flex items-center gap-3 p-2">
                                            <icon.BsGlobe size={30} />
                                            <input onChange={handleWebsiteChange} defaultValue={bot.website_url} className={`bg-transparent p-2 rounded-lg focus:outline-none w-full border-2 ${borderAndBg[color]}`} placeholder="Website" type="url" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className={`transition-opacity duration-300 ${changesMade ? "visible opacity-100" : "opacity-0 invisible"} max-w-[1500px] flex justify-center`}>
                    {changesMade.changes && (
                        <div className={`w-[90vw] absolute xl:z-10 xl:fixed xl:bottom-10 xl:w-[95vw] bottom-2 bg-neutral-800 ${borderColor[color]} border-2 rounded-lg`}>
                            <div className="flex p-2 text-white w-full items-center">
                                <span className="flex flex-grow">Você tem alterações para serem salvas</span>
                                <div className="flex gap-2 items-center">
                                    <button onClick={() => {
                                        window.location.reload();

                                        setChangesMade({ changes: false });
                                    }} className="text-neutral-400">Desfazer</button>
                                    <Button disabled={changesMade.loading} clas="disabled:opacity-50" action={updateBot}>
                                        {!changesMade.loading ? <span>Salvar alterações</span> : <iconAI.AiOutlineLoading3Quarters fill="#fff" className="animate-spin" />}
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {error?.show && <PopUpError setShow={setError} show={error} />}
        </section>
    ) : (
        <BotLoading />
    );
};
