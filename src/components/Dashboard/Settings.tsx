import { FC, useContext, useState, useEffect } from "react";
import { DashboardUser } from "./User";
import { ThemeContext } from "../../contexts/ThemeContext";
import { DBUser, Team, UserStructure } from "../../types";
import { borderColor } from "../../utils/theme/border";
import { Button } from "../Mixed/Button";
import * as icon from "react-icons/bs";
import * as iconAI from "react-icons/ai";
import api from "../../utils/api";
import { Link } from "react-router-dom";
import { Teams } from "../Team/Teams";
import { UserContext } from "../../contexts/UserContext";
import { UserLoading } from "../User/UserLoading";

export const Settings: FC = () => {
    const { color } = useContext(ThemeContext);
    const [user, setUser] = useState<DBUser>();
    const websiteUser = useContext(UserContext);

    const [editActions, setEditActions] = useState<{ submitedBio?: boolean; submitedBanner?: boolean; bio?: string; banner_url?: string; patchedbio?: boolean; patchedbanner?: boolean }>({
        banner_url: user?.banner_url,
        bio: user?.bio || "",
        submitedBio: false,
        submitedBanner: false,
        patchedbio: false,
        patchedbanner: false
    });

    const [teams, setTeams] = useState<Team[]>();

    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditActions({ bio: event?.target.value });

    const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditActions({ banner_url: event?.target.value });

    const getUserTeams = async () => {
        const req = await api.getUserTeams();
        const req2 = await api.getUserFromDB(websiteUser.user?.id || websiteUser.user?._id as string);

        setUser(req2.data);
        setTeams(req.data);
    };

    const patchBio = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editActions.bio) {
            setEditActions({ patchedbio: false });
        } else {
            setEditActions({ patchedbio: true });
            await api.patchUser({ bio: editActions.bio as string });
            setEditActions({ bio: editActions.bio, patchedbio: false, submitedBio: true });
        }
    };

    const patchBanner = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!editActions.banner_url) {
            setEditActions({ patchedbanner: false });
        } else {
            setEditActions({ patchedbanner: true });
            await api.patchUser({ banner_url: editActions.banner_url as string });
            setEditActions({ banner_url: editActions.banner_url, patchedbanner: false, submitedBanner: true });
        }
    };

    useEffect(() => {
        getUserTeams();
    }, [websiteUser.user]);

    return user ? (
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
                                <span>Fale mais sobre você, digite uma breve descrição.</span>
                            </div>
                            <form onSubmit={patchBio} className="w-[50%] xl:w-full xl:h-14 flex flex-row">
                                <div className="w-full">
                                    <input defaultValue={user.bio || ""} placeholder="Digite sua biografia aqui." maxLength={200} value={editActions.bio} required disabled={editActions.patchedbio} onChange={handleBioChange} className={`bg-transparent disabled:opacity-50 rounded-r-none focus:outline-none border-2 rounded-lg p-2 w-full h-14 ${borderColor[color]}`} type="text" />
                                    {editActions.submitedBio && <span>Bio atualizada com sucesso! <Link className="text-blue-500 hover:underline" to={`/user/${user?._id}`}>Ver perfil</Link></span>}
                                </div>
                                <Button type="submit" disabled={editActions.patchedbio} clas="w-14 h-14 flex items-center justify-center rounded-l-none diabled:opacity-50">{editActions.patchedbio ? <iconAI.AiOutlineLoading3Quarters size={22} className="animate-spin" /> : <icon.BsCheck size={22} />}</Button>
                            </form>
                        </div>
                        <div className="flex xl:flex-col gap-3 w-full p-3">
                            <div className="flex flex-col items-start justify-center flex-grow h-14">
                                <h1 className="font-bold text-lg">Banner</h1>
                                <span>Coloque o link de uma imagem para ser seu banner.</span>
                            </div>
                            <form onSubmit={patchBanner} className="w-[50%] xl:w-full xl:h-14 flex flex-row">
                                <div className="w-full">
                                    <input defaultValue={user?.banner_url} placeholder="Coloque uma URL de uma imagem aqui." maxLength={200} value={editActions.banner_url} required disabled={editActions.patchedbanner} onChange={handleBannerChange} className={`bg-transparent disabled:opacity-50 rounded-r-none focus:outline-none border-2 rounded-lg p-2 w-full h-14 ${borderColor[color]}`} type="text" />
                                    {editActions.submitedBanner && <span>Banner atualizado com sucesso! <Link className="text-blue-500 hover:underline" to={`/user/${user?._id}`}>Ver perfil</Link></span>}
                                </div>
                                <Button type="submit" disabled={editActions.patchedbanner} clas="w-14 h-14 flex items-center justify-center rounded-l-none diabled:opacity-50">{editActions.patchedbanner ? <iconAI.AiOutlineLoading3Quarters size={22} className="animate-spin" /> : <icon.BsCheck size={22} />}</Button>
                            </form>
                        </div>
                        <div className="p-3">
                            <span className="text-lg font-bold">Seus times</span>
                            <Teams teams={teams} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    ) : (
        <UserLoading />
    )
};
