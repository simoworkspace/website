import { FC, useContext, useEffect, useState } from "react";
import { AuditLogStructure, ErrorStructure, Team } from "../../types";
import { borderColor } from "../../utils/theme/border";
import { ThemeContext } from "../../contexts/ThemeContext";
import { UserContext } from "../../contexts/UserContext";
import simo from "../../assets/images/simo.png";
import { Link } from "react-router-dom";
import * as iconBI from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import api from "../../utils/api";
import { ApiErrors } from "../../utils/api/errors";
import { Input } from "../Addbot/Input";
import * as iconAI from "react-icons/ai";
import * as iconMD from "react-icons/md";
import { Button } from "../Mixed/Button";
import { buttonColor } from "../../utils/theme/button";

const TeamPermissions = {
    Administrator: 0,
    ReadOnly: 1,
    Owner: 2
}

export const EditTeam: FC<{ team: Team | undefined }> = ({ team }) => {
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState<boolean>(false);
    const [inviteHash, setInviteHash] = useState<string>("");
    const [submitedEdit, setSubmitedEdit] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Team>();
    const [error, setError] = useState<ErrorStructure>();
    const [logs, setLogs] = useState<AuditLogStructure>();

    const getUserTeams = async (): Promise<void> => {
        const { data: { invite_code }, data } = await api.getTeam(team?.id as string);
        await getAuditLogs();

        setInviteHash(invite_code);
    };

    const onSubmitEdit: SubmitHandler<Team> = async (data: Team) => {
        setSubmitedEdit(true);

        const { avatar_url, description, name, invite_code } = data;

        const formData: Team = {
            avatar_url,
            description,
            name,
            invite_code
        };

        for (let i in formData) {
            if (!team) return;

            if (formData[i as keyof Team] === team[i as keyof Team]) {
                delete formData[i as keyof Team];
            }
        }

        console.log(formData);

        try {
            await api.patchTeam(team?.id as string, formData);

            await getUserTeams();
            await getAuditLogs();

            setError({
                show: false
            });
        } catch (error: any) {
            setSubmitedEdit(false);
            setError({
                show: true,
                title: "Erro ao tentar criar um time",
                message: ApiErrors[error.response.data.code]
            });
        }

        setSubmitedEdit(false);
    };

    const updateInviteHash = async (): Promise<void> => {
        if (team) {
            setLoading(true);
            await getAuditLogs();

            //@ts-ignore
            const req = await api.patchTeam(teamID, {
                invite_code: Math.random().toString(22).slice(2, 8)
            });

            setInviteHash(req.data.invite_code);

            setLoading(false);
        }
    };

    const getAuditLogs = async () => {
        const { data } = await api.getAuditLogs(team?.id as string);

        return setLogs(data);
    };

    useEffect(() => {
        getUserTeams();
        getAuditLogs();
    }, []);

    return team ? (
        <>
            <div className="text-white xl:text-[26px] text-[40px] m-2 xl:m-0 xl:mt-2 w-full flex items-center justify-center">
                <span className="text-white flex flex-row text-[26px] mx-10 my-3">
                    <h1 className="text-[#ffffff] xl:text-[28px] xl:mr-0 mr-2 font-bold xl:text-center">Editar time <strong>{team?.name}</strong></h1>
                </span>
            </div>
            <form onSubmit={handleSubmit(onSubmitEdit)} className="gap-5 items-center justify-center pt-1 flex flex-col">
                <div className="flex flex-col gap-3">
                    <Input errors={errors} optional name="name" defaultValue={team?.name} register={register} text="Digite o nome que o seu time irá receber" title="Nome" type="input" maxLength={15} minLength={3} placeholder="Mango Team" />
                    <Input errors={errors} optional name="avatar_url" defaultValue={team?.avatar_url} register={register} text="Coloque o link de imagem do avatar do seu time" title="Avatar em URL" inputType="url" type="input" placeholder="https://i.imgur.com/1DBO2wh.jpeg" />
                    <Input errors={errors} name="description" register={register} defaultValue={team?.description} text="Digite uma breve descrição sobre seu time" title="Descrição" optional type="input" placeholder="Meu time é um time legal e bonito..." maxLength={50} minLength={5} />
                </div>
                <div className="flex justify-center m-4 xl:m-0 xl:w-full xl:mb-4 items-center gap-3">
                    <input
                        type="submit"
                        value="Salvar alterações"
                        disabled={submitedEdit}
                        className={`disabled:cursor-default disabled:opacity-70 cursor-pointer transition-all duration-300 items-center border-2 w-[300px] rounded-xl h-[60px] text-white xl:w-full ${buttonColor[color]}`}
                    />
                    {submitedEdit && <iconAI.AiOutlineLoading3Quarters fill="#fff" size={30} className="animate-spin" />}
                </div>
            </form>
            <div className="flex flex-col w-full py-3">
                <div className="text-white xl:text-[26px] text-[26px] font-bold m-2 xl:m-0 xl:mt-2 w-full flex items-center justify-center">
                    <span>Link de convite</span>
                </div>
                <div className="flex flex-row xl:flex-col bg-neutral-800 w-full h-full rounded-lg items-center">
                    <input disabled value={`${new URL(location.href).origin}/team/${team.id}/invite/${inviteHash}`} placeholder="Atualizar link de invite" className="flex-grow p-2 w-full bg-transparent xl:break-words" />
                    <div className="flex flex-row xl:w-full">
                        <Button disabled={loading} clas="rounded-r-none" action={async () => await navigator.clipboard.writeText(`${new URL(location.href).origin}/team/${team.id}/invite/${inviteHash}`)}>
                            <iconMD.MdOutlineContentCopy fill="#fff" size={26} />
                        </Button>
                        <Button action={updateInviteHash} clas="rounded-l-none xl:flex xl:flex-grow">{loading ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={26} className="animate-spin" /> : "Atualizar"}</Button>
                    </div>
                </div>
            </div>
        </>
    ) : (
        <div>carregando time...</div>
    )
};