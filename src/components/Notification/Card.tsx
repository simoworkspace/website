import { FC, useState } from "react";
import { NotificationBody, Theme, UserStructure } from "../../types";
import { borderColor } from "../../utils/theme/border";
import * as icon from "react-icons/bs";
import * as iconAI from "react-icons/ai";
import api from "../../utils/api";
import { Markdown } from "../Markdown/Markdown";

export const NotificationCard: FC<{
    notification: NotificationBody;
    color: Theme;
    user: UserStructure | null;
    keyc: string;
    updateNotifications: () => Promise<void>;
    mobile?: boolean;
}> = ({ notification, color, user, keyc, updateNotifications, mobile }) => {
    const [deleted, setDeleted] = useState<boolean>(false);

    const handleDeleteNotification = async (): Promise<void> => {
        setDeleted(true);

        await api.deleteNotification(user?.id, keyc);
        await updateNotifications();

        setDeleted(false);
    };

    const typeSchemas: Record<number, { colors: string, icon: React.ReactNode, url?: string }> = {
        0: {
            colors: "border-l-[#808080]",
            icon: <icon.BsChat size={30} fill="#808080" />
        },
        1: {
            colors: "border-l-[#03ff4a]",
            icon: <icon.BsCheck2Circle size={30} fill="#03ff4a" />
        },
        2: {
            colors: "border-l-[#ff3636]",
            icon: <icon.BsXCircle size={30} fill="#ff3636" />
        },
        3: {
            colors: "border-l-[#808080]",
            icon: <icon.BsXCircle size={30} fill="#ff3636" />
        }
    }

    return mobile ? (
        <div className={`flex items-center gap-3 ${borderColor[color]} ${typeSchemas[notification.type].colors} border-l-[5px] border-2 rounded-lg p-3 w-full break-before-all bg-neutral-900`}>
            {notification.type !== 3 ? typeSchemas[notification.type].icon : <img onError={async ({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = (await import("../../assets/images/simo.png")).default;
            }} className="w-[40px] rounded-full" src={notification.url} />}
            <span className="w-full"><Markdown markdown={notification.content} /></span>
            <button disabled={deleted} onClick={handleDeleteNotification} className="disabled:cursor-default flex h-full justify-start items-center">
                {deleted ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={25} className="animate-spin" /> : <icon.BsX size={25} className="hover:fill-red-500 transition-all duration-300" />}
            </button>
        </div>
    ) : (
        <div className={`flex items-center gap-3 ${borderColor[color]} ${typeSchemas[notification.type].colors} border-l-[5px] border-2 rounded-lg p-3 w-full break-before-all`}>
            {notification.type !== 3 ? typeSchemas[notification.type].icon : <img onError={async ({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = (await import("../../assets/images/simo.png")).default;
            }} className="w-[40px] rounded-full" src={notification.url} />}
            <span className="w-full"><Markdown markdown={notification.content} /></span>
            <button disabled={deleted} onClick={handleDeleteNotification} className="disabled:cursor-default flex justify-start items-start">
                {deleted ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={25} className="animate-spin" /> : <icon.BsX size={25} className="hover:fill-red-500 transition-all duration-300" />}
            </button>
        </div>
    )
};