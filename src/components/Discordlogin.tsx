import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import arrowIcon from "../assets/svgs/arrow.svg";
import { Dropdownmenu } from "./Dropdownmenu";
import { UserContext } from "../contexts/UserContext";

const UserLogin: React.FC = () => {
    const { user } = useContext(UserContext);

    const [arrowState, setArrowState] = useState<boolean>(false);

    return (
        <div>
            {user ? (
                <>
                    <div >
                        <button
                            onClick={() => {
                                setArrowState(!arrowState);
                            }}
                            onBlur={() => {
                                setArrowState(false);
                            }}
                            className="flex text-white w-[120px] h-[50px] xl:hidden"
                        >
                            <div
                                className={`flex items-center h-[100%] transition-all duration-200 ${
                                    arrowState
                                        ? "border-white"
                                        : "border-[#858585] hover:border-[#a8a8a8]"
                                } border-[1px] bg-black p-6`}
                            >
                                <img
                                    className="w-[30px] h-[30px] rounded-full float-right"
                                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=2048`}
                                    alt="User Image"
                                />
                                <div>
                                    <img
                                        className={`w-[23px] h-[23px] ml-2 transition-all ${
                                            arrowState
                                                ? "rotate-180"
                                                : "rotate-0"
                                        }`}
                                        src={arrowIcon}
                                        alt="Arrow Icon"
                                    />
                                </div>
                            </div>
                        </button>
                    </div>
                    <div
                        className={`xl:hidden transition-all duration-300 border-white border-[1px] rounded-lg absolute bg-black text-white w-[164px] right-[10px] top-[61px] ${
                            arrowState
                                ? "opacity-100 border-transparent"
                                : "opacity-0 invisible"
                        }`}
                    >
                        <Dropdownmenu />
                    </div>
                </>
            ) : (
                <div className="flex text-white w-[140px] h-[50px] xl:hidden">
                    <Link
                        className="flex items-center h-[100%] w-[80%] justify-center border-[#858585] border-[1px] bg-black p-6 transition-colors duration-300 hover:bg-neutral-950 hover:border-white"
                        to={import.meta.env.VITE_AUTH_LINK as string}
                    >
                        <div>Login</div>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UserLogin;
