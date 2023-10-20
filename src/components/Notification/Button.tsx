import { FC, useContext, useEffect, useRef, useState } from "react";
import * as icon from "react-icons/bs";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";
import { UserContext } from "../../contexts/UserContext";
import { NotificationStructure } from "../../types";
import { AxiosResponse } from "axios";
import api from "../../utils/api";
import * as iconAI from "react-icons/ai";
import { NotificationCard } from "./Card";
import { scrollBar } from "../../utils/theme/scrollBar";
import { buttonColor } from "../../utils/theme/button";
import { Link } from "react-router-dom";

export const NotificationButton: FC = () => {
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [notifications, setNotifications] = useState<NotificationStructure>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [bulkLoading, setBulkLoading] = useState<boolean>(false);

    const getNotifications = async (): Promise<void> => {
        setIsLoading(true);
        const req: AxiosResponse<NotificationStructure> = await api.getNotifications(user?.id);
        setNotifications(req.data);
        setIsLoading(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent): void => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (user) {
            getNotifications();
        }
    }, [user]);

    return (
        <section ref={menuRef} className={`${!user && "invisible"}`}>
            {Object.keys(notifications).length > 0 && <div className="h-3 w-3 bg-red-500 absolute rounded-lg xl:hidden" />}
            <button onClick={() => setIsOpen(!isOpen)} className={`xl:invisible ${borderColor[color]} mr-1 flex border-2 p-3 items-center justify-center rounded-lg bg-neutral-900 h-[50px]`}>
                <icon.BsBell fill="#fff" />
            </button>
            <div className={`${isOpen ? "opacity-100" : "opacity-0 invisible"} ${scrollBar[color]} p-3 xl:invisible overflow-auto flex-col flex text-white rounded-lg absolute right-[195px] max-h-[300px] w-[500px] top-16 origin-top-right bg-neutral-900 border-2 transition-all duration-300 ${borderColor[color]}`}>
                {isLoading ? (
                    <div className="flex flex-col gap-3 xl:invisible">
                        <h1 className="text-[22px] text-center my-1"><strong>Suas notificações</strong></h1>
                        <div className="w-[100%] bg-neutral-800 animate-pulse h-[70px] rounded-lg"></div>
                        <div className="w-[100%] bg-neutral-800 animate-pulse h-[50px] rounded-lg"></div>
                        <div className="w-[100%] bg-neutral-800 animate-pulse h-[66px] rounded-lg"></div>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-[22px] text-center my-1"><strong>Suas notificações</strong></h1>
                        {Object.keys(notifications).length > 0 ? (
                            <>
                                <div className="flex flex-col my-3 gap-3 xl:invisible">
                                    {Object.keys(notifications).map(key => (
                                        <NotificationCard updateNotifications={getNotifications} user={user} notification={notifications[key]} key={key} keyc={key} color={color} />
                                    ))}
                                </div>
                                <Link className="text-blue-500 underline hover:text-blue-600 transition-colors flex items-center justify-center mb-3" to="/notifications">
                                    <span>Página de notificações</span>
                                </Link>
                                <div className="flex flex-row gap-2 items-center justify-center">
                                    <button onClick={async () => {
                                        setBulkLoading(true);

                                        await api.deleteAllNotifications(user?.id);
                                        await getNotifications();

                                        setBulkLoading(false);
                                    }} className={`text-center ${buttonColor[color]} duration-300 transition-colors p-3 rounded-lg border-2 w-full`}>Limpar notificações</button>
                                    {bulkLoading && <iconAI.AiOutlineLoading3Quarters fill="#fff" size={25} className="animate-spin" />}
                                </div>
                            </>
                        ) : (
                            <div className="w-[100%] text-center text-[20px] flex items-center justify-center my-3">
                                <span>Você não tem notificações.</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
};
