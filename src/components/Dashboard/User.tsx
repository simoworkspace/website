import { FC, useEffect } from "react";
import { borderColor } from "../../utils/theme/border";
import { Theme, UserStructure } from "../../types";
import simo from "../../assets/images/simo.png";

export const DashboardUser: FC<{
    color: Theme;
    user: UserStructure;
}> = ({ color, user }) => {
    return (
        <div className={`${borderColor[color]} border-2 ${user.banner_url ? "min-h-[300px]" : "p-6"} w-[300px] xl:w-[90vw] rounded-lg bg-neutral-900 flex justify-start flex-col gap-4 relative`}>
            {user.banner_url && (
                <img className="w-full h-36 object-cover rounded-md rounded-b-none z-0 mb-14" src={user.banner_url} alt="Possible banner" />
            )}
            <div className={`w-full items-center flex justify-center ${user.banner_url && "z-1 absolute top-36 left-0 transform -translate-y-1/2"}`}>
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
                {user?.bio && <span className="mt-5">{user.bio}</span>}
            </div>
        </div>
    )
};