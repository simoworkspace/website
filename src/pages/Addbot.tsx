import { FormAddbot } from "../components/FormAddbot";
import React, { useState } from "react";
import { FormFindBot } from "../components/FormFindBot";

export const Addbot: React.FC = () => {
    const [verificarBot, setVerificarBot] = useState(false);

    return verificarBot ? (
        <FormAddbot />
    ) : (
        <FormFindBot setVerificarBot={setVerificarBot} />
    );
};

export default Addbot;
