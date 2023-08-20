import React, { useState } from "react";
import { FormAddbot } from "./FormAddbot";
import { FindBot } from "./FindBot";

export const AddbotComponent: React.FC = () => {
    const [steps, setSteps] = useState<number>(0);

    return steps === 0 ? <FindBot setSteps={setSteps}/> : <FormAddbot/> ;
};