export const Botloading: React.FC<{ fills: number }> = ({ fills }) => {
    return (
        <div className="grid-cols-2 gap-8 m-2 grid xl:grid-cols-1">
            {Array(fills).fill(
                <div className="border-2 bg-card-blue rounded-[10px] bg-neutral-950">
                    <div className="bg-neutral-900 xl:w-[80px] xl:h-[80px] w-[100px] h-[100px] float-right rounded-full mt-[10px] mr-[10px] self-center"></div>
                    <div className="bg-neutral-900 xl:w-[200px] w-[220px] h-[26px] rounded-[10px] flex ml-20"></div>
                    <div className="bg-neutral-900 xl:w-[250px] w-[70%] h-[72px] mt-3 rounded-[10px] ml-3"></div>
                    <div className="m-[10px] flex ">
                        <div className="bg-neutral-900 w-[170px] h-[40px] m-2 rounded-[20px]"></div>
                        <div className="bg-neutral-900 w-[170px] h-[40px] m-2 rounded-[20px]"></div>
                    </div>
                </div>
            )}
        </div>
    );
};
