import axios, { AxiosResponse } from "axios";
import { BotStructure, UserStructure, VoteStructure, DiscordUser, Snowflake, FeedbackStructure, NotificationStructure, NotificationBody, NotificationType, StatusStrucuture } from "../../types";
import Cookies from "js-cookie";

const header = {
    headers: {
        Authorization: Cookies.get("discordUser")
    },
};

const api = {
    getAllBots: async (startAt?: number, endAt?: number): Promise<AxiosResponse<BotStructure[]>> => {
        
        let res:Array[] = (await axios.get(`/api/bots?startAt=`, header);
        res.sort
    },
    getUserData: async (): Promise<AxiosResponse<UserStructure>> => {
        return axios.get("/api/auth/user", { ...header, withCredentials: true });
    },
    getToken: async (): Promise<string> => {
        return (await axios.get("/api/auth/token")).data.token;
    },
    getDiscordUser: async (userID: string | Snowflake): Promise<AxiosResponse<DiscordUser>> => {
        return axios.get("/api/users/" + userID, header);
    },
    getBotInfos: async (botID: string | Snowflake): Promise<AxiosResponse<BotStructure>> => {
        return axios.get("/api/bots/" + botID, header);
    },
    addBot: async (bodyData: BotStructure, botID: string | Snowflake): Promise<AxiosResponse<BotStructure>> => {
        return axios.post("/api/bots/" + botID, bodyData, header);
    },
    logoutUser: async (): Promise<AxiosResponse> => {
        return axios.get<AxiosResponse>("/api/auth/logout", header);
    },
    voteBot: async (userID: string | Snowflake, botID: string | Snowflake): Promise<AxiosResponse> => {
        return axios.post<AxiosResponse<VoteStructure>>(`/api/bots/${botID}/votes`, { user: userID }, header);
    },
    postFeedback: async (stars: number, posted_at: string, content: string, botID: string | Snowflake, userID: string | Snowflake): Promise<AxiosResponse<FeedbackStructure>> => {
        return axios.post(`/api/bots/${botID}/feedbacks/${userID}`, { stars: stars, posted_at: posted_at, content: content, target_bot: botID }, header);
    },
    deleteFeedback: async (botID: string, userID: string): Promise<AxiosResponse> => {
        return axios.delete(`/api/bots/${botID}/feedbacks/${userID}`, header);
    },
    editFeedback: async (userID: Snowflake | undefined, botID: Snowflake, content: string, stars: number): Promise<AxiosResponse<FeedbackStructure>> => {
        return axios.patch(`/api/bots/${botID}/feedbacks/${userID}`,  { content: content, stars: stars } ,header);
    },
    voteStatus: async (botID: string | Snowflake, userID: string | Snowflake): Promise<AxiosResponse<{ can_vote: boolean; restTime: string; }>> => {
        return axios.get(`/api/bots/${botID}/vote-status/${userID}`, header);
    },
    getBotFeedbacks: async (botID: Snowflake): Promise<AxiosResponse<FeedbackStructure[]>> => {
        return axios.get(`/api/bots/${botID}/feedbacks`, header);
    },
    getNotifications: async (userId: Snowflake | undefined): Promise<AxiosResponse<NotificationStructure>> => {
        return axios.get(`/api/users/${userId}/notifications`, header);
    },
    deleteNotification: async (userId: Snowflake | undefined, notificationId: string): Promise<AxiosResponse> => {
        return axios.delete(`/api/users/${userId}/notifications/${notificationId}`, header);
    },
    deleteAllNotifications: async (userId: Snowflake | undefined): Promise<AxiosResponse> => {
        return axios.delete(`/api/users/${userId}/notifications/bulk-delete`, header);
    },
    createNotification: async (userId: Snowflake | undefined, body: { content: string, type: NotificationType, url?: string }): Promise<AxiosResponse> => {
        return axios.post(`/api/users/${userId}/notifications`, body, header);
    },
    getApiStatus: async (): Promise<AxiosResponse<StatusStrucuture>> => {
        return axios.get("/api/status");
    }
};

export default api;
