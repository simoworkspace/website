import logoutIcon from "../../assets/svgs/logout.svg";
import plusIcon from "../../assets/svgs/plus.svg";
import dashIcon from "../../assets/svgs/dashboard.svg";
import listIcon from "../../assets/svgs/list.svg";
import paletteIcon from "../../assets/svgs/pallete.svg";
import React, { useState } from "react";
import api from "../../utils/api";
import { MenuOption } from "./Option";
import { ChoiceColor } from "../Colors/Choice";

export const Dropdownmenu: React.FC<{ 
    setArrowState: (value: boolean) => void 
}> = ({ setArrowState }) => {
    const [themeShow, setThemeShow] = useState<boolean>();
    const selectedTheme = localStorage.getItem("theme") || "blue";
    const [selected, setSelected] = useState<string>();

    return (
        <div className="flex w-[151px] justify-center items-center" onMouseLeave={() => setArrowState(false)}>
            <div className="flex flex-col justify-center">
                <MenuOption to="/addbot" alt="Plus Icon" icon={plusIcon} title="Adicionar bot" type="link" />
                <MenuOption to="/" alt="List Icon" icon={listIcon} title="Botlist" type="link" fix />
                <MenuOption to="/dashboard" alt="Dashboard Icon" icon={dashIcon} title="Dashboard" type="link" fix />
                <MenuOption alt="Logout Icon" icon={paletteIcon} title="Temas" type="button" action={() => {
                    setThemeShow(!themeShow);
                    selected === "theme" ? setSelected("") : setSelected("theme")
                }} fix selected={selected === "theme"}/>
                <MenuOption alt="Logout icon" icon={logoutIcon} title="Sair" type="button" action={async () => { await api.logoutUser(); return window.location.reload(); }} fix />
            </div>
            <div className={`absolute border-white border-[1px] bg-black w-[120px] right-[150px] xl:hidden text-white transition-all duration-200 top-[120px] ${
                themeShow
                ? "opacity-100"
                : "opacity-0 invisible"
            }`}>
                <div className="flex flex-col w-[100%]">
                    <ChoiceColor name="Vermelho" theme="red" margin="6px" selected={selectedTheme === "red"} />
                    <ChoiceColor name="Azul" theme="blue" margin="6px" selected={selectedTheme === "blue"} />
                    <ChoiceColor name="Roxo" theme="purple" margin="6px" selected={selectedTheme === "purple"} />
                    <ChoiceColor name="Verde" theme="green" margin="6px" selected={selectedTheme === "green"} />
                    <ChoiceColor name="Preto" theme="black" margin="6px" selected={selectedTheme === "black"} />
                </div>
            </div>
        </div>
    );
};
