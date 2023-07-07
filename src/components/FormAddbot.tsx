import React, { useContext, useState } from "react";
import api from "../api";
import { useForm, SubmitHandler } from "react-hook-form";
import { BotStructure } from "../types";
import { ThemeContext } from "../contexts/ThemeContext";

export const FormAddbot: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<BotStructure>();
    const { color } = useContext(ThemeContext);

    const onSubmit: SubmitHandler<BotStructure> = async (data: BotStructure): Promise<void> => {
        try {
            const formData: BotStructure = {
                ...data,
                avatar: "oi",
                name: "calorbot",
                approved: false,
                createdAt: "hoje",
                verifiedBot: true,
                inviteURL: "oie",
            };
            await api.addBot(formData, data._id);
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="mb-[70px] p-3 w-[100vw] flex items-center justify-center">
            <div className={`bg-black border-2 shadow-lg transition-all duration-300  ${ 
                color === "blue" && "border-blue-500 shadow-blue-500"
            } ${color === "green" && "border-green-500 shadow-green-500"} ${
                color === "red" && "border-red-500 shadow-red-500"
            } rounded-lg p-2`}>
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
                        <div className="text-white xl:w-[88vw] xl:flex-col flex-row flex">
                            <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                                <div className="text-center">
                                    <strong>ID</strong>
                                </div>
                                <span className="text-center">
                                    Você consegue encontrar o id do seu bot no{" "}
                                    <a
                                        className="text-blue-600 hover:outline"
                                        href="https://discord.com/developers/applications"
                                    >
                                        Discord Developer Portal
                                    </a>
                                </span>
                            </div>
                            <div className="flex flex-col items-center w-[100%]">
                                <div
                                    className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors._id?.message === ""
                                        ? "border-[#ff0000]"
                                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                                        } text-white`}
                                >
                                    <input
                                        {...register("_id", { required: true })}
                                        name="_id"
                                        className="bg-transparent outline-none w-[100%]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-white xl:w-[88vw] xl:flex-col flex-row flex">
                            <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                                <div className="text-center">
                                    <strong>Prefixo</strong>
                                </div>
                                <span className="text-center">
                                    Me diga qual o prefixo do seu bot, caso não tenha,
                                    só escrever slash.
                                </span>
                            </div>
                            <div className="flex flex-col items-center w-[100%]">
                                <div
                                    className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors.prefix?.message === ""
                                        ? "border-[#ff0000]"
                                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                                        } text-white`}
                                >
                                    <input
                                        {...register("prefix", { required: true })}
                                        name="prefix"
                                        className="bg-transparent outline-none w-[100%]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-white xl:w-[88vw] xl:flex-col  flex-row flex">
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
                                <div
                                    className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors.prefix?.message === ""
                                        ? "border-[#ff0000]"
                                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                                        } text-white`}
                                >
                                    <textarea
                                        {...register("longDescription", {
                                            required: true,
                                        })}
                                        rows={5}
                                        maxLength={200}
                                        minLength={200}
                                        cols={22}
                                        name="longDescription"
                                        className="bg-transparent outline-none w-[100%]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-white xl:w-[88vw] xl:flex-col  flex-row flex">
                            <div className="w-[800px] xl:w-[100%] justify-center break-words flex-col flex mr-2">
                                <div className="text-center">
                                    <strong>Descrição Curta</strong>
                                </div>
                                <span className="text-center">
                                    Digite uma descrição curta, oque irá aparecer na
                                    lista como destaque.
                                </span>
                            </div>
                            <div className="flex flex-col items-center w-[100%]">
                                <div
                                    className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors.prefix?.message === ""
                                        ? "border-[#ff0000]"
                                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                                        } text-white`}
                                >
                                    <textarea
                                        {...register("shortDescription", {
                                            required: true,
                                        })}
                                        name="shortDescription"
                                        rows={5}
                                        maxLength={200}
                                        minLength={200}
                                        cols={22}
                                        className="bg-transparent outline-none w-[100%]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-white xl:w-[88vw] xl:flex-col  flex-row flex">
                            <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                                <div className="text-center">
                                    <strong>Source Code</strong>
                                </div>
                                <span className="text-center">
                                    Digite o site onde tem o código fonte do bot
                                    (opcional){" "}
                                </span>
                            </div>
                            <div className="flex flex-col items-center w-[100%]">
                                <div
                                    className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors.prefix?.message === ""
                                        ? "border-[#ff0000]"
                                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                                        } text-white`}
                                >
                                    <input
                                        {...register("sourceCode", { required: true })}
                                        type="text"
                                        name="sourceCode"
                                        className="bg-transparent outline-none w-[100%]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-white xl:w-[88vw] xl:flex-col  flex-row flex">
                            <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                                <div className="text-center">
                                    <strong>Website</strong>
                                </div>
                                <span className="text-center">
                                    Digite o website onde se encontra informações do seu
                                    bot.
                                </span>
                            </div>
                            <div className="flex flex-col items-center w-[100%]">
                                <div
                                    className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors.prefix?.message === ""
                                        ? "border-[#ff0000]"
                                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                                        } text-white`}
                                >
                                    <input
                                        {...register("websiteURL", { required: true })}
                                        type="text"
                                        name="websiteURL"
                                        className="bg-transparent outline-none w-[100%]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-white xl:w-[88vw] xl:flex-col  flex-row flex">
                            <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                                <div className="text-center">
                                    <strong>Servidor de suporte</strong>
                                </div>
                                <span className="text-center">
                                    Coloque o link do seu servidor de discord onde é o
                                    suporte do seu bot (discord.gg/)
                                </span>
                            </div>
                            <div className="flex flex-col items-center w-[100%]">
                                <div
                                    className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors.prefix?.message === ""
                                        ? "border-[#ff0000]"
                                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                                        } text-white`}
                                >
                                    <input
                                        {...register("supportServer", {
                                            required: true,
                                        })}
                                        type="text"
                                        name="supportServer"
                                        className="bg-transparent outline-none w-[100%]"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-white xl:w-[88vw] xl:flex-col  flex-row flex">
                            <div className="w-[800px] xl:w-[100%] justify-center break-words flex-col flex mr-2">
                                <div className="text-center">
                                    <strong>Tags</strong>
                                </div>
                                <span className="text-center">
                                    Digite as palavras chaves das características que
                                    seu bot possui, separe por virgula (moderação,
                                    administração)
                                </span>
                            </div>
                            <div className="flex flex-col items-center w-[100%]">
                                <div
                                    className={`justify-center flex outline-none bg-[#2c2c2c] w-[100%] rounded-xl p-3 border-[2px] transition-all duration-100 ${errors.prefix?.message === ""
                                        ? "border-[#ff0000]"
                                        : " border-[#8b8b8b] hover:border-neutral-200 focus-within:border-white"
                                        } text-white`}
                                >
                                    <textarea
                                        {...register("tags", { required: true })}
                                        name="tags"
                                        rows={2}
                                        maxLength={200}
                                        minLength={10}
                                        cols={22}
                                        className="bg-transparent outline-none w-[100%]"
                                    />
                                </div>
                            </div>
                        </div>
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