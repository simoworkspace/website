import axios, { AxiosResponse } from "axios";
import { BotStructure, UserStructure, VoteStructure, DiscordUser, Snowflake, FeedbackStructure } from "../../types";
import Cookies from "js-cookie";

const header = {
    headers: {
        Authorization: Cookies.get("discordUser")
    },
};

const api = {
    getAllBots: async (): Promise<AxiosResponse> => {
        return axios.get<AxiosResponse<BotStructure[]>>("/api/bots", header);
    },
    getUserData: async (): Promise<AxiosResponse> => {
        return axios.get<AxiosResponse<UserStructure>>("/api/auth/user", { ...header, withCredentials: true });
    },
    getToken: async (): Promise<string> => {
        const res: AxiosResponse<{ token: string }> = await axios.get("/api/auth/token");
        return res.data.token;
    },
    getDiscordUser: async (userID: string | Snowflake): Promise<AxiosResponse> => {
        return axios.get<AxiosResponse<DiscordUser>>("/api/users/" + userID, header);
    },
    getBotInfos: async (botID: string | Snowflake): Promise<AxiosResponse> => {
        return axios.get<AxiosResponse<BotStructure>>("/api/bots/" + botID, header);
    },
    addBot: async (bodyData: BotStructure, botID: string | Snowflake): Promise<AxiosResponse> => {
        return axios.post<AxiosResponse<BotStructure>>("/api/bots/" + botID, bodyData, header);
    },
    logoutUser: async (): Promise<AxiosResponse> => {
        return axios.get<AxiosResponse>("/api/auth/logout", header);
    },
    voteBot: async (userID: string | Snowflake, botID: string | Snowflake): Promise<AxiosResponse> => {
        const voteProps: { user: string } = {
            user: userID,
        }
        return axios.post<AxiosResponse<VoteStructure>>(`/api/bots/${botID}/votes`, voteProps, header);
    },
    postFeedback: async (stars: number, posted_at: string, content: string, botID: string | Snowflake, userID: string | Snowflake): Promise<AxiosResponse> => {
        const feedbackProps = {
            stars: stars,
            posted_at: posted_at,
            content: content,
            target_bot: botID
        };
        return axios.post(`/api/bots/${botID}/feedbacks/${userID}`, feedbackProps, header);
    },
    deleteFeedback: async (botID: string, userID: string): Promise<AxiosResponse> => {
        return axios.delete(`/api/bots/${botID}/feedbacks/${userID}`, header);
    },
    editFeedback: async (userID: Snowflake | undefined, botID: Snowflake, content: string, stars: number): Promise<AxiosResponse> => {
        return axios.patch(`api/bots/${botID}/feedbacks/${userID}`,  { content: content, stars: stars } ,header);
    },
    voteStatus: async (botID: string | Snowflake, userID: string | Snowflake): Promise<AxiosResponse> => {
        return axios.get<AxiosResponse>(`/api/bots/${botID}/vote-status/${userID}`, header);
    },
    searchBot: async (botName: string): Promise<AxiosResponse> => {
        return axios.get(`/api/bots?name=${botName}`, header);
    },
    getBotFeedbacks: async (botID: Snowflake): Promise<AxiosResponse<FeedbackStructure[]>> => {
        return axios.get<FeedbackStructure[]>(`/api/bots/${botID}/feedbacks`, header);
    }
};

export default api;