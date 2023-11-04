import axios, { Axios, AxiosResponse } from "axios";
import { BotStructure, UserStructure, VoteStructure, DiscordUser, Snowflake, FeedbackStructure, NotificationStructure, NotificationBody, NotificationType, StatusStrucuture } from "../../types";
import Cookies from "js-cookie";

const header = {
    headers: {
        Authorization: Cookies.get("discordUser")
    },
};

const api = {
    getAllBots: (startAt?: number, endAt?: number): Promise<AxiosResponse<BotStructure[]>> => {
        return axios.get(`/api/bots?startAt=${startAt}&endAt=${endAt}`, header);
    },
    getUserData: (): Promise<AxiosResponse<UserStructure>> => {
        return axios.get("/api/auth/user", { ...header, withCredentials: true });
    },
    getToken: (): Promise<string> => {
        return axios.get("/api/auth/token");
    },
    getDiscordUser: (userID: string | Snowflake): Promise<AxiosResponse<DiscordUser>> => {
        return axios.get("/api/users/" + userID + "/discord", header);
    },
    getBotInfos: (botID: string | Snowflake): Promise<AxiosResponse<BotStructure>> => {
        return axios.get("/api/bots/" + botID, header);
    },
    addBot: (bodyData: BotStructure, botID: string | Snowflake): Promise<AxiosResponse<BotStructure>> => {
        return axios.post("/api/bots/" + botID, bodyData, header);
    },
    patchBot: (botID: Snowflake, bodyData: BotStructure): Promise<AxiosResponse<BotStructure>> => {
        return axios.patch("/api/bots/" + botID, bodyData, header);
    },
    deleteBot: (botID: Snowflake): Promise<AxiosResponse> => {
        return axios.delete("/api/bots/" + botID, header);
    },
    logoutUser: (): Promise<AxiosResponse> => {
        return axios.get<AxiosResponse>("/api/auth/logout", header);
    },
    voteBot: (userID: string | Snowflake, botID: string | Snowflake): Promise<AxiosResponse> => {
        return axios.post<AxiosResponse<VoteStructure>>(`/api/bots/${botID}/votes`, { user: userID }, header);
    },
    postFeedback: (stars: number, posted_at: string, content: string, botID: string | Snowflake, userID: string | Snowflake): Promise<AxiosResponse<FeedbackStructure>> => {
        return axios.post(`/api/bots/${botID}/feedbacks/${userID}`, { stars: stars, posted_at: posted_at, content: content, target_bot: botID }, header);
    },
    deleteFeedback: (botID: string, userID: string): Promise<AxiosResponse> => {
        return axios.delete(`/api/bots/${botID}/feedbacks/${userID}`, header);
    },
    editFeedback: (userID: Snowflake | undefined, botID: Snowflake, content: string, stars: number): Promise<AxiosResponse<FeedbackStructure>> => {
        return axios.patch(`/api/bots/${botID}/feedbacks/${userID}`,  { content: content, stars: stars } ,header);
    },
    voteStatus: (botID: string | Snowflake, userID: string | Snowflake): Promise<AxiosResponse<{ can_vote: boolean; rest_time: number; }>> => {
        return axios.get(`/api/bots/${botID}/vote-status/${userID}`, header);
    },
    getBotFeedbacks: (botID: Snowflake): Promise<AxiosResponse<FeedbackStructure[]>> => {
        return axios.get(`/api/bots/${botID}/feedbacks`, header);
    },
    getNotifications: (userId: Snowflake | undefined): Promise<AxiosResponse<NotificationStructure>> => {
        return axios.get(`/api/users/${userId}/notifications`, header);
    },
    deleteNotification: (userId: Snowflake | undefined, notificationId: string): Promise<AxiosResponse> => {
        return axios.delete(`/api/users/${userId}/notifications/${notificationId}`, header);
    },
    deleteAllNotifications: (userId: Snowflake | undefined): Promise<AxiosResponse> => {
        return axios.delete(`/api/users/${userId}/notifications/bulk-delete`, header);
    },
    createNotification: (userId: Snowflake | undefined, body: { content: string, type: NotificationType, url?: string }): Promise<AxiosResponse> => {
        return axios.post(`/api/users/${userId}/notifications`, body, header);
    },
    getApiStatus: (): Promise<AxiosResponse<StatusStrucuture>> => {
        return axios.get("/api/status");
    },
    createApiKey: (botId: Snowflake): Promise<AxiosResponse<{ api_key: string }>> => {
        return axios.post(`/api/auth/api-key/${botId}`, null, header);
    }
};

export default api;