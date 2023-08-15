import React, { useState, useContext } from "react";
import arrowIcon from "../../assets/svgs/arrow.svg";
import { Dropdownmenu } from "../DropdownMenu/DropdownMenu";
import { UserContext } from "../../contexts/UserContext";

export const LoggedMenu: React.FC = () => {
    const { user } = useContext(UserContext);
    const [arrowState, setArrowState] = useState<boolean>(false);

    return (
        <>
            <div className="w-[800px] flex justify-end mr-[14px]">
                <button
                    onClick={() => setArrowState(!arrowState)}
                    className="flex text-white w-[128] h-[50px] xl:hidden flex-row-reverse"
                >
                    <div
                        className={`flex items-center h-[100%] transition-all duration-200 ${arrowState
                            ? "border-white"
                            : "border-[#858585] hover:border-[#a8a8a8]"
                            } border-[1px] bg-black p-6`}
                    >
                        <img
                            className="w-[30px] h-[30px] rounded-full float-right"
                            src={`https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.png?size=2048`}
                            alt={`${user?.username}'s Avatar`}
                        />
                        <span className="p-2">{user?.username}</span>
                        <div>
                            <img
                                className={`w-[23px] h-[23px] transition-all ${arrowState
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
                className={`xl:hidden transition-all duration-300 border-white border-[1px] rounded-b-lg absolute bg-black text-white w-[151px] right-[14px] top-[61px] ${
                    arrowState
                        ? "opacity-100 border-transparent h-[202px]"
                        : "h-[0px] opacity-0 invisible"
                    }`}
            >
                <Dropdownmenu setArrowState={setArrowState}/>
            </div>
        </>
    );
};