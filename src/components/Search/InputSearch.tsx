import * as icon from "react-icons/bs";
import React from "react";

export const InputSearch: React.FC = () => {
    return (
        <div className="flex w-[1300px] xl:invisible items-center justify-center">
            <form action="/search" className={`flex items-center bg-black border-[#8b8b8b] border-[2px] p-2 mt-2 mb-[10px] rounded-[10px] h-[55px] w-full max-w-[600px] focus-within:border-white transition-all duration-500ms`}>
                <input
                    className="outline-none bg-black w-full h-full text-white border-[#8b8b8b]"
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
