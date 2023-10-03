import React, { useContext, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { BotStructure, DiscordWebhookStructure, FindBotStructure } from "../../types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Input, TagInput } from "./Input";
import { borderColor } from "../../utils/theme/border";
import { shadowColor } from "../../utils/theme/shadow";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";
import api from "../../utils/api";

export const FormAddbot: React.FC<{ botData: FindBotStructure | undefined; setSteps: (value: number) => void }> = ({ botData, setSteps }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<BotStructure>();
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const [preview, setPreview] = useState<boolean>(false);
    const onSubmit: SubmitHandler<BotStructure> = async (data: BotStructure): Promise<void> => {
        setSteps(2);

        const formData: BotStructure = {
            _id: botData?.id as string,
            name: botData?.username as string,
            avatar: botData?.avatar as string,
            invite_url: `https://discord.com/api/oauth2/authorize?client_id=${botData?.id}&permissions=70368744177655&scope=bot%20applications.commands`,
            website_url: data.website_url,
            support_server: data.support_server,
            source_code: data.source_code,
            short_description: data.short_description,
            long_description: data.long_description,
            prefixes: data.prefixes,
            owners: [user?.id as string],
            created_at: botData?.createdAt as any,
            verified: false,
            tags: (data.tags as any).split(","),
            approved: false,
            votes: [],
        };

        const bodyVerificar: DiscordWebhookStructure = {
            embeds: [{
                title: "📎 | Novo bot para ser verificado",
                color: 0x58b4f5,
                thumbnail: {
                    url: `https://cdn.discordapp.com/avatars/${botData?.id}/${botData?.avatar}.png`
                },
                fields: [
                    {
                        name: "**Informações**",
                        value: `**Nome:** ${botData?.username} (\`${botData?.id}\`)\n**Prefixo:** ${formData.prefixes}\n**Descrição:** ${formData.short_description}\n**Criado em:** <t:${formData.created_at}:F> (<t:${formData.created_at}:R>)`,
                    },
                    {
                        name: "Clique abaixo para adiciona-lo no servidor",
                        value: formData.invite_url
                    }
                ]
            }]
        };

        const bodyOwner = {
            content: `<@${formData.owners[0]}>`,
            embeds: [{
                thumbnail: {
                    url: `https://cdn.discordapp.com/avatars/${formData._id}/${formData.avatar}.png`
                },
                title: "✅ | Análise",
                color: 0x5fff57,
                description: `O seu bot: **${botData?.username}** (\`${botData?.id}\`) foi enviado pra análise.`
            }]
        };
        const header: {
            headers: {
                Authorization: string
            }
        } = {
            headers: {
                Authorization: await api.getToken()
            }
        };
        await axios.post("/api/webhook/addbot", bodyOwner, header);
        await axios.post("/api/webhook/bot", bodyVerificar, header);
        await axios.post("/api/webhook/raw", {
            content: `\`\`\`json\n${JSON.stringify(formData, null, '\t')}\`\`\``
        }, header);
    };

    return (
        <div className="mb-[70px] p-3 w-[100vw] flex items-center justify-center">
            <div className={`bg-black border-2 shadow-lg transition-all duration-300 ${borderColor[color]} ${shadowColor[color]} rounded-lg p-2`}>
                <div className="xl:mb-[0px] flex gap-1 justify-start flex-col items-center">
                    <h1 className="text-white xl:text-[26px] text-[40px] m-5 xl:m-0 xl:mt-2">
                        <h1 className="text-white flex flex-row text-[32px] mx-10 my-3">
                            <strong className="text-[#ffffff] xl:text-[28px] xl:mr-0 mr-2">
                                Adicione seu Bot
                            </strong>
                        </h1>
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="gap-5 items-center justify-center pt-1 flex flex-col">
                        <Input register={register} name="prefixes" required text="Me diga qual o prefixo do seu bot, caso não tenha, só escrever slash." title="Prefixo" errors={errors} type="input" />
                        <Input register={register} name="long_description" text="Digite uma descrição longa que mostre todas as capacidades do seu bot (markdown habilitado!)" title="Descrição longa" errors={errors} type="textlong" setPreview={setPreview} preview={preview} required />
                        <Input register={register} name="short_description" text="Digite uma descrição curta que irá aparecer na página inicial." title="Descrição curta" required errors={errors} type="input" />
                        <Input register={register} name="source_code" text="Digite o site onde tem o código fonte do bot (opcional)" title="Source Code" errors={errors} type="input" />
                        <Input register={register} name="website_url" text="Digite o website onde se encontra informações do seu bot. (opcional)" title="Website" errors={errors} type="input" />
                        <Input register={register} name="support_server" text="Coloque o link do seu servidor de discord onde é o suporte do seu bot (discord.gg/) (opcional)" title="Servidor do seu bot" errors={errors} type="input" />
                        <TagInput register={register} errors={errors} name="tags" text="Digite as palavras chaves das características que seu bot possui, separe por virgula (moderação,administração)" required title="Tags" />
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