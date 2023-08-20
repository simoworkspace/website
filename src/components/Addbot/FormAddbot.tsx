import React, { useContext, useEffect, useState } from "react";
import api from "../../utils/api";
import { useForm, SubmitHandler } from "react-hook-form";
import { BotStructure, DiscordUser, DiscordWebhookStructure } from "../../types";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AxiosResponse } from "axios";
import { Input } from "./Input";
import { borderColor } from "../../utils/theme/border";
import { shadowColor } from "../../utils/theme/shadow";
import axios from "axios";
import { UserContext } from "../../contexts/UserContext";

interface botInfos extends DiscordUser {
    createdAt: number;
};

export const FormAddbot: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<BotStructure>();
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const [preview, setPreview] = useState<boolean>(false);
    const [botInfos, setBotInfos] = useState<botInfos>();

    const getBotInfos = async (botid: string): Promise<any> => {
        const req: AxiosResponse<DiscordUser> = await api.getDiscordUser(botid);
        const createdAt = Math.round(new Date(req.data.id as any / 4194304 + 1420070400000).getTime() / 1000);

        return setBotInfos({ ...req.data, createdAt: createdAt });
    };

    const onSubmit: SubmitHandler<BotStructure> = async (data: BotStructure): Promise<void> => {
        if (!user) return;
        
        try {
            const botInfoResponse: AxiosResponse<botInfos> = await getBotInfos(data._id);

            const botInfoData = await botInfoResponse.data;

            const formData: BotStructure = {
                ...data,
                avatar: botInfoData.avatar as string,
                name: botInfoData.username as string,
                approved: false,
                createdAt: botInfoData.createdAt as any,
                verifiedBot: false,
                owners: [user?.id],
                inviteURL: `https://discord.com/api/oauth2/authorize?client_id=${data._id}&permissions=70368744177655&scope=bot%20applications.commands`,
            };
            console.log(formData);
            console.log(botInfos)
            const bodyVerificar: DiscordWebhookStructure = {
                embeds: [{
                    title: "📎 | Novo bot para ser verificado",
                    color: 0x58b4f5,
                    thumbnail: {
                        url: `https://cdn.discordapp.com/avatars/${formData._id}/${formData.avatar}.png`
                    },
                    fields: [
                        {
                            name: "**Informações**",
                            value: `**Nome:** ${formData.name} (\`${formData._id}\`)\n**Prefixo:** ${formData.prefix}\n**Descrição:** ${formData.shortDescription}\n**Criado em:** <t:${formData.createdAt}:F>`,
                        },
                        {
                            name: "Clique abaixo para adiciona-lo no servidor",
                            value: formData.inviteURL
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
                    description: `O seu bot: **${formData.name}** (\`${formData._id}\`) foi enviado pra análise.`
                }]
            };

            await axios.post("https://discord.com/api/webhooks/1142153843455570062/bvnUKDshzJKT5Ih3sKCkD1YyPWMYRZMeQDioIWLu95_aK3dVUpUlk8MpZrp5kB7u90EX", bodyOwner);
            await axios.post("https://discord.com/api/webhooks/1142478183137017947/Mq13YWEmj6FXj3WPnbInfBuEzV-0ioI8NsSg_Rv6PotORusw6rkjzaGtqRVwmsn2wuQm", bodyVerificar);
            // await api.addBot(formData, data._id)
        } catch (error: any) {
            console.error(error);
        }
    };

    return (
        <div className="mb-[70px] p-3 w-[100vw] flex items-center justify-center">
            <div className={`bg-black border-2 shadow-lg transition-all duration-300 ${borderColor[color]} ${shadowColor[color]} rounded-lg p-2`}>
                <div className="xl:mb-[0px] flex gap-1 justify-start flex-col items-center">
                    <h1 className="text-white xl:text-[26px] text-[40px] m-5">
                        <h1 className="text-white flex flex-row text-[32px] mx-10 my-3">
                            <strong className="text-[#ffffff] xl:text-[24px] xl:mr-0 mr-2">
                                Adicione seu Bot
                            </strong>
                        </h1>
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="gap-5 items-center justify-center pt-1 flex flex-col">
                        <Input register={register} name="_id" required text="Você consegue encontrar o id do seu bot no Discord Developer Portal" title="ID" errors={errors} type="input" />
                        <Input register={register} name="prefix" required text="Me diga qual o prefixo do seu bot, caso não tenha, só escrever slash." title="Prefixo" errors={errors} type="input" />
                        <Input register={register} name="longDescription" text="Digite uma descrição longa que mostre todas as capacidades do seu bot (markdown habilitado!)" title="Descrição longa" errors={errors} type="textlong" setPreview={setPreview} preview={preview} required />
                        <Input register={register} name="shortDescription" text="Digite uma descrição curta que irá aparecer na página inicial." title="Descrição curta" required errors={errors} type="input" />
                        <Input register={register} name="source" text="Digite o site onde tem o código fonte do bot (opcional)" title="Source Code" errors={errors} type="input" />
                        <Input register={register} name="website" text="Digite o website onde se encontra informações do seu bot. (opcional)" title="Website" errors={errors} type="input" />
                        <Input register={register} name="discord" text="Coloque o link do seu servidor de discord onde é o suporte do seu bot (discord.gg/) (opcional)" title="Servidor do seu bot" errors={errors} type="input" />
                        <Input register={register} name="tags" text="Digite as palavras chaves das características que seu bot possui, separe por virgula (moderação,administração)" required title="Tags" errors={errors} type="input" />
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