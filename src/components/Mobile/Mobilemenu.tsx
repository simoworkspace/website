import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserStructure } from "../../types";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import api from "../../utils/api";
import { mobileMenu } from "../../utils/theme/mobileMenu";
import * as icon from "react-icons/bi";
import * as iconMD from "react-icons/md";
import { FaRegSnowflake } from "react-icons/fa";
import simo from "../../assets/images/simo.png";
import { borderColor } from "../../utils/theme/border";

export const Mobilemenu: React.FC = () => {
    const { user } = useContext(UserContext);
    const { color } = useContext(ThemeContext);

    const [snowflakes, setSnowflakes] = useState<boolean>(true);
    const page = location.href.split("/")[3];

    const [click, setClick] = useState<boolean>(false);
    const [selPage, setSelPage] = useState<string>(page);
    const [profileMenu, setProfileMenu] = useState<boolean>(false);

    useEffect(() => {
        setSelPage(page);
    }, [click]);

    return (
        <div className={`hidden xl:fixed xl:bottom-0 xl:left-0 xl:w-full transition-colors duration-300 ${mobileMenu[color]} xl:text-white xl:py-3 xl:flex xl:justify-around xl:items-center`}>
            {snowflakes && (
                <div className="snowflakes xlr:invisible">
                    {Array(14).fill(
                        <div className="snowflake">
                            ❅
                        </div>
                    )}
                </div>
            )}
            <>
                <section className="flex flex-row w-full items-center">
                    <button className="flex flex-grow justify-center" onClick={() => setSnowflakes(!snowflakes)}>
                        <FaRegSnowflake size={24} />
                    </button>
                    <Link onClick={() => setClick(!click)} to="/notifications" className="flex flex-grow justify-center">
                        {selPage === "notifications" ? <icon.BiSolidBell size={25} /> : <icon.BiBell size={25} />}
                    </Link>
                    <Link onClick={() => setClick(!click)} to="/addbot" className="flex flex-grow justify-center">
                        {selPage === "addbot" ? <icon.BiPlusMedical size={25} /> : <icon.BiPlus size={25} />}
                    </Link>
                    <Link onClick={() => setClick(!click)} to="/themes" className="flex flex-grow justify-center">
                        {selPage === "themes" ? <icon.BiSolidPalette size={25} /> : <icon.BiPalette size={25} />}
                    </Link>
                    {user ? (
                        <button onClick={() => setProfileMenu(!profileMenu)} className="flex flex-grow justify-center">
                            <img className="w-7 rounded-full" onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = simo;
                            }} src={`https://cdn.discordapp.com/avatars/${user._id}/${user.avatar}.png`} />
                        </button>
                    ) : (
                        <Link to={import.meta.env.VITE_AUTH_LINK} className="flex flex-grow justify-center">
                            <iconMD.MdLogin size={25} />
                        </Link>
                    )}
                </section>
                <div className={`${profileMenu ? "visibile opacity-100" : "invisible opacity-0"} bottom-14 right-1 transition-opacity duration-300 absolute bg-neutral-900 rounded-lg border-2 ${borderColor[color]} p-4 px-5`}>
                    <div className="flex flex-col gap-4">
                        <Link onClick={() => setClick(!click)} className="flex gap-2" to="/dashboard">
                            <iconMD.MdPerson size={25} />
                            <span>Perfil</span>
                        </Link>
                        <button onClick={async () => {
                            await api.logoutUser();
                            
                            window.location.reload();
                        }} className="flex gap-2">
                            <iconMD.MdLogout size={25} />
                            <span>Sair</span>
                        </button>
                    </div>
                </div>
            </>
        </div>
    );
};
