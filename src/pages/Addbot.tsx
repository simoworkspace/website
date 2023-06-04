import { FormAddbot } from "../components/FormAddbot";
import React, { useState } from "react";
import { FormFindBot } from "../components/FormFindBot";
import { StepsForm } from "../components/StepsForm";
import two from "../assets/svg/numbers/two.svg";
import twofill from "../assets/svg/numbers/two-fill.svg";

export const Addbot: React.FC = () => {
    const [verificarBot, setVerificarBot] = useState<boolean>(false);
    const [stepsState, setStepsState] = useState<number>(1);

    return (
        <div className="flex flex-row gap-10 xl:flex-col m-6">
            <div className="flex xl:w-[85vw] w-[23vw] justify-center items-center">
                {stepsState === 1 ? (
                    <StepsForm setStepsState={setStepsState}>
                        <img
                            className="h-[40px] xl:mb-1"
                            src={two}
                            alt="Number two icon"
                        />
                    </StepsForm>
                ) : (
                    <StepsForm setStepsState={setStepsState}>
                        <img
                            className="h-[40px] xl:mb-1"
                            src={twofill}
                            alt="Number two icon"
                        />
                    </StepsForm>
                )}
            </div>
            <div
                className={`flex self-center xl:w-[90vw] ${
                    stepsState === 2 && "xl:h-[1700px]"
                } xl:h-[300px] w-[70vw] h-[100%]`}
            >
                <div className="flex p-3 rounded-3xl justify-center items-center h-[100%] w-[100%] bg-neutral-900 shadow-md shadow-black text-white">
                    {verificarBot ? (
                        <FormAddbot />
                    ) : (
                        <FormFindBot
                            setVerificarBot={setVerificarBot}
                            setStepsState={setStepsState}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Addbot;
