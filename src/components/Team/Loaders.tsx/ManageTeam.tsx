import { FC } from "react";

export const ManageTeamLoading: FC = () => {
    return (
        <div className="flex items-center justify-start h-full w-full flex-col">
            <div className="w-96 xl:w-[80vw] h-8 rounded-full bg-neutral-800"></div>
            <hr className="w-full my-3" />
            <div className="w-full">
            </div>
            <div className="w-full bg-neutral-900 mt-2 border-2 flex-col border-neutral-800 rounded-lg p-4 items-center justify-center gap-10 flex">
                <div className="gap-3 items-center justify-start flex flex-row w-full">
                    <div className="rounded-lg w-24 h-8 bg-neutral-800"></div>
                    <div className="rounded-lg w-28 h-8 bg-neutral-800"></div>
                    <div className="rounded-lg w-36 h-8 bg-neutral-800"></div>
                    <div className="rounded-lg w-36 xl:hidden h-8 bg-neutral-800"></div>
                    <div className="rounded-lg xl:hidden w-32 h-8 bg-neutral-800"></div>
                </div>
                <div className="w-full flex flex-col gap-6 justify-center items-center">
                    <div className="w-full flex justify-center">
                        <div className="rounded-full animate-pulse w-1/2 xl:w-full h-8 bg-neutral-800"></div>
                    </div>
                    <div className="flex gap-4 justify-center w-full flex-col">
                        <div className="flex w-full xl:flex-col xl:gap-2">
                            <div className="flex flex-grow flex-col gap-2 items-start">
                                <div className="rounded-full animate-pulse w-1/4 h-8 bg-neutral-800"></div>
                                <div className="rounded-full animate-pulse w-1/2 h-8 bg-neutral-800"></div>
                            </div>
                            <div className="flex items-center justify-center w-1/3 xl:w-full">
                                <div className="rounded-lg w-full h-14 bg-neutral-800 border-neutral-700 border-2"></div>
                            </div>
                        </div>
                        <div className="flex w-full xl:flex-col xl:gap-2">
                            <div className="flex flex-grow flex-col gap-2 items-start">
                                <div className="rounded-full animate-pulse w-1/4 h-8 bg-neutral-800"></div>
                                <div className="rounded-full animate-pulse w-[40%] h-8 bg-neutral-800"></div>
                            </div>
                            <div className="flex items-center justify-center w-1/3 xl:w-full">
                                <div className="rounded-lg w-full h-14 bg-neutral-800 border-neutral-700 border-2"></div>
                            </div>
                        </div>
                        <div className="flex w-full xl:flex-col xl:gap-2">
                            <div className="flex flex-grow flex-col gap-2 items-start">
                                <div className="rounded-full animate-pulse w-1/6 h-8 bg-neutral-800"></div>
                                <div className="rounded-full animate-pulse w-[30%] h-8 bg-neutral-800"></div>
                            </div>
                            <div className="flex items-center justify-center w-1/3 xl:w-full">
                                <div className="rounded-lg w-full h-14 bg-neutral-800 border-neutral-700 border-2"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full flex-col gap-4">
                        <div className="w-full flex justify-center">
                            <div className="rounded-full animate-pulse w-1/3 xl:w-full h-8 bg-neutral-800"></div>
                        </div>
                        <div className="flex items-center justify-center w-10/12">
                            <div className="rounded-lg w-full h-14 bg-neutral-800 border-neutral-700 border-2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}