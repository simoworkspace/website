import { FC, useContext, useEffect, useState } from "react";
import { DashboardUser } from "../Dashboard/User";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuditLogStructure, ErrorStructure, Team, UserStructure } from "../../types";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { borderColor } from "../../utils/theme/border";
import { SubmitHandler, useForm } from "react-hook-form";
import * as icon from "react-icons/ai";
import * as iconMD from "react-icons/md";
import { Input } from "../Addbot/Input";
import { buttonColor } from "../../utils/theme/button";
import api from "../../utils/api";
import { Params, useParams } from "react-router-dom";
import { PopUpError } from "../Mixed/Error";
import { ApiErrors } from "../../utils/api/errors";
import { ManageMembers } from "./ManageMembers";
import { Button } from "../Mixed/Button";
import { TeamAddbot } from "./Addbot";
import { AuditLogs } from "./AuditLogs";

export const ManageTeamComponent: FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<Team>();
    const { color } = useContext(ThemeContext);
    const params: Params = useParams<string>();
    const teamID: string = params.teamId as string;
    const { user } = useContext(UserContext);
    const [team, setTeam] = useState<Team | undefined>();
    const [submitedEdit, setSubmitedEdit] = useState<boolean>(false);
    const [error, setError] = useState<ErrorStructure>();
    const [loading, setLoading] = useState<boolean>(false);
    const [inviteHash, setInviteHash] = useState<string>("");
    const [logs, setLogs] = useState<AuditLogStructure>();

    const getAuditLogs = async () => {
        const { data } = await api.getAuditLogs(teamID);

        return setLogs(data);
    };

    const onSubmitEdit: SubmitHandler<Team> = async (data: Team): Promise<void> => {
        setSubmitedEdit(true);

        const { avatar_url, description, name, invite_code } = data;

        const formData: Team = {
            avatar_url,
            description,
            name,
            invite_code
        };

        console.log(formData);

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

            setError({
                show: false
            });
        } catch (error: any) {
            setSubmitedEdit(false);
            setError({
                show: true,
                title: "Erro ao tentar criar um time",
                //@ts-ignore
                message: ApiErrors[error.response.data.code]
            });
        }

        setSubmitedEdit(false);
    };

    const getUserTeams = async (): Promise<void> => {
        const { data: { invite_code }, data } = await api.getTeam(teamID);

        setInviteHash(invite_code);
        setTeam(data);
    };

    const updateInviteHash = async (): Promise<void> => {
        if (team) {
            setLoading(true);

            const req = await api.patchTeam(teamID, {
                avatar_url: team.avatar_url,
                description: team.description,
                name: team.name,
                invite_code: Math.random().toString(22).slice(2, 8)
            });

            setInviteHash(req.data.invite_code);

            setLoading(false);
        }
    };

    useEffect(() => {
        getUserTeams();
        getAuditLogs();
    }, []);

    return (
        <main className="max-w-[1500px] flex justify-center">
            <section className="w-screen flex flex-row p-5 text-white items-start xl:items-center justify-start gap-10 xl:flex-col h-full">
                <DashboardUser color={color} user={user as UserStructure} />
                <div className="flex items-center justify-start h-full w-full flex-col">
                    <h1 className="text-[33px] text-center">Bem vindo a dashboard, <strong>{user?.username}</strong></h1>
                    <hr className="w-full my-3" />
                    <div className="w-full">
                    </div>
                    <section className={`w-full bg-neutral-900 mt-2 border-2 flex-row ${borderColor[color]} rounded-lg p-4 items-center justify-center`}>
                        <Tabs position="relative" variant="unstyled">
                            <TabList>
                                <Tab>Time</Tab>
                                <Tab>Membros</Tab>
                                <Tab>Bot</Tab>
                                <Tab>Audit logs</Tab>
                            </TabList>
                            <TabIndicator className={`mt[-1.5px] h-[2px] ${borderColor[color]} border-2 rounded-lg`} />
                            <TabPanels>
                                <TabPanel>
                                    {team ? (
                                        <>
                                            <div className="flex flex-col w-full py-3">
                                                <div className="text-white xl:text-[26px] text-[26px] font-bold m-2 xl:m-0 xl:mt-2 w-full flex items-center justify-center">
                                                    <span>Link de convite</span>
                                                </div>
                                                <div className="flex flex-row xl:flex-col bg-neutral-800 w-full h-full rounded-lg items-center">
                                                    <input disabled value={`${new URL(location.href).origin}/team/${teamID}/invite/${inviteHash}`} placeholder="Atualizar link de invite" className="flex-grow p-2 w-full bg-transparent xl:break-words" />
                                                    <div className="flex flex-row xl:w-full">
                                                        <Button disabled={loading} clas="rounded-r-none" action={async () => await navigator.clipboard.writeText(`${new URL(location.href).origin}/team/${teamID}/invite/${inviteHash}`)}>
                                                            <iconMD.MdOutlineContentCopy fill="#fff" size={26} />
                                                        </Button>
                                                        <Button action={updateInviteHash} clas="rounded-l-none xl:flex xl:flex-grow">{loading ? <icon.AiOutlineLoading3Quarters fill="#fff" size={26} className="animate-spin" /> : "Atualizar"}</Button>
                                                    </div>
                                                </div>
                                            </div>
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
                                                    {submitedEdit && <icon.AiOutlineLoading3Quarters fill="#fff" size={30} className="animate-spin" />}
                                                </div>
                                            </form>
                                        </>
                                    ) : (
                                        <div>Carregando...</div>
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    <ManageMembers updateAuditLogs={getAuditLogs} color={color} />
                                </TabPanel>
                                <TabPanel>
                                    <div className="w-full flex flex-col gap-3 mt-4 items-center justify-center">
                                        <span className="text-white xl:text-[28px] text-2xl xl:mr-0 mr-2 font-bold xl:text-center">Adicionar bot no time</span>
                                        <Button link to={`/team/${team?.id}/addbot`} clas="flex justify-center items-center">Adicionar</Button>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <AuditLogs logs={logs} teamID={teamID} />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </section>
                </div>
            </section>
            {error?.show && <PopUpError setShow={setError} show={error} />}
        </main>
    )
};