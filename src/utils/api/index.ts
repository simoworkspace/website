import axios, { AxiosResponse } from "axios";
import { BotStructure, UserStructure, VoteStructure, DiscordUser, Snowflake } from "../../types";
import Cookies from "js-cookie";

const header = {
    headers: {
        Authorization: Cookies.get("discordUser")
    },
};

const api = {
    getAllBots: async (): Promise<AxiosResponse> => {
        const res: AxiosResponse = await axios.get<AxiosResponse<BotStructure[]>>("/api/bots", header);
        return res;
    },
    getUserData: async (): Promise<AxiosResponse> => {
        const res: AxiosResponse = await axios.get<AxiosResponse<UserStructure>>("/api/auth/user", { ...header, withCredentials: true });
        return res;
    },
    getToken: async (): Promise<string> => {
        const res: AxiosResponse<{ token: string }> = await axios.get("/api/auth/token");
        return res.data.token;
    },
    getDiscordUser: async (userID: string | Snowflake): Promise<AxiosResponse> => {
        const res: AxiosResponse = await axios.get<AxiosResponse<DiscordUser>>("/api/users/" + userID, header);
        return res;
    },
    getBotInfos: async (botID: string | Snowflake): Promise<AxiosResponse> => {
        const res: AxiosResponse = await axios.get<AxiosResponse<BotStructure>>("/api/bots/" + botID, header);
        return res;
    },
    addBot: async (bodyData: BotStructure, botID: string | Snowflake): Promise<AxiosResponse> => {
        const res = axios.post<AxiosResponse<BotStructure>>("/api/bots/" + botID, bodyData, header);
        return res;
    },
    logoutUser: async (): Promise<AxiosResponse> => {
        const res: AxiosResponse = await axios.get<AxiosResponse>("/api/auth/logout", header);
        return res;
    },
    voteBot: async (userID: string | Snowflake, botID: string | Snowflake): Promise<AxiosResponse> => {
        const voteProps: { user: string } = {
            user: userID,
        }
        const res: AxiosResponse = await axios.post<AxiosResponse<VoteStructure>>(`/api/bots/${botID}/votes`, voteProps, header);
        return res;
    },
    postFeedback: async (stars: number, postedAt: string, content: string, botID: string | Snowflake, userID: string | Snowflake): Promise<AxiosResponse> => {
        const feedbackProps: { stars: number, postedAt: string, content: string } = {
            stars: stars,
            postedAt: postedAt,
            content: content
        };
        const res: AxiosResponse = await axios.post(`/api/bots/${botID}/feedbacks/${userID}`, feedbackProps, header);
        return res;
    },
    verifyBotExists: async (botID: Snowflake | string): Promise<AxiosResponse> => {
        const res: AxiosResponse = await axios.get(`/api/bots/${botID}/exists`, header);
        return res;
    },
    voteStatus: async (botID: string | Snowflake, userID: string | Snowflake): Promise<AxiosResponse> => {
        const res: AxiosResponse = await axios.get<AxiosResponse>(`/api/bots/${botID}/vote-status/${userID}`, header);
        return res;
    },
    searchBot: async (botName: string): Promise<AxiosResponse> => {
        const res: AxiosResponse = await axios.get(`/api/bots?name=${botName}`, header);
        return res;
    }
};

export default api;