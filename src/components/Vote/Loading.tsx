import React from "react";

export const VoteLoading: React.FC = () => {
    return (
        <section className="text-white p-3 w-screen flex flex-col items-center justify-center">
            <div className="flex flex-row p-3 rounded-lg items-center gap-3">
                <figure className="w-[100px] h-[100px] rounded-full bg-neutral-900 animate-pulse" />
                <div>
                    <h1 className="bg-neutral-900 w-[300px] h-[40px] rounded-full animate-pulse"></h1>
                    <div className="bg-neutral-900 w-[100px] h-[20px] rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
            <div className="flex w-[60vw] h-[80px] flex-row rounded-lg items-center bg-neutral-900 animate-pulse"></div>
        </section>
    );
};