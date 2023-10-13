import { FC, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { UserContext } from "../contexts/UserContext";
import { NotificationStructure } from "../types";
import { AxiosResponse } from "axios";
import api from "../utils/api";
import { borderColor } from "../utils/theme/border";
import { NotificationCard } from "../components/Notification/Card";

export const NotificationsPage: FC = () => {
    const { color } = useContext(ThemeContext);
    const { user } = useContext(UserContext);

    const [notifications, setNotifications] = useState<NotificationStructure>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getNotifications = async (): Promise<void> => {
        setIsLoading(true);

        const req: AxiosResponse<NotificationStructure> = await api.getNotifications(user?.id);
        setNotifications(req.data);

        setIsLoading(false);
    };

    useEffect(() => {
        if (user) {
            getNotifications();
        }
    }, [user]);

    return (
        <section>
            <div className={`p-3 flex-col flex text-white rounded-lg w-[90vw] transition-all duration-300 ${borderColor[color]} min-h-[67vh]`}>
                <h1 className="text-[22px] text-center my-4"><strong>Suas notificações</strong></h1>
                {isLoading ? (
                    <div className="flex flex-col gap-3">
                        <div className="w-[100%] bg-neutral-900 animate-pulse h-[50px] rounded-lg"></div>
                        <div className="w-[100%] bg-neutral-900 animate-pulse h-[70px] rounded-lg"></div>
                        <div className="w-[100%] bg-neutral-900 animate-pulse h-[80px] rounded-lg"></div>
                        <div className="w-[100%] bg-neutral-900 animate-pulse h-[120px] rounded-lg"></div>
                        <div className="w-[100%] bg-neutral-900 animate-pulse h-[60px] rounded-lg"></div>
                    </div>
                ) : (
                    <div>
                        {Object.keys(notifications).length > 0 ? (
                            <div className="flex flex-col gap-3">
                                {Object.keys(notifications).map(key => (
                                    <NotificationCard mobile updateNotifications={getNotifications} user={user} notification={notifications[key]} key={key} keyc={key} color={color} />
                                ))}
                            </div>
                        ) : (
                            <div className="w-[100%] text-center text-[20px] h-[270px] flex items-center justify-center">
                                <span>Você não tem notificações.</span>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    )
};