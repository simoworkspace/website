import React from "react";
import { API_KEY, API_URL } from "../../config.json";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
    _id: string;
    prefix: string;
    longDescription: string;
    shortDescription: string;
    sourceCode: string;
    websiteURL: string;
    supportServer: string;
    tags: string;
}

export const FormAddbot: React.FC = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>();

    console.log(errors._id);

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        try {
            const formData = {
                ...data,
                avatar: "oi",
                name: "calorbot",
                approved: false,
                createdAt: "hoje",
            };

            const res = await axios.post(
                `${API_URL}/bot/${data._id}`,
                formData,
                {
                    headers: {
                        Authorization: API_KEY,
                    },
                }
            );
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div className="xl:mb-[80px] flex gap-1 justify-center flex-col items-center">
            <h1 className="text-white text-[40px] m-5">
                Adicione seu <strong className="text-roxo-legal">Bot</strong>!
            </h1>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="gap-5 items-center flex flex-col m-0"
            >
                <div className="text-white xl:w-[98vw] xl:flex-col flex-row flex">
                    <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                        <div className="xl:text-center">
                            <strong>ID</strong>
                        </div>
                        <span>
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
                            className={`justify-center flex outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${
                                errors._id?.message === ""
                                    ? "border-[#ff0000]"
                                    : " border-[#8b8b8b] hover:border-roxo-legal focus-within:border-roxo-legal"
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
                <div className="text-white xl:w-[98vw] xl:flex-col flex-row flex">
                    <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                        <div className="xl:text-center">
                            <strong>Prefixo</strong>
                        </div>
                        <span>
                            Me diga qual o prefixo do seu bot, caso não tenha,
                            só escrever slash.
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-[100%]">
                        <div
                            className={`justify-center flex outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${
                                errors.prefix?.message === ""
                                    ? "border-[#ff0000]"
                                    : " border-[#8b8b8b] hover:border-roxo-legal focus-within:border-roxo-legal"
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
                <div className="text-white xl:w-[98vw] xl:flex-col  flex-row flex">
                    <div className="w-[800px] xl:w-[100%] justify-center  break-words flex-col flex mr-2">
                        <div className="xl:text-center">
                            <strong>Descrição longa</strong>
                        </div>
                        <span>
                            Digite todos os detalhes do seu bot, não exite em
                            colocar informações!
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-[100%]">
                        <div
                            className={`justify-center flex outline-none bg-gray-900 w-[100%] rounded-xl p-3 border-[2px] transition-all duration-100 ${
                                errors.prefix?.message === ""
                                    ? "border-[#ff0000]"
                                    : " border-[#8b8b8b] hover:border-roxo-legal focus-within:border-roxo-legal"
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
                <div className="text-white xl:w-[98vw] xl:flex-col  flex-row flex">
                    <div className="w-[800px] xl:w-[100%] justify-center break-words flex-col flex mr-2">
                        <div className="xl:text-center">
                            <strong>Descrição Curta</strong>
                        </div>
                        <span>
                            Digite uma descrição curta, oque irá aparecer na
                            lista como destaque.
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-[100%]">
                        <div
                            className={`justify-center flex outline-none bg-gray-900 w-[100%] rounded-xl p-3 border-[2px] transition-all duration-100 ${
                                errors.prefix?.message === ""
                                    ? "border-[#ff0000]"
                                    : " border-[#8b8b8b] hover:border-roxo-legal focus-within:border-roxo-legal"
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
                <div className="text-white xl:w-[98vw] xl:flex-col  flex-row flex">
                    <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                        <div className="xl:text-center">
                            <strong>Source Code</strong>
                        </div>
                        <span>
                            Digite o site onde tem o código fonte do bot
                            (opcional){" "}
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-[100%]">
                        <div
                            className={`justify-center flex outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${
                                errors.prefix?.message === ""
                                    ? "border-[#ff0000]"
                                    : " border-[#8b8b8b] hover:border-roxo-legal focus-within:border-roxo-legal"
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
                <div className="text-white xl:w-[98vw] xl:flex-col  flex-row flex">
                    <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                        <div className="xl:text-center">
                            <strong>Website</strong>
                        </div>
                        <span>
                            Digite o website onde se encontra informações do seu
                            bot.
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-[100%]">
                        <div
                            className={`justify-center flex outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${
                                errors.prefix?.message === ""
                                    ? "border-[#ff0000]"
                                    : " border-[#8b8b8b] hover:border-roxo-legal focus-within:border-roxo-legal"
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
                <div className="text-white xl:w-[98vw] xl:flex-col  flex-row flex">
                    <div className="w-[800px] xl:w-[100%] break-words flex-col flex mr-2">
                        <div className="xl:text-center">
                            <strong>Servidor de suporte</strong>
                        </div>
                        <span>
                            Coloque o link do seu servidor de discord onde é o
                            suporte do seu bot (discord.gg/)
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-[100%]">
                        <div
                            className={`justify-center flex outline-none bg-gray-900 w-[100%] h-[60px] rounded-xl p-3 border-[2px] transition-all duration-100 ${
                                errors.prefix?.message === ""
                                    ? "border-[#ff0000]"
                                    : " border-[#8b8b8b] hover:border-roxo-legal focus-within:border-roxo-legal"
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
                <div className="text-white xl:w-[98vw] xl:flex-col  flex-row flex">
                    <div className="w-[800px] xl:w-[100%] justify-center break-words flex-col flex mr-2">
                        <div className="xl:text-center">
                            <strong>Tags</strong>
                        </div>
                        <span>
                            Digite as palavras chaves das características que
                            seu bot possui, separe por virgula (moderação,
                            administração)
                        </span>
                    </div>
                    <div className="flex flex-col items-center w-[100%]">
                        <div
                            className={`justify-center flex outline-none bg-gray-900 w-[100%] rounded-xl p-3 border-[2px] transition-all duration-100 ${
                                errors.prefix?.message === ""
                                    ? "border-[#ff0000]"
                                    : " border-[#8b8b8b] hover:border-roxo-legal focus-within:border-roxo-legal"
                            } text-white`}
                        >
                            <textarea
                                {...register("tags", { required: true })}
                                name="tags"
                                rows={2}
                                maxLength={200}
                                minLength={200}
                                cols={22}
                                className="bg-transparent outline-none w-[100%]"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex justify-center m-4">
                    <input
                        type="submit"
                        value="Enviar bot"
                        className="cursor-pointer hover:bg-[#2d2dda] focus:duration-0 transition-all duration-300 items-center bg-[#5353eb] w-[300px] rounded-xl h-[60px] text-white focus:outline focus:outline-offset-2 focus:outline-white focus:utline-2"
                    />
                </div>
            </form>
        </div>
    );
};

export default FormAddbot;