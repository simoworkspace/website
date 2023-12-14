
import { TiArrowSortedUp } from "react-icons/ti";


export const Botloading: React.FC<{ fills: number, grid?: boolean }> = ({ fills, grid }) => {
    return grid ? (
        <>
            {Array(fills).fill(
                <div className={`bg-neutral-900 w-full rounded-lg p-3 transition-colors border-[#1d1d1d] border-2 flex flex-col gap-3 xl:w-[95vw]`}>
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full w-12 h-12 animate-pulse bg-neutral-800"></div>
                            <div className="flex gap-2 flex-col">
                                <div className="h-6 w-24 bg-neutral-800 animate-pulse rounded-full"></div>
                                <div className="flex">
                                    <TiArrowSortedUp fill="#fff" size={20} />
                                    <div className="animate-pulse bg-neutral-800 h-4 w-6 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 flex-col">
                            <div className="flex flex-col gap-2">
                                <div className="bg-neutral-800 animate-pulse h-5 w-full rounded-full"></div>
                                <div className="bg-neutral-800 animate-pulse h-5 w-3/5 rounded-full"></div>
                            </div>
                            <div className="flex flex-row gap-1 flex-wrap">
                                <div className="bg-neutral-800 border-neutral-700 py-4 px-8 rounded-lg border-2 animate-pulse"></div>
                                <div className="bg-neutral-800 border-neutral-700 py-4 px-12 rounded-lg border-2 animate-pulse"></div>
                                <div className="bg-neutral-800 border-neutral-700 py-4 px-6 rounded-lg border-2 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full">
                        <div className="flex w-full flex-grow">
                            <div className="animate-pulse text-center border-2 border-neutral-700 h-[52px] transition-all duration-300 p-3 rounded-lg w-full bg-neutral-800"></div>
                        </div>
                        <div>
                            <div className="animate-pulse text-center border-2 border-neutral-700 h-[52px] transition-all duration-300p-3 rounded-lg px-5 flex gap-2 items-center justify-center w-full bg-neutral-800 text-neutral-800">dsajkdalj</div>
                        </div>
                    </div>
                </div>
            )}
        </>
    ) : (
        <div className="grid-cols-2 grid gap-3 text-white px-3 xl:w-full xl:grid-cols-1 w-full">
            {Array(fills).fill(
                <div className="bg-neutral-900 w-full rounded-lg p-3 transition-colors border-[#1d1d1d] border-2 flex flex-col gap-3 xl:w-[95vw]">
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-2 items-center">
                            <div className="rounded-full w-12 h-12 animate-pulse bg-neutral-800"></div>
                            <div className="flex gap-2 flex-col">
                                <div className="h-6 w-24 bg-neutral-800 animate-pulse rounded-full"></div>
                                <div className="flex">
                                    <TiArrowSortedUp fill="#fff" size={20} />
                                    <div className="animate-pulse bg-neutral-800 h-4 w-6 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3 flex-col">
                            <div className="flex flex-col gap-2">
                                <div className="bg-neutral-800 animate-pulse h-5 w-full rounded-full"></div>
                                <div className="bg-neutral-800 animate-pulse h-5 w-3/5 rounded-full"></div>
                            </div>
                            <div className="flex flex-row gap-1 flex-wrap">
                                <div className="bg-neutral-800 border-neutral-700 py-4 px-8 rounded-lg border-2 animate-pulse"></div>
                                <div className="bg-neutral-800 border-neutral-700 py-4 px-12 rounded-lg border-2 animate-pulse"></div>
                                <div className="bg-neutral-800 border-neutral-700 py-4 px-6 rounded-lg border-2 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 w-full">
                        <div className="flex w-full flex-grow">
                            <div className="animate-pulse text-center border-2 border-neutral-700 h-[52px] transition-all duration-300 p-3 rounded-lg w-full bg-neutral-800"></div>
                        </div>
                        <div>
                            <div className="animate-pulse text-center border-2 border-neutral-700 h-[52px] transition-all duration-300p-3 rounded-lg px-5 flex gap-2 items-center justify-center w-28 bg-neutral-800 text-neutral-800"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};
