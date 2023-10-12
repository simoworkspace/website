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

    return (
        <div className={`w-[100%] ${borderColor[color]} p-2 flex items-center`}>
            {notification.type === 0 ? (
                <div className={`flex items-center gap-3 ${borderColor[color]} border-l-[#808080] border-l-[5px] border-2 rounded-lg p-3 w-full break-words`}>
                    <icon.BsChat size={30} fill="#808080" />
                    <span className="w-full">{notification.content}</span>
                    <button disabled={deleted} onClick={handleDeleteNotification} className="disabled:cursor-default flex h-full justify-start items-center">
                        {deleted ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={25} className="animate-spin" /> : <icon.BsX size={25} className="hover:fill-red-500 transition-all duration-300" />}
                    </button>
                </div>
            ) : notification.type === 1 ? (
                <div className={`flex items-center gap-3 ${borderColor[color]} border-l-[#03ff4a] border-l-[5px] border-2 rounded-lg p-3 w-full break-words`}>
                    <icon.BsCheck2Circle size={30} fill="#03ff4a" />
                    <span className="w-full">{notification.content}</span>
                    <button disabled={deleted} onClick={handleDeleteNotification} className="disabled:cursor-default flex h-full justify-start items-center">
                        {deleted ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={25} className="animate-spin" /> : <icon.BsX size={25} className="hover:fill-red-500 transition-all duration-300" />}
                    </button>
                </div>
            ) : (
                <div className={`flex items-center gap-3 ${borderColor[color]} border-l-[#ff3636] border-l-[5px] border-2 rounded-lg p-3 w-full break-words`}>
                    <icon.BsXCircle size={30} fill="#ff3636" />
                    <span className="w-full">{notification.content}</span>
                    <button disabled={deleted} onClick={handleDeleteNotification} className="disabled:cursor-default flex h-full justify-start items-center">
                        {deleted ? <iconAI.AiOutlineLoading3Quarters fill="#fff" size={25} className="animate-spin" /> : <icon.BsX size={25} className="hover:fill-red-500 transition-all duration-300" />}
                    </button>
                </div>
            )}
        </div>
    )
};