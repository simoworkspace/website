import React, { useState } from "react";
import { FormAddbot } from "./FormAddbot";
import { FindBot } from "./FindBot";
import { UserStructure } from "../../types";

export const AddbotComponent: React.FC = () => {
    const [steps, setSteps] = useState<number>(0);
    const [botData, setBotData] = useState<UserStructure>();
    
    return steps === 0 ? <FindBot setSteps={setSteps} setBotData={setBotData} botData={botData}/> : <FormAddbot/> ;
};