import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BotStructure, ErrorStructure, FindBotStructure } from "../../types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Input, TagInput } from "./Input";
import { borderColor } from "../../utils/theme/border";
import { shadowColor } from "../../utils/theme/shadow";
import api from "../../utils/api";
import { buttonColor } from "../../utils/theme/button";
import * as icon from "react-icons/ai";
import { PopUpError } from "../Mixed/Error";
import { ApiErrors } from "../../utils/api/errors";
import Translate from "translate";

export const FormAddbot: React.FC<{ botData: FindBotStructure | undefined; setSteps: (value: number) => void }> = ({ botData, setSteps }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<BotStructure>();

    const { color } = useContext(ThemeContext);
    const [error, setError] = useState<ErrorStructure>();

    const [submited, setSubmited] = useState<boolean>(false);
    const [preview, setPreview] = useState<boolean>(false);

    const onSubmit: SubmitHandler<BotStructure> = async (data: BotStructure): Promise<void> => {
        setSubmited(true);

        //@ts-ignore
        const formData: BotStructure = {
            invite_url: `https://discord.com/api/oauth2/authorize?client_id=${botData?.id}&permissions=70368744177655&scope=bot%20applications.commands`,
            website_url: data.website_url,
            support_server: data.support_server,
            source_code: data.source_code,
            short_description: data.short_description,
            long_description: data.long_description,
            prefixes: (data.prefixes as any).split(",").map((a: string) => a.trim()),
            verified: botData?.verified as boolean,
            tags: (data.tags as any).split(","),
        };

        for (let i in formData) {
            if (formData[i as keyof BotStructure] === "") {
                delete formData[i as keyof BotStructure];
            }
        }

        try {
            await api.addBot(formData, botData?.id as string);

            setSteps(2);
        } catch (error: any) {
            setSubmited(false);

            setError({
                show: true,
                title: "Erro ao tentar adicionar um bot",
                message: ApiErrors[error.response.data.errors] || (await Translate(error.response.data.errors[0], { from: "en", to: "pt" }))
            });
        }
    };

    return (
        <div className="mb-[70px] p-3 w-screen flex items-center justify-center">
            <div className={`bg-neutral-900 border-2 shadow-lg transition-all duration-300 ${borderColor[color]} ${shadowColor[color]} rounded-lg p-2`}>
                <div className="xl:mb-[0px] flex gap-1 justify-start flex-col items-center">
                    <h1 className="text-white xl:text-[26px] text-[40px] m-5 xl:m-0 xl:mt-2">
                        <h1 className="text-white flex flex-row text-[32px] mx-10 my-3">
                            <strong className="text-[#ffffff] xl:text-[28px] xl:mr-0 mr-2">
                                Adicione seu Bot
                            </strong>
                        </h1>
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="gap-5 items-center justify-center pt-1 flex flex-col">
                        <Input disabled={submited} register={register} errors={errors} name="prefixes" text="Me diga qual o prefixo do seu bot, caso não tenha, só escrever slash. separe por virgula (s!, S!)" required title="Prefixo" type="input" maxLength={16} />
                        <Input disabled={submited} register={register} name="long_description" text="Digite uma descrição longa que mostre todas as capacidades do seu bot (markdown habilitado!)" title="Descrição longa" errors={errors} type="textlong" setPreview={setPreview} preview={preview} required />
                        <Input disabled={submited} register={register} name="short_description" text="Digite uma descrição curta que irá aparecer na página inicial." title="Descrição curta" required errors={errors} type="input" minLength={50} maxLength={80} />
                        <Input disabled={submited} register={register} name="source_code" text="Digite o site onde tem o código fonte do bot" optional title="Source Code" errors={errors} type="input" inputType="url" />
                        <Input disabled={submited} register={register} name="website_url" text="Digite o website onde se encontra informações do seu bot" optional title="Website" errors={errors} type="input" inputType="url" />
                        <Input disabled={submited} register={register} name="support_server" text="Coloque o link do seu servidor de discord onde é o suporte do seu bot (https://discord.gg/)" optional title="Servidor do seu bot" errors={errors} type="input" inputType="url" />
                        <TagInput disabled={submited} register={register} errors={errors} name="tags" text="Digite as palavras chaves das características que seu bot possui, separe por virgula (moderação, administração)" required title="Tags" />
                        <div className="flex justify-center xl:w-[80vw] m-4 items-center gap-3">
                            <input
                                type="submit"
                                value="Enviar bot"
                                disabled={submited}
                                className={`disabled:cursor-default disabled:opacity-70 cursor-pointer transition-all duration-300 items-center border-2 w-[300px] rounded-xl h-[60px] text-white ${buttonColor[color]}`}
                            />
                            {submited && <icon.AiOutlineLoading3Quarters fill="#fff" size={30} className="animate-spin" />}
                        </div>
                    </form>
                </div>
            </div>
            {error?.show && <PopUpError setShow={setError} show={error} />}
        </div>
    );
};
