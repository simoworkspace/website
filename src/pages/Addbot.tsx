import { FormAddbot } from "../components/FormAddbot";
import React, { useState } from "react";
import { FormFindBot } from "../components/FormFindBot";
import one from "../assets/svg/numbers/one.svg";
import onefill from "../assets/svg/numbers/one-fill.svg";
import two from "../assets/svg/numbers/two.svg";
import twofill from "../assets/svg/numbers/two-fill.svg";

// bg-gradient-to-br from-[#131720] from-[40%] to-[#0c0c0c] to-[80%]

export const Addbot: React.FC = () => {
    const [verificarBot, setVerificarBot] = useState(false);

    return (
        <div className="flex flex-row gap-10 xl:flex-col backdrop-filter m-6">
            <div className="flex justify-start xl:w-[90vw] xl:h-[100px] w-[30vw] h-[60vh]">
                <div className="flex gap-2 flex-col rounded-3xl h-[100%] w-[100%] justify-center items-center bg-neutral-900 shadow-md shadow-black text-white">
                    <div className="flex text-xl mb-10 xl:mb-0">
                        <strong>Etapas</strong>
                    </div>
                    <div className="flex flex-col xl:h-[50px] items-center xl:flex-row">
                        <img
                            className="h-[40px] xl:mb-1"
                            src={onefill}
                            alt="Number one icon"
                        />
                        <hr className="h-[30px] m-5 xl:m-0 xl:mx-8 xl:rotate-90 w-[2px] bg-white" />
                        <img
                            className="h-[40px] xl:mb-1"
                            src={two}
                            alt="Number two icon"
                        />
                    </div>
                </div>
            </div>
            <div className="flex self-center xl:w-[90vw] xl:h-[300px] w-[70vw] h-[100%]">
                <div className="flex rounded-3xl justify-center items-center h-[100%] w-[100%] bg-neutral-900 shadow-md shadow-black text-white">
                    {verificarBot ? (
                        <FormAddbot />
                    ) : (
                        <FormFindBot setVerificarBot={setVerificarBot} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Addbot;
