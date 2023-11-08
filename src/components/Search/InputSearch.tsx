import * as icon from "react-icons/bs";
import React, { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";
import { borderColor } from "../../utils/theme/border";

export const InputSearch: React.FC<{ show: boolean  }> = ({ show }) => {
    const { color } = useContext(ThemeContext);

    return (
        <div className={`flex w-[1300px] items-center justify-center transition-all ${!show && "xl:invisible xl:opacity-0"}`}>
            <form action="/search" className={`flex items-center bg-neutral-900 ${borderColor[color]} border-2 p-2 mt-2 mb-[10px] rounded-lg h-[55px] w-full max-w-[600px] focus-within:bg-neutral-800 transition-all`}>
                <input
                    className={`outline-none bg-transparent w-full h-full text-white ${borderColor[color]} transition-all`}
                    name="bot"
                    placeholder="Pesquise por um bot."
                />
                <button type="submit" >
                    <icon.BsSearch fill="#fff"/>
                </button>
            </form>
        </div>
    );
};
