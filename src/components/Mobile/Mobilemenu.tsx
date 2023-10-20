import { Link } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { UserStructure } from "../../types";
import { UserContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import api from "../../utils/api";
import { mobileMenu } from "../../utils/theme/mobileMenu";
import * as icon from "react-icons/bi";

export const Mobilemenu: React.FC = () => {
    const { user } = useContext<UserStructure | any>(UserContext);
    const { color } = useContext(ThemeContext);

    const [click, setClick] = useState<boolean>(false);
    const [selPage, setSelPage] = useState<string>(location.href.split("/")[3]);

    useEffect(() => {
        setSelPage(location.href.split("/")[3]);
    }, [click]);

    return (
        <div className={`hidden xl:fixed xl:bottom-0 xl:left-0 xl:w-full border-t-2 transition-colors duration-300 ${mobileMenu[color]} xl:text-white xl:py-3 xl:flex xl:justify-around xl:items-center`}>
            {user ? (
                <>
                    <section className="flex flex-row w-full items-center">
                        <Link onClick={() => {
                            setClick(!click);
                        }} to="/notifications" className="flex flex-grow justify-center">
                            {selPage === "notifications" ? <icon.BiSolidBell size={25} /> : <icon.BiBell size={25} />}
                        </Link>
                        <Link onClick={() => {
                            setClick(!click);
                        }} to="/addbot" className="flex flex-grow justify-center">
                            {selPage === "addbot" ? <icon.BiPlusMedical size={25} /> : <icon.BiPlus size={25} />}
                        </Link>
                        <Link onClick={() => {
                            setClick(!click);
                        }} to="/themes" className="flex flex-grow justify-center">
                            {selPage === "themes" ? <icon.BiSolidPalette size={25} /> : <icon.BiPalette size={25} />}
                        </Link>
                        <button onClick={async () => {
                            await api.logoutUser();
                            window.location.reload();
                        }} className="flex flex-grow justify-center">
                            <icon.BiExit size={25} />
                        </button>
                    </section>
                </>
            ) : (
                <div className="w-screen flex items-center justify-center">
                    <Link
                        className="w-full self-center text-center text-white"
                        to={import.meta.env.VITE_AUTH_LINK}
                    >
                        login
                    </Link>
                </div>
            )}
        </div>
    );
};
