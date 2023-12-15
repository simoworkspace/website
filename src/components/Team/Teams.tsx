import { FC } from "react";
import { Team } from "../../types";
import { Button } from "../Mixed/Button";
import { Link } from "react-router-dom";
import * as icon from "react-icons/bs";
import simo from "../../assets/images/simo.png";

export const Teams: FC<{
    teams: Team[] | undefined
}> = ({ teams }) => {
    return (
        <div className="flex flex-col gap-2">
            {teams?.length === 0 ? (
                <div className="flex w-full items-center justify-start gap-2 text-lg">Você não tem times, que tal criar um time<Link className="text-blue-500 underline" to="/team/create">clicando aqui?</Link></div>) : (
                <>
                    <Button link to="/team/create" clas="disabled:opacity-50 flex items-center justify-center gap-2 mt-2 w-[190px]"><icon.BsPlusLg size={22} />Criar time</Button>
                    <div className="grid gap-3 grid-cols-2 xl:grid-cols-1">
                        {teams ? teams.map((team, index) => (
                            <Link key={index} to={`/team/${team.id}`} className="bg-neutral-800 p-3 xl:w-full rounded-lg duration-300 transition-colors hover:bg-neutral-700">
                                <div className="flex flex-row gap-4 xl:w-full xl:justify-start px-2 items-center justify-start">
                                    <img className="w-24 rounded-full h-24 object-center" src={team.avatar_url} onError={({ currentTarget }) => {
                                        currentTarget.onerror = null;
                                        currentTarget.src = simo;
                                    }} />
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
                </>
            )
            }
        </div>
    )
};