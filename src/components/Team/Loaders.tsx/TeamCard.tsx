import { FC } from "react";
import { ManageTeamLoading } from "./ManageTeam";

export const TeamCardLoading: FC = () => {
    return (
        <main className="w-screen flex justify-center max-w-[1500px]">
            <section className="w-full flex flex-row text-white items-start xl:items-center justify-start gap-10 xl:flex-col h-full">
                <div className="border-neutral-800 border-2 w-[300px] p-5 xl:w-[90vw] rounded-lg bg-neutral-900 flex items-center justify-center flex-col">
                    <div>
                        <div className="rounded-full w-32 h-32 bg-neutral-800 animate-pulse"></div>
                    </div>
                    <hr className="w-[80%] my-6" />
                    <div className="flex flex-col gap-2 text-center justify-center w-full">
                        <div className="flex gap-2 items-center justify-center">
                            <div className="rounded-full animate-pulse w-36 h-7 bg-neutral-800"></div>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <div className="rounded-full animate-pulse w-11/12 h-7 bg-neutral-800"></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 py-3 px-5">
                        <div className="rounded-full animate-pulse w-24 h-6 bg-neutral-800"></div>
                        <div className="flex flex-wrap gap-2">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <div key={index} className="relative">
                                    <div className="rounded-full w-10 h-10 bg-neutral-800 animate-pulse"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="rounded-full animate-pulse w-11/12 h-6 bg-neutral-800"></div>
                </div>
                <ManageTeamLoading/>
            </section>
        </main>
    )
}