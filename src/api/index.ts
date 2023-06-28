import axios, { AxiosResponse } from "axios";
import {
    BotStructure,
    UserStructure,
    VoteStructure,
    botDataStructure,
    DiscordUser,
    Snowflake
} from "../types";
const key = import.meta.env.VITE_API_KEY as string;
const header = {
    headers: {
        Authorization: key,
    },
};

const api = {
    getAllBots: async () => {
        const res: AxiosResponse = await axios.get<AxiosResponse<BotStructure[]>>("/api/bots", header).catch();
        return res;
    },
    getUserData: async () => {
        const res: AxiosResponse = await axios.get<AxiosResponse<UserStructure>>("/api/auth/user", { ...header, withCredentials: true });
        return res.data;
    },
    getDiscordUser: async (userID: string | Snowflake) => {
        const res: AxiosResponse = await axios.get<AxiosResponse<DiscordUser>>("/api/users/" + userID, header);
        return res;
    },
    getBotInfos: async (botID: string | Snowflake) => {
        const res: AxiosResponse = await axios.get<AxiosResponse<BotStructure>>("/api/bots" + botID, header);
        return res;
    },
    addBot: async (bodyData: BotStructure, botID: string | Snowflake) => {
        const res = axios.post<AxiosResponse<BotStructure>>("/api/bots/" + botID, { ...header, bodyData });
        return res;
    }
};

export default api;