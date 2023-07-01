import React, { useState, useContext } from "react";
import paletteIcon from "../assets/svgs/pallete.svg";
import { ThemeContext } from "../contexts/ThemeContext";
import { ThemeContextProps, Theme } from "../types";

export const ColorButton: React.FC = () => {
    const [menu, setMenu] = useState<boolean>(false);
    const { changeTheme } = useContext<ThemeContextProps>(ThemeContext);

    const toggleTheme = (newTheme: Theme) => {
        changeTheme(newTheme);
    };

    return (
        <div>
            <button
                onClick={() => {
                    setMenu(!menu);
                }}
                onBlur={() => {
                    setMenu(false);
                }}
                className={`w-[40px] bg-black ${
                    menu
                        ? "border-white"
                        : "border-[#858585] hover:border-[#a8a8a8]"
                } justify-center border-[1px] transition-all duration-200 h-[50px] flex items-center xl:hidden`}
            >
                <img
                    className="w-[60%] flex"
                    src={paletteIcon}
                    alt="Palette icon"
                />
            </button>
            <div
                className={`absolute border-white border-[1px] bg-black w-[120px] right-[190px] xl:hidden text-white transition-all duration-200 ${
                    menu
                        ? "opacity-100 border-transparent"
                        : "opacity-0 invisible"
                }`}
            >
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            toggleTheme("red");
                        }}
                        className="hover:bg-[#3a3a3a] rounded-md m-[6px] transition-all"
                    >
                        <div className="flex gap-2 flex-row items-center justify-center">
                            <div className="w-3 h-3 bg-[#802222] rounded-full shadow-[#802222] shadow-2xl"></div>
                            <div>Vermelho</div>
                        </div>
                    </button>
                    <button
                        onClick={() => {
                            toggleTheme("blue");
                        }}
                        className="hover:bg-[#3a3a3a] rounded-md m-[6px] transition-all"
                    >
                        <div className="flex gap-2 flex-row items-center justify-center">
                            <div className="w-3 h-3 bg-[#004d7c] rounded-full shadow-[#004d7c] shadow-2xl"></div>
                            <div>Azul</div>
                        </div>
                    </button>
                    <button
                        onClick={() => {
                            toggleTheme("green");
                        }}
                        className="hover:bg-[#3a3a3a] rounded-md m-[6px] transition-all"
                    >
                        <div className="flex gap-2 flex-row items-center justify-center">
                            <div className="w-3 h-3 bg-[#04484d] rounded-full shadow-[#04484d] shadow-2xl"></div>
                            <div>Verde</div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
