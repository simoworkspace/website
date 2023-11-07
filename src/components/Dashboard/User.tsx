import { FC, useEffect, useState } from "react";
import { borderColor } from "../../utils/theme/border";
import { Theme, UserStructure } from "../../types";
import { Button } from "../Mixed/Button";
import * as icon from "react-icons/bs";

export const DashboardUser: FC<{
    color: Theme;
    user: UserStructure;
}> = ({ color, user }) => {
    const [page, setPage] = useState<boolean>();

    useEffect(() => {
        setPage(location.href.split("/")[4] === "settings");
    }, []);

    return (
        <div className={`${borderColor[color]} border-2 w-[300px] py-8 xl:w-[90vw] rounded-lg bg-neutral-900 flex items-center justify-center flex-col`}>
            <div>
                <img className="rounded-full" src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png`} alt={`${user?.username}'s Avatar`} />
            </div>
            <hr className="w-[80%] my-5" />
            <div className="flex flex-col text-center justify-center">
                <strong>{user?.username}</strong>
                <span className="text-[#797979] items-center flex text-[13px] justify-center">
                    ( {user?.id} )
                </span>
            </div>
            <div className="mt-8 w-10/12">
                {!page ? <Button clas="text-center flex items-center gap-2 w-full flex items-center justify-center" link to={`/dashboard/settings`}><icon.BsGear/>Configurações</Button> : <Button clas="text-center flex items-center gap-2 w-full flex items-center justify-center" link to={`/dashboard`}><icon.BsArrowLeft />Voltar</Button>}
            </div>
        </div>
    )
};