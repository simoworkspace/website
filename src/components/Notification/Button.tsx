import { FC, useContext, useEffect, useRef, useState } from "react";
import * as icon from "react-icons/bs";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";
import { UserContext } from "../../contexts/UserContext";
import { NotificationStructure } from "../../types";
import { AxiosResponse } from "axios";
import api from "../../utils/api";
import { NotificationCard } from "./Card";
import { scrollBar } from "../../utils/theme/scrollBar";

export const NotificationButton: FC = () => {
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [notifications, setNotifications] = useState<NotificationStructure>({});

    const getNotifications = async (): Promise<void> => {
        const req: AxiosResponse<NotificationStructure> = await api.getNotifications(user?.id);
        setNotifications(req.data);
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
    }, [user])

    return (
        <section ref={menuRef}>
            {Object.keys(notifications).length > 0 && <div className="h-3 w-3 bg-red-500 absolute rounded-lg"/>}
            <button onClick={() => setIsOpen(!isOpen)} className={`xl:invisible ${borderColor[color]} mr-1 flex border-2 p-3 items-center justify-center rounded-lg bg-neutral-900 h-[50px]`}>
                <icon.BsBell fill="#fff" />
            </button>
            <div className={`${isOpen ? "opacity-100" : "opacity-0 invisible"} ${scrollBar[color]} p-3 xl:invisible overflow-auto flex-col flex text-white rounded-lg absolute right-[195px] h-[300px] w-[500px] top-16 origin-top-right bg-neutral-900 border-2 transition-all duration-300 ${borderColor[color]}`}>
                {notifications ? (
                    <div>
                        {Object.keys(notifications).map(key => ( <NotificationCard updateNotifications={getNotifications} user={user} notification={notifications[key]} keyc={key} color={color} /> ))}
                    </div>
                ) : (
                    <div>Você não tem notificações.</div>
                )}
            </div>
        </section>
    )
};