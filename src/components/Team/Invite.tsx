import { FC, useState, useContext, useEffect } from "react";
import { Params, useParams } from "react-router-dom";
import api from "../../utils/api";
import { Button } from "../Mixed/Button";
import { UserContext } from "../../contexts/UserContext";
import { Team } from "../../types";

export const InviteComponent: FC = () => {
    const params: Params = useParams<string>();
    const { teamId, hash } = params as { teamId: string; hash: string; };

    const [loading, setLoading] = useState<boolean>(false);
    const [team, setTeam] = useState<Team | null>(null);

    const { user } = useContext(UserContext);

    const getTeam = async (): Promise<void> => {
        const { data } = await api.getTeam(teamId);

        setTeam(data);
    };

    const joinTeam = async (): Promise<void> => {
        setLoading(true);

        if (team?.members && user) {

            await api.patchTeam(teamId, {
                members: [
                    ...team.members,
                    {
                        id: user.id,
                        username: user.username,
                        avatar: user.avatar,
                        permission: 1
                    }
                ],
                avatar_url: team.avatar_url, description: team.description, invite_hash: team.invite_hash, name: team.name
            });

            setLoading(false);

            window.location.href = `${new URL(location.href).origin}/team/${teamId}`; 
        }
    };

    useEffect(() => {
        getTeam();
    }, [])

    return (
        <section className="w-screen max-w-[1500px] flex justify-center">
            <div>você foi convidado para</div>
            <Button action={joinTeam}>entrar no time</Button>
        </section>
    )
};