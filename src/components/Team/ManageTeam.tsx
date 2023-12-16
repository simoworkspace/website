import { FC, useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { AuditLogStructure, ErrorStructure, Team } from "../../types";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { borderColor } from "../../utils/theme/border";
import * as icon from "react-icons/ai";
import api from "../../utils/api";
import * as iconBI from "react-icons/bi";
import { Link, Params, useParams } from "react-router-dom";
import { PopUpError } from "../Mixed/Error";
import { ApiErrors } from "../../utils/api/errors";
import { ManageMembers } from "./ManageMembers";
import { Button } from "../Mixed/Button";
import { TeamAddbot } from "./Addbot";
import { AuditLogs } from "./AuditLogs";
import { scrollBar } from "../../utils/theme/scrollBar";
import { TeamManageBots } from "./ManageBots";
import simo from "../../assets/images/simo.png";
import { EditTeam } from "./EditTeam";
import Translate from "translate";
import { CopyButton } from "../Mixed/Copy";

interface UpdatedTeamData {
    avatar_url: string;
    description: string | null;
    name: string;
}

export const ManageTeamComponent: FC = () => {
    const { color } = useContext(ThemeContext);
    const params: Params = useParams<string>();
    const teamID: string = params.teamId as string;
    const { user } = useContext(UserContext);
    const [team, setTeam] = useState<Team | undefined>();
    const [error, setError] = useState<ErrorStructure>();
    const [logs, setLogs] = useState<AuditLogStructure>();

    const [editActions, setEditActions] = useState<{
        changesLoading?: boolean;
        changesMade?: boolean;
        description: string | null;
        avatar_url: string;
        name: string;
    }>({
        avatar_url: team?.avatar_url || "",
        description: team?.description || "",
        name: team?.name || "",
        changesLoading: false,
        changesMade: false
    });

    const updateTeam = async () => {
        try {
            setEditActions({ changesLoading: true, changesMade: true, avatar_url: editActions.avatar_url, description: editActions.description, name: editActions.name });

            const updatedTeamData: UpdatedTeamData = {
                avatar_url: editActions.avatar_url,
                description: editActions.description,
                name: editActions.name
            };

            for (let i in updatedTeamData) {
                if (team) {
                    if (updatedTeamData[i as keyof UpdatedTeamData] === team[i as keyof UpdatedTeamData]) {
                        delete updatedTeamData[i as keyof UpdatedTeamData];
                    }
                }
            }

            await api.patchTeam(teamID, updatedTeamData);
            await getAuditLogs();

            setEditActions({ changesMade: false, changesLoading: false, avatar_url: editActions.avatar_url, description: editActions.description, name: editActions.name });
        } catch (error: any) {
            setError({
                show: true,
                title: "Erro ao tentar adicionar um bot",
                message: ApiErrors[error.response.data.errors] || (await Translate(error.response.data.errors[0], { from: "en", to: "pt" }))
            });

            if (team) setEditActions({ changesLoading: false, changesMade: false, avatar_url: team.avatar_url, description: team.description, name: team.name });
        }
    };

    const getTeam = async () => {
        try {
            const { data } = await api.getTeam(teamID);

            setEditActions({ description: data.description, avatar_url: data.avatar_url, name: data.name });
            return setTeam(data);
        } catch (error) {
            console.error(error);
            window.location.href = "/";
        }
    };

    const getAuditLogs = async () => {
        const { data } = await api.getAuditLogs(teamID);

        return setLogs(data);
    };

    useEffect(() => {
        getTeam();
        getAuditLogs();
    }, []);

    return (
        <main className="max-w-[1500px] flex justify-center">
            <section className="w-screen flex flex-row p-5 text-white items-start xl:items-center justify-start gap-10 xl:flex-col h-full">
                {team ? (
                    <div className={`${borderColor[color]} border-2 w-[300px] p-5 xl:w-[90vw] rounded-lg bg-neutral-900 flex items-center justify-center flex-col`}>
                        <div>
                            <img onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = simo;
                            }}
                                className="rounded-full w-32 h-32 object-center" src={editActions.avatar_url} />
                        </div>
                        <hr className="w-[80%] my-6" />
                        <div className="flex flex-col gap-2 text-center justify-center">
                            <div className="flex gap-2 items-center justify-center">
                                <strong className="max-w-[200px]">{editActions.name}</strong>
                                <CopyButton name="ID" text={teamID} key={Math.random()} />
                            </div>
                            <div className={editActions.description?.includes(" ") ? "break-words" : "break-all"}>
                                <span className="max-w-[250px]">{editActions.description}</span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-3 py-3 px-5">
                            <span className="text-lg font-bold text-left">Membros</span>
                            <div className="flex flex-wrap w-full gap-2">
                                {team.members?.map((member, index) => (
                                    <Link className="relative" key={index} to={`/user/${member.id}`}>
                                        {member.permission === 2 && <iconBI.BiSolidCrown fill="#FFD700" className="absolute ml-7 rotate-45" />}
                                        <img
                                            onError={async ({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = (await import("../../assets/images/simo.png")).default;
                                            }}
                                            className="rounded-full w-10"
                                            src={`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`}
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>Carregando...</div>
                )}
                <div className="flex items-center justify-start h-full w-full flex-col">
                    <h1 className="text-[33px] text-center">Bem vindo a dashboard, <strong>{user?.username}</strong></h1>
                    <hr className="w-full my-3" />
                    <div className="w-full">
                    </div>
                    <section className={`w-full bg-neutral-900 mt-2 border-2 flex-row ${borderColor[color]} rounded-lg p-4 items-center justify-center`}>
                        <Tabs position="relative" variant="unstyled">
                            <TabList className={`overflow-auto ${scrollBar[color]}`}>
                                <Tab className="xl:focus:bg-neutral-800 rounded-lg">Time</Tab>
                                <Tab className="xl:focus:bg-neutral-800 rounded-lg">Membros</Tab>
                                <Tab className="min-w-[140px] xl:focus:bg-neutral-800 rounded-lg">Adicionar bot</Tab>
                                <Tab className="min-w-[140px] xl:focus:bg-neutral-800 rounded-lg">Gerenciar bots</Tab>
                                <Tab className="min-w-[130px] xl:focus:bg-neutral-800 rounded-lg">Audit log</Tab>
                            </TabList>
                            <TabIndicator className={`mt[-1.5px] h-[2px] ${borderColor[color]} border-2 rounded-lgx xl:invisible`} />
                            <TabPanels>
                                <TabPanel>
                                    {team ? (
                                        <EditTeam editActions={editActions} setEditActions={setEditActions} teamID={teamID} team={team} />
                                    ) : (
                                        <span>Carregando...</span>
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {team ? (
                                        <ManageMembers updateAuditLogs={getAuditLogs} />
                                    ) : (
                                        <div>Carregando...</div>
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {team ? (
                                        <TeamAddbot team={team} />
                                    ) : (
                                        <div>Carregando...</div>
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {team ? (
                                        <TeamManageBots team={team} />
                                    ) : (
                                        <div>Carregando...</div>
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {logs ? (
                                        <AuditLogs logs={logs} />
                                    ) : (
                                        <div>Carregando...</div>
                                    )}
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </section>
                </div>
            </section>
            {error?.show ? <PopUpError setShow={setError} show={error} /> : null}
            {editActions.changesMade && team ? (
                <div className={`${editActions.changesMade ? "bounceIn" : "invisible"} w-[90vw] bottom-5 origin-center absolute xl:z-10 xl:fixed xl:bottom-10 xl:w-[95vw] bg-neutral-800 ${borderColor[color]} border-2 rounded-lg duration-200`}>
                    <div className="flex p-2 text-white w-full items-center">
                        <span className="flex flex-grow">Você tem alterações para serem salvas</span>
                        <div className="flex gap-2 items-center">
                            <button onClick={() => setEditActions({ changesMade: false, avatar_url: team.avatar_url, description: team.description, name: team.name })} className="text-neutral-400">Desfazer</button>
                            <Button disabled={editActions.changesLoading} clas="disabled:opacity-50" action={updateTeam}>
                                {!editActions.changesLoading ? <span>Salvar alterações</span> : <icon.AiOutlineLoading3Quarters fill="#fff" size={22} className="animate-spin" />}
                            </Button>
                        </div>
                    </div>
                </div>
            ) : null}
        </main>
    )
};