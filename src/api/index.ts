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
        Authorization: "3fd3113e-4da4-4d5c-b034-9f7e5c6eb740"
    },
};

const api = {
    getAllBots: async () => {
        const res: AxiosResponse = await axios.get<AxiosResponse<BotStructure[]>>("/api/bots", header);
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
        const res = axios.post<AxiosResponse<BotStructure>>("/api/bots/" + botID, bodyData, header);
        return res;
    },
    logoutUser: async () => {
        const res: AxiosResponse = await axios.get<AxiosResponse>("/api/auth/logout", header);
        return res;
    },
    voteBot: async (userID: string | Snowflake, botID: string | Snowflake) => {
        const voteProps: { user: string } ={ 
            user: userID,
        }
        const res: AxiosResponse = await axios.post<AxiosResponse<VoteStructure>>(`/api/bots/${botID}/votes`, voteProps, header);
        return res;
    }
};

export default api;