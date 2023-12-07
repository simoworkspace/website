import { useState } from "react";
import { FormAddbot } from "./FormAddbot";
import { FindBot } from "./FindBot";
import { FindBotStructure } from "../../types";
import { FinishAddbot } from "./FinishAddbot";

export const AddbotComponent: any = () => {
    const [steps, setSteps] = useState<number>(0);
    const [botData, setBotData] = useState<FindBotStructure>();

    switch (steps) {
        case 0: return <FindBot setSteps={setSteps} setBotData={setBotData} botData={botData} />;
        case 1: return <FormAddbot botData={botData} setSteps={setSteps} />;
        case 2: return <FinishAddbot botData={botData} />;
    };
};