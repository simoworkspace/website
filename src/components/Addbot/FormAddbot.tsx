import React, { useContext, useState, ChangeEvent } from "react";
import api from "../../api";
import { useForm, SubmitHandler } from "react-hook-form";
import { BotStructure, DiscordUser } from "../../types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AxiosResponse } from "axios";
import ReactMarkdown from 'react-markdown';
import { Input } from "./Input";

export const FormAddbot: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<BotStructure>();
    const { color } = useContext(ThemeContext);
    const [botData, setBotData] = useState<DiscordUser>();
    const [markdown, setMarkdown] = useState<string>('');

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMarkdown(event.target.value);
    };

    const renderMarkdown = () => {
        const processedMarkdown = markdown.replace(/\n/g, '  \n');
        return (
            <ReactMarkdown className="
            prose
            prose-p:before:content-none
            prose-p:after:content-none
            prose-code:before:content-none
            prose-code:after:content-none
            prose-code:p-1
            prose-code:rounded-md
            prose-hr:text-white
            prose-lead:text-white
            prose-blockquote:text-white
            prose-headings:text-white
            prose-h1:text-white
            prose-h2:text-white
            prose-h3:text-white
            prose-h4:text-white
            prose-h5:text-white
            prose-h6:text-white
            prose-p:text-white
            prose-a:text-blue-500
            prose-a:hover:text-blue-700
            prose-a:transition-colors
            prose-a:duraton-300
            prose-figure:text-white
            prose-figcaption:text-white
            prose-strong:text-white
            prose-em:text-white
            prose-code:text-white
            prose-pre:text-white
            prose-ol:text-white
            prose-ul:text-white
            prose-li:text-white
            prose-table:text-white
            prose-thead:text-white
            prose-tr:text-white
            prose-th:text-white
            prose-td:text-white
            prose-img:text-white
            prose-video:text-white
            ">{processedMarkdown}</ReactMarkdown>
        );
    };

    const onSubmit: SubmitHandler<BotStructure> = async (data: BotStructure): Promise<void> => {
        try {
            const res: AxiosResponse<DiscordUser> = await api.getDiscordUser(data._id);
            await setBotData(res.data);
            const createdAt = await Math.round(new Date(botData?.id as any / 4194304 + 1420070400000).getTime() / 1000);

            const formData: BotStructure = {
                ...data,
                avatar: botData?.avatar as string,
                name: botData?.username as string,
                approved: false,
                createdAt: createdAt as any,
                verifiedBot: false,
                inviteURL: `https://discord.com/api/oauth2/authorize?client_id=${data._id}&permissions=70368744177655&scope=bot%20applications.commands`,
            };
            console.log(formData);
            await api.addBot(formData, data._id)
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="mb-[70px] p-3 w-[100vw] flex items-center justify-center">
            <div className={`bg-black border-2 shadow-lg transition-all duration-300
            ${color === "blue" && "border-blue-500 shadow-blue-500"} 
            ${color === "green" && "border-green-500 shadow-green-500"} 
            ${color === "red" && "border-red-500 shadow-red-500"}
            ${color === "purple" && "border-purple-500 shadow-purple-500"}
            ${color === "black" && "border-white shadow-white"}
             rounded-lg p-2`}>
                <div className="xl:mb-[0px] flex gap-1 justify-start flex-col items-center">
                    <h1 className="text-white xl:text-[26px] text-[40px] m-5">
                        <h1 className="text-white flex flex-row text-[32px] mx-10 my-3">
                            <strong className="text-[#ffffff] xl:text-[24px] xl:mr-0 mr-2">
                                Adicione seu Bot
                            </strong>
                        </h1>
                    </h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="gap-5 items-center justify-center pt-1 flex flex-col"
                    >
                        <Input register={register} name="_id" text="Você consegue encontrar o id do seu bot no Discord Developer Portal" title="ID" errors={errors} type="input" />
                        <Input register={register} name="_id" text="Me diga qual o prefixo do seu bot, caso não tenha, só escrever slash." title="Prefixo" errors={errors} type="input" />
                        <div className="text-white xl:w-[88vw] xl:flex-col flex-row flex">
                            <div className="w-[800px] xl:w-[100%] justify-center  break-words flex-col flex mr-2">
                                <div className="text-center">
                                    <strong>Descrição longa</strong>
                                </div>
                                <span className="text-center">
                                    Digite todos os detalhes do seu bot, não exite em
                                    colocar informações!
                                </span>
                            </div>
                            <div className="flex flex-col items-center w-[100%]">
                                <div>
                                    <div
                                        className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors.prefix?.message === ""
                                            ? "border-[#ff0000]"
                                            : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                                            } text-white`}
                                    >
                                        <textarea
                                            value={markdown}
                                            {...register("longDescription", {
                                                required: true,
                                            })}
                                            onChange={handleInputChange}
                                            rows={5}
                                            maxLength={200}
                                            minLength={200}
                                            cols={22}
                                            name="longDescription"
                                            className="bg-transparent outline-none w-[100%]"
                                        />
                                    </div>
                                    {renderMarkdown()}
                                </div>
                            </div>
                        </div>
                        <Input register={register} name="_id" text="Digite o site onde tem o código fonte do bot (opcional)" title="Source Code" required={false} errors={errors} type="input" />
                        <Input register={register} name="_id" text="Digite o website onde se encontra informações do seu bot." title="Website" errors={errors} type="input" />
                        <Input register={register} name="_id" text="Coloque o link do seu servidor de discord onde é o suporte do seu bot (discord.gg/)" title="Servidor do seu bot" errors={errors} type="input" />
                        <Input register={register} name="_id" text="Digite as palavras chaves das características que seu bot possui, separe por virgula (moderação, administração)" title="Tags" errors={errors} type="input" />
                        <div className="flex justify-center xl:w-[80vw] m-4">
                            <input
                                type="submit"
                                value="Enviar bot"
                                className="cursor-pointer focus:duration-0 transition-all duration-300 items-center border-neutral-700 bg-neutral-900 hover:bg-neutral-700 border-2 w-[300px] rounded-xl h-[60px] text-white focus:outline focus:outline-offset-2 focus:outline-white focus:utline-2"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};