import axios, { AxiosResponse } from "axios";
import {
    BotStructure,
    UserStructure,
    VoteStructure,
    botDataStructure,
    DiscordUser,
    Snowflake
} from "../types";

const header = {
    headers: {
        Authorization: import.meta.env.VITE_API_KEY as string,
    },
};

const api = {
    getAllBots: async () => {
        const res: AxiosResponse = await axios.get<AxiosResponse<BotStructure[]>>("/api/bots", header).catch();
        return res;
    },
    getUserData: async () => {
        const res: AxiosResponse = await axios.get<AxiosResponse<UserStructure>>("/api/auth/user", { ...header, withCredentials: true });
        return res;
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
    },
    logoutUser: async () => {
        const res = axios.get<AxiosResponse>("/api/auth/logout", header);
        return res;
    },
    voteBot: async (userID: string | Snowflake, botID: string | Snowflake) => {
        const res = axios.post("/api/bots/" + botID, { ...header, body: JSON.stringify({ user: userID })  });
        return res;
    }
};

export default api;