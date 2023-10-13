import { FC, useState } from "react";
import { NotificationBody, Theme, UserStructure } from "../../types";
import { borderColor } from "../../utils/theme/border";
import * as icon from "react-icons/bs";
import * as iconAI from "react-icons/ai";
import api from "../../utils/api";

export const NotificationCard: FC<{
    notification: NotificationBody;
    color: Theme;
    user: UserStructure | null;
    keyc: string;
    updateNotifications: () => Promise<void>;
}> = ({ notification, color, user, keyc, updateNotifications }) => {
    const [deleted, setDeleted] = useState<boolean>(false);

    const handleDeleteNotification = async (): Promise<void> => {
        setDeleted(true);

        await api.deleteNotification(user?.id, keyc);
        await updateNotifications();

        setDeleted(false);
    };

    const typeSchemas: {
        [key: number]: {
            colors: string,
            icon: React.ReactNode
        }
    } = {
        0: {
            colors: "#808080",
            icon: <icon.BsChat  size={30} fill="#808080"/>
        },
        1: {
            colors: "#03ff4a",
            icon: <icon.BsCheck2Circle size={30} fill="#03ff4a" />
        },
        2: {
            colors: "#ff3636",
            icon: <icon.BsXCircle size={30} fill="#ff3636" />
        }
    }

    return (
        <div className={`flex items-center gap-3 ${borderColor[color]} border-l-[${typeSchemas[notification.type].colors}] border-l-[5px] border-2 rounded-lg p-3 w-full break-words`}>
            {typeSchemas[notification.type].icon}
            <span className="w-full">{notification.content}</span>
            <button disabled={deleted} onClick={handleDeleteNotification} className="disabled:cursor-default flex h-full justify-start items-center">
                {deleted ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={25} className="animate-spin" /> : <icon.BsX size={25} className="hover:fill-red-500 transition-all duration-300" />}
            </button>
        </div>
    )
};