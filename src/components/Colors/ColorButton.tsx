import React, { useState } from "react";
import { ChoiceColor } from "./Choice";
import { ToggleColorMenu } from "./ToggleMenu";

export const ColorButton: React.FC = () => {
    const [menu, setMenu] = useState<boolean>(false);

    return (
        <div>
            <ToggleColorMenu menu={menu} setMenu={setMenu} />
            <div className={`absolute border-white border-[1px] bg-black w-[120px] right-[119px] xl:hidden text-white transition-all duration-200 ${
                menu
                    ? "opacity-100 border-transparent"
                    : "opacity-0 invisible"
                }`}
            >
                <div className="flex flex-col w-[100%]">
                    <ChoiceColor name="Vermelho" theme="red" margin="6px" />
                    <ChoiceColor name="Azul" theme="blue" margin="6px" />
                    <ChoiceColor name="Roxo" theme="purple" margin="6px" />
                    <ChoiceColor name="Verde" theme="green" margin="6px" />
                </div>
            </div>
        </div>
    );
};
