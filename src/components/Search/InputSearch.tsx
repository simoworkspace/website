import searchIcon from "../../assets/svgs/search.svg";
import React from "react";

export const InputSearch: React.FC = () => {
    return (
        <div className="flex w-[1300px] xl:hidden items-center justify-center">
            <form action="/search" className={`flex items-center bg-black border-[#8b8b8b] border-[2px] p-2 mt-2 mb-[10px] rounded-[10px] h-[55px] w-[100%] max-w-[600px] focus-within:border-white transition-all duration-500ms`}>
                <input
                    className="outline-none bg-black w-[100%] h-[100%] text-white border-[#8b8b8b]"
                    name="bot"
                    placeholder="Pesquise por um bot."
                />
                <button type="submit" >
                    <img src={searchIcon} alt="Search Icon" />
                </button>
            </form>
        </div>
    );
};
