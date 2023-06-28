import axios, { AxiosResponse } from "axios";
import {
    BotStructure,
    UserStructure,
    VoteStructure,
    botDataStructure,
} from "../types";
const key = import.meta.env.VITE_API_KEY as string;
const header = {
    headers: {
        Authorization: key,
    },
};

const api = {
    getAllBots: async (): Promise<BotStructure[]> => {
        const res: AxiosResponse = await axios.get<AxiosResponse<BotStructure[]>>("/api/bots", header);
        return res.data;
    },
    getUserData: async () => {
        const res: AxiosResponse = await axios.get<AxiosResponse<UserStructure>>("/api/auth/user", { ...header, withCredentials: true });
        return res.data;
    },
};

export default api;