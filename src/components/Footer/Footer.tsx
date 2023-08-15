import React from "react";

export const Footer: React.FC = () => {
    return (
        <footer className="border-t-[1px] border-[#8b8b8b] w-[100%] h-[90px] text-white flex items-center">
            <div className="text-white flex flex-col text-[32px] mx-10 my-3">
                <strong>Simo</strong>
                <span className="text-[18px] text-[#c5c5c5]">Uma botlist muito daora e bonita</span>
            </div>
            <section className="flex flex-row items-center justify-end flex-grow mx-10 my-3">
                <div className="flex flex-col">
                    <h1 className="text-[18px]"><strong>Links</strong></h1>
                    <div className="text-[#c5c5c5] transition-colors duration-300 hover:text-white">
                        <button>Discord</button>
                    </div>
                </div>
            </section>
        </footer>
    )
};