import { FC, useEffect, useState, ChangeEvent } from "react";
import { AuditLogStructure, Team } from "../../types";
import api from "../../utils/api";
import * as iconAI from "react-icons/ai";
import * as iconMD from "react-icons/md";
import { Button } from "../Mixed/Button";
import { TeamInput } from "./Input";

const TeamPermissions = {
    Administrator: 0,
    ReadOnly: 1,
    Owner: 2
}

interface EditActionsProps {
    changesLoading?: boolean;
    changesMade?: boolean;
    description: string | null;
    avatar_url: string;
    name: string;
}
export const EditTeam: FC<{
    teamID: string, team?: Team, editActions: EditActionsProps, setEditActions: (value: EditActionsProps) => void
}> = ({ teamID, team, editActions, setEditActions }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [inviteHash, setInviteHash] = useState<string>("");
    const [logs, setLogs] = useState<AuditLogStructure>();

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => setEditActions({
        description: event.target.value,
        name: editActions.name,
        avatar_url: editActions.avatar_url,
        changesMade: true
    });

    const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => setEditActions({
        description: editActions.description,
        name: editActions.name,
        avatar_url: event.target.value,
        changesMade: true
    });

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => setEditActions({
        description: editActions.description,
        name: event.target.value,
        avatar_url: editActions.avatar_url,
        changesMade: true
    });

    const getTeamData = async () => {
        const { data: { invite_code }, data } = await api.getTeam(teamID);

        await getAuditLogs();
        setInviteHash(invite_code);
    };

    const getAuditLogs = async () => {
        const { data } = await api.getAuditLogs(teamID);

        return setLogs(data);
    };

    useEffect(() => {
        getTeamData();
        getAuditLogs();
    }, []);

    return team ? (
        <>
            <main>
                <div className="text-white xl:text-[26px] text-[40px] m-2 xl:m-0 xl:mt-2 w-full flex items-center justify-center">
                    <span className="text-white flex flex-row text-[26px] mx-10 my-3">
                        <h1 className="text-[#ffffff] xl:text-[28px] xl:mr-0 mr-2 font-bold xl:text-center max-w-4xl">Editar time <strong>{editActions.name}</strong></h1>
                    </span>
                </div>
                <div className="flex flex-col gap-3 w-full">
                    <TeamInput
                        title="Nome do time"
                        description="Nome que seu time irá receber"
                        placeholder="Digite aqui o nome do seu time"
                        maxLength={80}
                        value={editActions.name}
                        onChange={handleNameChange}
                        type="text"
                    />
                    <TeamInput
                        title="Descrição do time"
                        description="Breve descrição sobre seu time"
                        placeholder="Digite aqui a descrição do seu time"
                        maxLength={80}
                        value={editActions.description || ""}
                        onChange={handleDescriptionChange}
                        type="text"
                    />
                    <TeamInput
                        title="Avatar do time"
                        description="URL do avatar do seu time"
                        placeholder="Coloque aqui o avatar URL do seu time"
                        value={editActions.avatar_url}
                        onChange={handleAvatarChange}
                        type="url"
                    />
                </div>
                <div className="flex flex-col w-full py-3">
                    <div className="text-white xl:text-[26px] text-[26px] font-bold m-2 xl:m-0 xl:mt-2 w-full flex items-center justify-center">
                        <span>Link de convite</span>
                    </div>
                    <div className="flex flex-row xl:flex-col bg-neutral-800 w-full h-full rounded-lg items-center">
                        <input disabled value={`${new URL(location.href).origin}/team/${team.id}/invite/${inviteHash}`} placeholder="Atualizar link de invite" className="flex-grow p-2 w-full bg-transparent xl:break-words" />
                        <div className="flex flex-row xl:w-full">
                            <Button disabled={loading} clas="rounded-r-none" action={async () => {
                                alert("Copiado para área de transferencias.");
                                await navigator.clipboard.writeText(`${new URL(location.href).origin}/team/${team.id}/invite/${inviteHash}`)
                            }}>
                                <iconMD.MdOutlineContentCopy fill="#fff" size={26} />
                            </Button>
                            <Button disabled={loading} action={async () => {
                                setLoading(true);
                                const { data: { invite_code } } = await api.updateTeamInviteCode(teamID);

                                setInviteHash(invite_code);
                                setLoading(false);
                            }} clas="rounded-l-none xl:flex xl:flex-grow">{loading ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={26} className="animate-spin" /> : "Atualizar"}</Button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    ) : (
        <div>carregando time...</div>
    )
};