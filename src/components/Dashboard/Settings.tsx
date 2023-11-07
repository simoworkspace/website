import { FC, useContext, useState, useEffect } from "react";
import { DashboardUser } from "./User";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Team, UserStructure } from "../../types";
import { borderColor } from "../../utils/theme/border";
import { Button } from "../Mixed/Button";
import * as icon from "react-icons/bs";
import * as iconAI from "react-icons/ai";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { Teams } from "../Team/Teams";

export const Settings: FC = () => {
    const { user } = useContext(UserContext);
    const { color } = useContext(ThemeContext);
    const [bio, setBio] = useState<string>("");
    const [bioPatched, setBioPatched] = useState<boolean>(false);
    const [bioSubmit, setBioSubmit] = useState<boolean>(false);
    const [teams, setTeams] = useState<Team[]>();

    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>): void => setBio(event.target.value);

    const getUserTeams = async (): Promise<void> => {
        const req = await api.getUserTeams();

        setTeams(req.data);
    };

    const patchBio = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        setBioPatched(true);
        await api.patchUser(user?.id as string, { bio });
        setBio(bio);
        setBioPatched(false);
        setBioSubmit(true);
    };

    useEffect(() => {
        getUserTeams();
    }, []);

    return (
        <main className="max-w-[1500px] flex justify-center items-center">
            <section className="w-screen flex flex-row p-5 text-white items-start xl:items-center justify-center gap-10 xl:flex-col">
                <DashboardUser color={color} user={user as UserStructure} />
                <div className="flex h-full w-full flex-col">
                    <h1 className="text-[33px] text-center">Bem vindo a dashboard, <strong>{user?.username}</strong></h1>
                    <hr className="w-full my-3" />
                    <div className={`w-full p-3 h-full flex flex-col gap-3 bg-neutral-900 ${borderColor[color]} border-2 rounded-lg`}>
                        <div className="flex xl:flex-col gap-3 w-full p-3">
                            <div className="flex flex-col items-start justify-center flex-grow h-14">
                                <h1 className="font-bold text-lg">Biografia</h1>
                                <span>Fale mais sobre você, digite ao lado uma breve descrição sobre você</span>
                            </div>
                            <form onSubmit={patchBio} className="w-[50%] xl:w-full xl:h-14 flex flex-row">
                                <div className="w-full">
                                    <input placeholder="Digite sua biografia aqui." maxLength={200} value={bio} required disabled={bioPatched} onChange={handleBioChange} className={`bg-transparent disabled:opacity-50 rounded-r-none focus:outline-none border-2 rounded-lg p-2 w-full h-14 ${borderColor[color]}`} type="text" />
                                    {bioSubmit && bio && <span>Bio atualizada com sucesso! <Link className="text-blue-500 hover:underline" to={`/user/${user?.id}`}>Ver perfil</Link></span>}
                                </div>
                                <Button type="submit" disabled={bioPatched} clas="w-14 h-14 flex items-center justify-center rounded-l-none diabled:opacity-50">{bioPatched ? <iconAI.AiOutlineLoading3Quarters size={22} className="animate-spin" /> : <icon.BsCheck size={22} />}</Button>
                            </form>
                        </div>
                        <div className="p-3">
                            <span className="text-lg font-bold">Seus times</span>
                            <Teams teams={teams}/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
};
