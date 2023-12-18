import { FC, useState, useEffect, useContext } from "react";
import { ErrorStructure, Team, TeamMember, Theme } from "../../types";
import { borderColor } from "../../utils/theme/border";
import * as iconMD from "react-icons/md";
import * as iconBI from "react-icons/bi";
import * as iconBS from "react-icons/bs";
import { Button } from "../Mixed/Button";
import api from "../../utils/api";
import { Params, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { ApiErrors } from "../../utils/api/errors";
import { PopUpError } from "../Mixed/Error";
import { scrollBar } from "../../utils/theme/scrollBar";
import Translate from "translate";
import { ThemeContext } from "../../contexts/ThemeContext";

const TeamPermissions = {
    Administrator: 0,
    ReadOnly: 1,
    Owner: 2
}

export const ManageMembers: FC<{ updateAuditLogs: () => Promise<void> }> = ({ updateAuditLogs }) => {
    const { color } = useContext(ThemeContext);
    
    const [actions, setActions] = useState<{
        menu?: boolean;
        loading?: boolean;
    }>({ menu: true, loading: false });
    const params: Params = useParams<string>();
    const teamID: string = params.teamId as string;

    const [error, setError] = useState<ErrorStructure>();
    const [team, setTeam] = useState<Team | null>(null);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const { menu, loading } = actions;
    const { user } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const getTeam = async (): Promise<void> => {
        const { data } = await api.getTeam(teamID);

        setSelectedMember(data.members?.find((teamMember) => teamMember.id === selectedMember?.id) as TeamMember);
        setTeam(data);
    }

    const kickMember = async (): Promise<void> => {
        if (!team) return;

        setActions({ loading: true });

        try {
            await api.removeMember(team?.id as string, selectedMember?.id as string);
        } catch (error: any) {
            setActions({ loading: false });
            setError({
                show: true,
                title: "Erro ao tentar remover membro",
                message: ApiErrors[error.response.data.code] || (await Translate(error.response.data.errors[0], { from: "en", to: "pt" }))
            });
        }

        await getTeam();
        await updateAuditLogs();

        setActions({ loading: false });
    };

    const demoteMember = async (): Promise<void> => {
        setActions({ loading: true });

        try {
            await api.patchMember(team?.id as string, selectedMember?.id as string, {
                permission: 1
            });
        } catch (error: any) {
            setActions({ loading: false });
            setError({
                show: true,
                title: "Erro ao tentar demotar membro",
                message: ApiErrors[error.response.data.code] || (await Translate(error.response.data.errors[0], { from: "en", to: "pt" }))
            });
        }

        await getTeam();
        await updateAuditLogs();

        setActions({ loading: false });
    };

    const promoveMember = async (): Promise<void> => {
        setActions({ loading: true });

        try {
            await api.patchMember(team?.id as string, selectedMember?.id as string, {
                permission: 0
            });
        } catch (error: any) {
            setActions({ loading: false });
            setError({
                show: true,
                title: "Erro ao tentar promover membro",
                message: ApiErrors[error.response.data.code] || (await Translate(error.response.data.errors[0], { from: "en", to: "pt" }))
            });
        }

        await getTeam();
        await updateAuditLogs();

        setActions({ loading: false });
    };

    const transferPosse = async (): Promise<void> => {
        if (!team || !selectedMember || !team.members) return;

        setActions({ loading: true });

        try {
            await api.transferOnwer(selectedMember.id);
        } catch (error: any) {
            setActions({ loading: false });
            setError({
                show: true,
                title: "Erro ao tentar transferir posse",
                message: ApiErrors[error.response.data.code] || (await Translate(error.response.data.errors[0], { from: "en", to: "pt" }))
            });
        }

        await getTeam();
        await updateAuditLogs();

        setActions({ loading: false });
    };

    useEffect(() => {
        getTeam();
    }, []);

    const youinTeam = team?.members?.find((member) => member.id === user?._id);

    return (
        <section className="flex w-full items-center justify-center flex-col gap-2">
            <div className="flex flex-col w-full">
                <span className="text-center font-bold text-2xl my-2">Gerenciar membros</span>
                <div className="flex flex-col gap-3 w-full">
                    <span className="text-lg font-bold">Procurar por um membro</span>
                    <form className="w-full xl:w-full xl:h-14 flex flex-row">
                        <div className="w-full">
                            <input
                                placeholder="Digite aqui o nome de algum membro"
                                value={searchQuery}
                                onChange={handleSearchInputChange}
                                className={`bg-transparent disabled:opacity-5 focus:outline-none border-2 rounded-lg p-2 w-full h-14 ${borderColor[color]}`}
                                type="text"
                            />
                        </div>
                    </form>
                </div>
                {selectedMember ? (
                    <div className="p-3 w-full bg-neutral-800 rounded-lg mt-2">
                        <div className="flex flex-row xl xl:flex-col xl:justify-center xl:w-full">
                            <div className="flex items-center xl:flex-col justify-start gap-3 w-full flex-grow">
                                <img onError={async ({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = (await import("../../assets/images/simo.png")).default;
                                }} className="rounded-full w-20" src={`https://cdn.discordapp.com/avatars/${selectedMember.id}/${selectedMember.avatar}.png`} />
                                <div className="flex flex-col gap-1 xl:text-center">
                                    <div className="flex gap-2 items-center xl:flex-col">
                                        <span className="text-lg font-bold">{selectedMember.username}</span>
                                        <span className="text-neutral-500">({selectedMember.id})</span>
                                    </div>
                                    <span>Cargo <strong>{selectedMember?.permission === 1 ? "Membro" : selectedMember.permission === TeamPermissions.Owner ? "Dono" : "Administrador"}</strong></span>
                                </div>
                            </div>
                            <div className="flex flex-row xl:flex-col xl:justify-center xl:w-full gap-2 w-full p-2 justify-end">
                                {youinTeam?.id !== selectedMember.id && (
                                    ((youinTeam?.permission === TeamPermissions.Administrator || youinTeam?.permission === TeamPermissions.Owner) && selectedMember.permission !== TeamPermissions.Owner && (selectedMember.permission && youinTeam.permission === TeamPermissions.Administrator || TeamPermissions.Owner)) && (
                                        <>
                                            <Button action={kickMember} disabled={loading} clas="flex items-center flex-row gap-3 xl:w-full xl:flex-row xl:justify-end"><span className="xl:flex xl:flex-grow xl:justify-center">Expulsar</span><iconBS.BsHammer /></Button>
                                            {selectedMember?.permission === TeamPermissions.ReadOnly ? (
                                                <Button action={promoveMember} disabled={loading} clas="flex items-center flex-row gap-3 xl:w-full xl:flex-row xl:justify-end"><span className="xl:flex xl:flex-grow xl:justify-center">Promover</span><iconBS.BsArrowUp /></Button>
                                            ) : (
                                                <Button action={demoteMember} disabled={loading} clas="flex items-center flex-row gap-3 xl:w-full xl:flex-row xl:justify-end"><span className="xl:flex xl:flex-grow xl:justify-center">Rebaixar</span><iconBS.BsArrowDown /></Button>
                                            )}
                                            {youinTeam?.id !== selectedMember.id && youinTeam?.permission === TeamPermissions.Owner && <Button action={transferPosse} disabled={loading} clas="flex items-center flex-row gap-3 xl:w-full xl:flex-row xl:justify-end"><span className="xl:flex xl:flex-grow xl:justify-center">Transferir posse</span><iconBI.BiSolidCrown /></Button>}
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                        {error?.show && <PopUpError setShow={setError} show={error} />}
                    </div>
                ) : null}
                {team?.members ? (
                    <div className="flex flex-col gap-2 mt-2">
                        {team.members.filter((member) => member.username.toLowerCase().includes(searchQuery.toLowerCase()) || member.id.includes(searchQuery)).filter((member) => member.id !== selectedMember?.id).map((member) => (
                            <button onClick={() => setSelectedMember(member)} className={`${member.id === selectedMember?.id ? "bg-neutral-700" : "bg-neutral-800"} flex transition duration-300 hover:bg-neutral-700 items-center p-3 rounded-lg gap-2`} key={member.id}>
                                <img onError={async ({ currentTarget }) => {
                                    currentTarget.onerror = null;
                                    currentTarget.src = (await import("../../assets/images/simo.png")).default;
                                }} className="rounded-full w-12 h-12" src={`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`} />
                                <div className="flex gap-3 flex-wrap">
                                    <span className="text-xl">{member.username}</span>
                                    <span className="text-[#797979] items-center flex text-[13px] justify-center">
                                        ( {member?.permission === 1 ? "Membro" : member.permission === TeamPermissions.Owner ? "Dono" : "Administrador"} )
                                    </span>
                                </div>
                            </button>
                        ))}

                    </div>
                ) : (
                    <div>Carregando...</div>
                )}
            </div>
        </section >
    )
};