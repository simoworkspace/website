import React from "react";

export const VoteLoading: React.FC = () => {
    return (
        <section className="text-white p-3 w-screen flex flex-col items-center justify-center">
            <div className="flex flex-row rounded-lg items-center gap-3 max-w-[900px] xl:text-center xl:flex-col xl:w-[80vw] p-4 justify-center">
                <figure className="w-[100px] h-[100px] rounded-full bg-neutral-900 animate-pulse" />
                <div>
                    <h1 className="bg-neutral-900 w-[300px] h-[40px] rounded-full animate-pulse"></h1>
                    <div className="bg-neutral-900 w-[100px] h-[20px] rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
            <div className="animate-pulse flex xl:flex-col border-2 xl:w-full xl:justify-center xl:items-center xl:h-full w-full h-[80px] flex-row rounded-lg items-center bg-neutral-900 max-w-[1500px] border-neutral-800 p-6 xl:gap-4">
                <div className="flex flex-grow">
                    <div className="animate-pulse bg-neutral-800 rounded-full h-6 w-60"></div>
                </div>
                <div className="animate-pulse bg-neutral-800 rounded-lg h-12 w-24"></div>
            </div>
        </section>
    );
};