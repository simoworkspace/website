import { FC, useState, useEffect, useContext } from "react";
import { Team, TeamMember, Theme } from "../../types";
import { borderColor } from "../../utils/theme/border";
import * as iconMD from "react-icons/md";
import * as iconBI from "react-icons/bi";
import * as iconBS from "react-icons/bs";
import { Button } from "../Mixed/Button";
import api from "../../utils/api";
import { Params, useParams } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";

const TeamPermissions = {
    Administrator: 0,
    ReadOnly: 1,
    Owner: 2
}

export const ManageMembers: FC<{ color: Theme }> = ({ color }) => {
    const [actions, setActions] = useState<{
        menu?: boolean;
        loading?: boolean;
    }>({ menu: false, loading: false });
    const params: Params = useParams<string>();
    const teamID: string = params.teamId as string;

    const [team, setTeam] = useState<Team | null>(null);
    const [member, setMember] = useState<TeamMember | null>(null);
    const { menu, loading } = actions;
    const { user } = useContext(UserContext);

    const getTeam = async (): Promise<void> => {
        const { data } = await api.getTeam(teamID);
        
        setMember(data.members?.find((teamMember) => teamMember.id === member?.id) as TeamMember);
        setTeam(data);
    }

    const kickMember = async (): Promise<void> => {
        if (!team) return;

        setActions({ loading: true });

        const members = team?.members?.filter((teamMember) => teamMember.id !== member?.id);

        await api.patchTeam(team?.id as string, {
            avatar_url: team.avatar_url,
            description: team.description,
            name: team.name,
            invite_hash: team.invite_hash,
            members
        });

        await getTeam();

        setActions({ loading: false });
    };

    const demoteMember = async (): Promise<void> => {
        if (!team || !member || !team.members) return;

        setActions({ loading: true });

        const members = team.members.filter((teamMember) => teamMember.id !== member.id);

        await api.patchTeam(team?.id as string, {
            avatar_url: team.avatar_url,
            description: team.description,
            name: team.name,
            invite_hash: team.invite_hash,
            members: [
                ...members,
                {
                    id: member.id,
                    username: member.username,
                    avatar: member.avatar,
                    permission: TeamPermissions.ReadOnly
                }]
        });

        await getTeam();

        setActions({ loading: false });
    };

    const promoveMember = async (): Promise<void> => {
        if (!team || !member || !team.members) return;

        setActions({ loading: true });

        const members = team.members.filter((teamMember) => teamMember.id !== member.id);

        await api.patchTeam(team?.id as string, {
            avatar_url: team.avatar_url,
            description: team.description,
            name: team.name,
            invite_hash: team.invite_hash,
            members: [
                ...members,
                {
                    id: member.id,
                    username: member.username,
                    avatar: member.avatar,
                    permission: TeamPermissions.Administrator
                }]
        });

        await getTeam();

        setActions({ loading: false });
    };

    const transferPosse = async (): Promise<void> => {
        if (!team || !member || !team.members) return;

        setActions({ loading: true });

        await getTeam();

        setActions({ loading: false });
    };

    useEffect(() => {
        getTeam();
    }, []);

    const youinTeam = team?.members?.find((member) => member.id === user?.id);

    return (
        <section className="flex w-full items-center justify-center flex-col gap-2">
            <div className="flex flex-col w-full">
                <div>
                    <button onClick={() => {
                        setActions({ menu: !actions.menu });
                        setMember(null);
                    }} className={`bg-neutral-900 p-3 items-center justify-center flex flex-row ${borderColor[color]} rounded-lg border-2 w-full`}>
                        {member ? (
                            <>
                                <div className="flex items-center justify-start gap-2 w-full flex-grow">
                                    <img className="rounded-full w-12" src={`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`} />
                                    <span className="text-lg font-bold">{member.username}</span>
                                    <span className="text-neutral-500 xl:invisible">({member.id})</span>
                                </div>
                                <iconMD.MdOutlineKeyboardArrowDown className={`transition-all duration-300 ${menu ? "rotate-180" : "rotate-0"}`} size={25} />
                            </>
                        ) : (
                            <>
                                <span className="flex flex-grow">Clique aqui para selecionar um membro para gerenciar.</span>
                                <iconMD.MdOutlineKeyboardArrowDown className={`transition-all duration-300 ${menu ? "rotate-180" : "rotate-0"}`} size={25} />
                            </>
                        )}
                    </button>
                </div>
                <div className="relative w-full">
                    <div className={`${menu ? "opacity-100 visible" : "opacity-0 invisible"} transition-all duration-300 w-full flex items-center justify-center`}>
                        {menu && (
                            <div className={`bg-neutral-900 rounded-b-lg overflow-auto max-h-[300px] w-[95%] ${borderColor[color]} border-2 border-t-0 flex items-center flex-col gap-2 p-3`}>
                                {team?.members?.map((member, index) => (
                                    <button key={index} onClick={() => {
                                        setMember(member);
                                        setActions({ menu: false });
                                    }} className="flex xl:flex-col items-center justify-start w-full gap-3 p-3 transition-colors duration-300 hover:bg-neutral-800 rounded-lg">
                                        <img className="rounded-full w-20" src={`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`} />
                                        <span className="text-xl">{member.username}</span>
                                        <span className="text-[#797979] items-center flex text-[13px] justify-center">
                                            ( {member.id} )
                                        </span>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {member && (
                <div className="p-3 w-full bg-neutral-800 rounded-lg">
                    <div className="flex flex-row xl xl:flex-col xl:justify-center xl:w-full">
                        <div className="flex items-center xl:flex-col justify-start gap-3 w-full flex-grow">
                            <img className="rounded-full w-20" src={`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png`} />
                            <div className="flex flex-col gap-1 xl:text-center">
                                <span className="text-lg font-bold">{member.username}</span>
                                <span>Cargo <strong>{member?.permission === 1 ? "Membro" : member.permission === TeamPermissions.Owner ? "Dono" : "Administrador"}</strong></span>
                            </div>
                        </div>
                        <div className="flex flex-row xl:flex-col xl:justify-center xl:w-full gap-2 w-full p-2 justify-end">
                            {youinTeam?.id !== member.id && (
                                ((youinTeam?.permission === TeamPermissions.Administrator || youinTeam?.permission === TeamPermissions.Owner) && member.permission !== TeamPermissions.Owner && (member.permission && youinTeam.permission === TeamPermissions.Administrator || TeamPermissions.Owner)) && (
                                    <>
                                        <Button action={kickMember} disabled={loading} clas="flex items-center flex-row gap-3 xl:w-full xl:flex-row xl:justify-end"><span className="xl:flex xl:flex-grow xl:justify-center">Expulsar</span><iconBS.BsHammer /></Button>
                                        {member?.permission === TeamPermissions.ReadOnly ? (
                                            <Button action={promoveMember} disabled={loading} clas="flex items-center flex-row gap-3 xl:w-full xl:flex-row xl:justify-end"><span className="xl:flex xl:flex-grow xl:justify-center">Promover</span><iconBS.BsArrowUp /></Button>
                                        ) : (
                                            <Button action={demoteMember} disabled={loading} clas="flex items-center flex-row gap-3 xl:w-full xl:flex-row xl:justify-end"><span  className="xl:flex xl:flex-grow xl:justify-center">Rebaixar</span><iconBS.BsArrowDown /></Button>
                                        )}
                                        {youinTeam?.id !== member.id && youinTeam?.permission === TeamPermissions.Owner && <Button action={transferPosse} disabled={loading} clas="flex items-center flex-row gap-3 xl:w-full xl:flex-row xl:justify-end"><span className="xl:flex xl:flex-grow xl:justify-center">Transferir posse</span><iconBI.BiSolidCrown /></Button>}
                                    </>
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
};