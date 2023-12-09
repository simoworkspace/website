import { FC, useContext, useState, useEffect } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from "@chakra-ui/react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { Team } from "../../types";
import { borderColor } from "../../utils/theme/border";
import { Button } from "../Mixed/Button";
import * as iconAI from "react-icons/ai";
import api from "../../utils/api";
import { Teams } from "../Team/Teams";
import { UserContext } from "../../contexts/UserContext";
import { UserLoading } from "../User/UserLoading";
import simo from "../../assets/images/simo.png";
import { DashboardBot } from "./Bot";

export const DashboardComponent: FC = () => {
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);

    const [editActions, setEditActions] = useState<{
        changesLoading?: boolean;
        changesMade?: boolean;
        bio?: string | null;
        banner_url?: string | null;
    }>({
        banner_url: user?.banner_url || "",
        bio: user?.bio || "",
        changesLoading: false,
        changesMade: false
    });

    const [teams, setTeams] = useState<Team[]>();

    const handleBioChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditActions({ bio: event?.target.value, banner_url: editActions.banner_url, changesMade: true });

    const handleBannerChange = (event: React.ChangeEvent<HTMLInputElement>) => setEditActions({ banner_url: event?.target.value, bio: editActions.bio, changesMade: true });

    const getUserTeams = async () => {
        const req = await api.getUserTeams();

        setTeams(req.data);
    };

    const updateUser = async () => {
        try {
            setEditActions({ changesLoading: true, changesMade: true, banner_url: editActions.banner_url, bio: editActions.bio });

            const updatedUserData = {
                banner_url: editActions.banner_url as string,
                bio: editActions.bio as string
            };

            await api.patchUser(updatedUserData);

            setEditActions({ changesMade: false, changesLoading: false, banner_url: editActions.banner_url, bio: editActions.bio });
        } catch {
            setEditActions({ changesLoading: false, changesMade: false, banner_url: editActions.banner_url, bio: editActions.bio });
        }
    };

    useEffect(() => {
        getUserTeams();
    }, [user]);

    return user ? (
        <main className="max-w-[1500px] flex justify-center items-center">
            <section className="w-screen flex flex-row p-5 text-white items-start xl:items-center justify-center gap-10 xl:flex-col">
                <div className={`${borderColor[color]} max-w-[250px] border-2 ${editActions.banner_url ? "min-h-[300px]" : "p-6"} w-[300px] xl:w-[90vw] rounded-lg bg-neutral-900 flex justify-start flex-col gap-4 relative`}>
                    {editActions.banner_url && (
                        <img className={`w-full h-36 object-cover rounded-md rounded-b-none z-0 mb-14 bg-neutral-800`} onError={({ currentTarget }) => {
                            currentTarget.src = "http://www.luquips.com.br/wp-content/uploads/2015/04/banner-vazio-300x86.png";
                        }} src={editActions.banner_url || ""} />
                    )}
                    <div className={`w-full items-center flex justify-center ${editActions.banner_url && "z-1 absolute top-36 left-0 transform -translate-y-1/2"}`}>
                        <img
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = simo;
                            }}
                            className="rounded-full w-32" src={`https://cdn.discordapp.com/avatars/${user._id}/${user.avatar}.png`}
                            alt={`${user.username}'s Avatar`}
                        />
                    </div>
                    <div className="flex flex-col justify-center gap-1 z-2 relative px-3 pb-4">
                        <strong>{user.username}</strong>
                        <span className="text-[#797979] items-center flex text-[13px]">
                            ( {user._id} )
                        </span>
                        {editActions.bio && <span className="mt-5">{editActions.bio}</span>}
                    </div>
                </div>
                <div className="flex h-full w-full flex-col">
                    <h1 className="text-[33px] text-center mb-5 mt-1">Bem vindo a dashboard, <strong>{user?.username}</strong></h1>
                    <div className={`w-full p-3 h-full flex flex-col gap-3 bg-neutral-900 ${borderColor[color]} border-2 rounded-lg`}>
                        <Tabs position="relative" variant="unstyled">
                            <TabList>
                                <Tab>Perfil</Tab>
                                <Tab>Times</Tab>
                                <Tab>Bots</Tab>
                            </TabList>
                            <TabIndicator className={`mt[-1.5px] h-[2px] ${borderColor[color]} border-2 rounded-lg`} />
                            <TabPanels>
                                <TabPanel>
                                    <div className="flex xl:flex-col gap-3 w-full py-3">
                                        <div className="flex flex-col items-start justify-center flex-grow h-14">
                                            <h1 className="font-bold text-lg">Biografia</h1>
                                            <span>Fale mais sobre você, digite uma breve descrição.</span>
                                        </div>
                                        <form className="w-[50%] xl:w-full xl:h-14 flex flex-row">
                                            <div className="w-full">
                                                <input defaultValue={user.bio || ""} placeholder="Digite sua biografia aqui." maxLength={200} value={editActions.bio || ""} required onChange={handleBioChange} className={`bg-transparent disabled:opacity-50 focus:outline-none border-2 rounded-lg p-2 w-full h-14 ${borderColor[color]}`} type="text" />
                                            </div>
                                        </form>
                                    </div>
                                    <div className="flex xl:flex-col gap-3 w-full py-3">
                                        <div className="flex flex-col items-start justify-center flex-grow h-14">
                                            <h1 className="font-bold text-lg">Banner</h1>
                                            <span>Coloque o link de uma imagem para ser seu banner.</span>
                                        </div>
                                        <form className="w-[50%] xl:w-full xl:h-14 flex flex-row">
                                            <div className="w-full">
                                                <input defaultValue={user?.banner_url || ""} placeholder="Coloque uma URL de uma imagem aqui." maxLength={200} value={editActions.banner_url || ""} required onChange={handleBannerChange} className={`bg-transparent disabled:opacity-5 focus:outline-none border-2 rounded-lg p-2 w-full h-14 ${borderColor[color]}`} type="text" />
                                            </div>
                                        </form>
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <div className="py-3">
                                        <span className="text-lg font-bold">Seus times</span>
                                        <Teams teams={teams} />
                                    </div>
                                </TabPanel>
                                <TabPanel>
                                    <DashboardBot />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </div>
                </div>
            </section>
            {editActions.changesMade && (
                <div className={`${editActions.changesMade ? "fade-in" : "fade-out"} w-[90vw] absolute xl:z-10 xl:fixed xl:bottom-10 xl:w-[95vw] bottom-2 bg-neutral-800 ${borderColor[color]} border-2 rounded-lg duration-200`}>
                    <div className="flex p-2 text-white w-full items-center">
                        <span className="flex flex-grow">Você tem alterações para serem salvas</span>
                        <div className="flex gap-2 items-center">
                            <button onClick={() => {
                                window.location.reload();

                                setEditActions({ changesMade: false });
                            }} className="text-neutral-400">Desfazer</button>
                            <Button disabled={editActions.changesLoading} clas="disabled:opacity-50" action={updateUser}>
                                {!editActions.changesLoading ? <span>Salvar alterações</span> : <iconAI.AiOutlineLoading3Quarters fill="#fff" size={22} className="animate-spin" />}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    ) : (
        <UserLoading />
    )
};
