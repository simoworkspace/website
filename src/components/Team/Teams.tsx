import { FC } from "react";
import { Team } from "../../types";
import { Button } from "../Mixed/Button";
import { Link } from "react-router-dom";
import * as icon from "react-icons/bs";

export const Teams: FC<{
    teams: Team[] | undefined
}> = ({ teams }) => {
    return (
        <div className="flex flex-col gap-2">
            <Button disabled={teams?.length === 0} link to="/teams/create" clas="disabled:opacity-50 flex items-center justify-center gap-2 mt-2 w-[190px]"><icon.BsPlusLg size={22} />Criar time</Button>
            <div className="flex flex-wrap gap-3">
                {teams ? teams.map((team) => (
                    <Link to={`/team/${team.id}`} className="bg-neutral-800 p-3 rounded-lg duration-300 transition-colors hover:bg-neutral-700">
                        <div className="flex flex-row gap-2 px-2 items-center justify-center">
                            <img className="w-24 rounded-full" src={team.avatar_url} />
                            <div className="flex flex-col justify-start items-start">
                                <span className="text-lg font-bold">{team.name}</span>
                                <span>{team.members?.length === 1 ? `${team.members.length} Membro` : `${team.members?.length} Membros`}</span>
                            </div>
                        </div>
                    </Link>
                )
                ) : Array(2).fill(
                    <div className="bg-neutral-800 flex gap-3 flex-wrap p-3 rounded-lg duration-300 h-32 w-[282px]">

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