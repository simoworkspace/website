import { FC, useContext } from "react";
import { borderColor } from "../../utils/theme/border";
import { Theme } from "../../types";
import simo from "../../assets/images/simo.png";
import { UserContext } from "../../contexts/UserContext";

export const DashboardUser: FC<{ color: Theme }> = ({ color }) => {
    const { user } = useContext(UserContext);

    return user ? (
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
    ) : (
        <div className="flex flex-row text-white items-center justify-center xl:flex-col">
            <div className="border-2 p-11 w-[250px] xl:w-[90vw] rounded-lg bg-neutral-900 flex items-center justify-center flex-col">
                <div>
                    <div className="rounded-full w-[100px] h-[100px] bg-neutral-800 animate-pulse" />
                </div>
                <hr className="w-[80%] my-5" />
                <div className="flex flex-col text-center justify-center">
                    <div className="bg-neutral-800 rounded-lg w-[120px] h-[20px] animate-pulse"></div>
                    <div className="text-[#797979] items-center flex text-[13px] justify-center"></div>
                </div>
            </div>
        </div>
    )
};