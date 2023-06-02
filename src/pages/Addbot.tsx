import { FormAddbot } from "../components/FormAddbot";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosResponse } from "axios";

export const Addbot: React.FC = () => {
    const [verificarBot, setVerificarBot] = useState<boolean>();
    const [id, setId] = useState<string>("");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setId(event.target.value);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        const res: AxiosResponse = await axios.get(
            `${import.meta.env.VITE_API_URL}/bot/${id}/discord`,
            {
                headers: {
                    Authorization: import.meta.env.VITE_API_KEY as string,
                },
            }
        );
        res.data?.bot ? setVerificarBot(true) : setVerificarBot(false)
    };

    return verificarBot ? (
        <div>
            <div>
                <FormAddbot />
            </div>
        </div>
    ) : (
        <div className="text-white">
            <form onSubmit={handleSubmit}>
                <input
                    className="text-black"
                    type="text"
                    onChange={handleInputChange}
                />
                <button type="submit">Encontrar bot</button>
                {!verificarBot ? ( <div>coiso invalido</div> ) : <div></div> }
            </form>
        </div>
    );
};

export default Addbot;
