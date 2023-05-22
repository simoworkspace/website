export const Botloading = () => {
    return (
        <div className='grid-cols-3 gap-8 m-2 grid'>
            {Array(6).fill(
                <div className='border-2  border-transparent bg-card-blue rounded-[10px]'>
                    <div className='animate-pulse bg-skeleton-blue w-[100px] h-[100px] float-right rounded-full mt-[10px] mr-[10px]'></div>
                    <div className='animate-pulse bg-skeleton-blue w-[220px] h-[26px] rounded-[10px] flex ml-10'></div>
                    <div className='animate-pulse bg-skeleton-blue w-[280px] h-[72px] mt-3 rounded-[10px] ml-1'></div>
                    <div className='m-[10px]'>
                        <div className='animate-pulse bg-skeleton-blue w-[170px] h-[40px] m-2 rounded-[20px]'></div>
                        <div className='animate-pulse bg-skeleton-blue w-[170px] h-[40px] m-2 rounded-[20px]'></div>
                    </div>
                </div>
            )}
        </div>
    )
};