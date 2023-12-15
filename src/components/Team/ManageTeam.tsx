import { FC, useContext, useEffect, useState } from "react";
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

export const ManageTeamComponent: FC = () => {
    const { color } = useContext(ThemeContext);
    const params: Params = useParams<string>();
    const teamID: string = params.teamId as string;
    const { user } = useContext(UserContext);
    const [team, setTeam] = useState<Team | undefined>();
    const [error, setError] = useState<ErrorStructure>();
    const [logs, setLogs] = useState<AuditLogStructure>();

    const getTeam = async () => {
        const { data } = await api.getTeam(teamID);

        return setTeam(data);
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
                            className="rounded-full w-32 h-32 object-center" src={team.avatar_url} />
                    </div>
                    <hr className="w-[80%] my-6" />
                    <div className="flex flex-col text-center justify-center">
                        <strong>{team.name}</strong>
                        <span className="text-[#797979] items-center flex text-[13px] justify-center">
                            ( {team.id} )
                        </span>
                    </div>
                    <div className="flex w-full flex-col gap-3 py-3 px-5">
                        <span className="text-lg font-bold text-left">Membros</span>
                        <div className="flex flex-wrap w-full gap-2">
                            {team.members?.map((member, index) => (
                                <Link className="relative" key={index} to={`/user/${member.id}`}>
                                    {member.permission === 2 && <iconBI.BiSolidCrown fill="#FFD700" className="absolute ml-7 rotate-45" />}
                                    <img
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
                                    <EditTeam team={team} />
                                </TabPanel>
                                <TabPanel>
                                    <ManageMembers updateAuditLogs={getAuditLogs} color={color} />
                                </TabPanel>
                                <TabPanel>
                                    {team ? (
                                        <TeamAddbot team={team as Team} />
                                    ) : (
                                        <div>Carregando...</div>
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    {team ? (
                                        <TeamManageBots team={team as Team} />
                                    ) : (
                                        <div>Carregando...</div>
                                    )}
                                </TabPanel>
                                <TabPanel>
                                    <AuditLogs logs={logs} />
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