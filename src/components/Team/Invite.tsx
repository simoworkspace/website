import { FC, useState, useContext, useEffect } from "react";
import { Link, Params, useParams } from "react-router-dom";
import api from "../../utils/api";
import { Button } from "../Mixed/Button";
import { UserContext } from "../../contexts/UserContext";
import { ErrorStructure, Team } from "../../types";
import { UserLoading } from "../User/UserLoading";
import simo from "../../assets/images/simo.png";
import { borderColor } from "../../utils/theme/border";
import { ThemeContext } from "../../contexts/ThemeContext";
import * as icon from "react-icons/bi";
import { ApiErrors } from "../../utils/api/errors";
import { PopUpError } from "../Mixed/Error";

const TeamPermissions = {
    Administrator: 0,
    ReadOnly: 1,
    Owner: 2
}

export const InviteComponent: FC = () => {
    const params: Params = useParams<string>();
    const { teamId, hash } = params as { teamId: string; hash: string; };

    const [loading, setLoading] = useState<boolean>(false);
    const [team, setTeam] = useState<Team | null>(null);
    const [error, setError] = useState<ErrorStructure>();

    const { user } = useContext(UserContext);
    const { color } = useContext(ThemeContext);

    const getTeam = async (): Promise<void> => {
        const { data } = await api.getTeam(teamId);

        setTeam(data);
    };

    const joinTeam = async (): Promise<void> => {
        setLoading(true);

        if (user) {
            try {
                await api.joinTeam(teamId, hash);

                window.location.href = "/dashboard/settings";
            } catch (error: any) {
                setLoading(false);
                setError({
                    show: true,
                    title: "Erro ao tentar entrar em um time",
                    message: ApiErrors[error.response.data.code]
                });
            }
        }
    };

    useEffect(() => {
        getTeam();
    }, [])

    return (
        team ? (
            <main className="max-w-[1500px] flex justify-start xl:justify-center xl:items-center">
                <section className="w-screen flex flex-row p-5 text-white items-start justify-start xl:items-center xl:justify-center gap-10 xl:flex-col">
                    {team.invite_code === hash ? (
                        <>
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
                                            <Link key={index} to={`/user/${member.id}`}>
                                                {member.permission === TeamPermissions.Owner && <icon.BiSolidCrown fill="#FFD700" className="absolute ml-7 rotate-45" />}
                                                <img
                                                    className="rounded-full w-10"
                                                    src={`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}.png?size=2048`}
                                                />
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-start w-full flex-col gap-2">
                                <h1 className="text-[33px]">Time <strong>{team.name}</strong></h1>
                                {team?.description && <span>{team.description}</span>}
                                <hr className="w-full my-3" />
                                <div className={`w-full flex justify-center flex-col items-center ${borderColor[color]} border-2 bg-neutral-900 p-10 rounded-lg`}>
                                    <div className="flex flex-col gap-4 h-full">
                                        <span className="text-2xl xl:text-center">Você foi convidado para entrar no time <strong>{team.name}</strong></span>
                                        <Button action={joinTeam} disabled={loading}>Entrar no time</Button>
                                        <Button link to="/" clas="justify-center flex" >Voltar</Button>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                    <div className="flex items-center justify-center w-full">
                        <span className="text-center text-xl m-4">Link de convite inválido.</span>
                    </div>
                    )}
                </section>
                {error?.show && <PopUpError setShow={setError} show={error} />}
            </main>
        ) : (
            <UserLoading />
        )
    )
};