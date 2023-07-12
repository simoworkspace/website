import React, { useState } from "react";
import { ChoiceColor } from "./Choice";
import { ToggleColorMenu } from "./ToggleMenu";

export const ColorButton: React.FC = () => {
    const [menu, setMenu] = useState<boolean>(true);

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
                    <ChoiceColor color="#802222" name="Vermelho" theme="red" />
                    <ChoiceColor color="#004d7c" name="Azul" theme="blue" />
                    <ChoiceColor color="#04484d" name="Verde" theme="green" />
                </div>
            </div>
        </div>
    );
};
