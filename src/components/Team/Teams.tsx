import { FC, useContext, useState } from "react";
import { Team } from "../../types";
import { Button } from "../Mixed/Button";
import { Link } from "react-router-dom";
import * as icon from "react-icons/bs";
import { buttonColor } from "../../utils/theme/button";
import { UserContext } from "../../contexts/UserContext";
import { DeleteTeam } from "./DeleteTeam";

export const Teams: FC<{
    teams: Team[] | undefined
}> = ({ teams }) => {
    const { user } = useContext(UserContext);
    const [deletedTeam, setDeletedTeam] = useState<boolean>(false);

    return (
        <div className="flex flex-col gap-2">
            <Button disabled={teams?.length === 0} link to="/teams/create" clas="disabled:opacity-50 flex items-center justify-center gap-2 mt-2 w-[190px]"><icon.BsPlusLg size={22} />Criar time</Button>
            <div className="flex flex-wrap gap-3">
                {teams ? teams.map((team) => (
                    <div className="bg-neutral-800 rounded-lg duration-300 transition-colors hover:bg-neutral-700">
                        <div className="flex flex-row gap-2 items-center justify-center">
                            <Link to={`/team/${team.id}`} className="p-3 flex flex-row gap-2 items-center justify-center">
                                <img className="w-24 rounded-full" src={team.avatar_url} />
                                <div className="flex flex-col justify-start items-start">
                                    <span className="text-lg font-bold">{team.name}</span>
                                    <span><strong>{team.members?.length}</strong> Membros</span>
                                </div>
                            </Link>
                            {team.members?.find((member) => member.id === user?.id && member.permission === 1) && (
                                <div className="flex flex-col h-28">
                                    <Button clas="h-full"><icon.BsPencil /></Button>
                                    <Button action={() => setDeletedTeam(true)} clas={`${buttonColor["red"]} h-full`}><icon.BsTrash /></Button>
                                </div>
                            )}
                        </div>
                    </div>
                )
                ) : Array(2).fill(
                    <div className="bg-neutral-800 flex gap-3 flex-wrap p-3 rounded-lg duration-300 h-32 w-64">

                        <div className="flex flex-row gap-2 items-center justify-center">
                            <div className="w-24 rounded-full h-24 bg-neutral-900 animate-pulse" ></div>
                            <div className="flex flex-col justify-start items-start gap-3">
                                <div className="w-28 bg-neutral-900 animate-pulse h-5 rounded-full"></div>
                                <div className="w-24 bg-neutral-900 animate-pulse h-4 rounded-full"></div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
};