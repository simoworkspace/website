import axios, { AxiosResponse } from "axios";
import { BotStructure, UserStructure, VoteStructure, DiscordUser, Snowflake, FeedbackStructure, NotificationStructure, NotificationBody, NotificationType, StatusStrucuture, DBUser, Team } from "../../types";
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
        return axios.get(`/api/discord-user/${userID}`, header);
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
    postFeedback: (stars: number, posted_at: string, content: string, botID: Snowflake, userID: Snowflake): Promise<AxiosResponse<FeedbackStructure>> => {
        return axios.post(`/api/bots/${botID}/feedbacks`, { stars: stars, posted_at: posted_at, content: content, target_bot: botID, author_id: userID }, header);
    },
    deleteFeedback: (botID: Snowflake): Promise<AxiosResponse> => {
        return axios.delete(`/api/bots/${botID}/feedbacks`, header);
    },
    editFeedback: (botId: Snowflake, props: FeedbackStructure): Promise<AxiosResponse<FeedbackStructure>> => {
        return axios.patch(`/api/bots/${botId}/feedbacks`, props, header);
    },
    voteStatus: (botID: Snowflake): Promise<AxiosResponse<{ can_vote: boolean; rest_time: number; }>> => {
        return axios.get(`/api/vote-status/${botID}`, header);
    },
    getBotFeedbacks: (botID: Snowflake): Promise<AxiosResponse<FeedbackStructure[]>> => {
        return axios.get(`/api/bots/${botID}/feedbacks`, header);
    },
    getNotifications: (): Promise<AxiosResponse<NotificationStructure>> => {
        return axios.get(`/api/users/notifications`, header);
    },
    deleteNotification: (userId: Snowflake | undefined, notificationId: string): Promise<AxiosResponse> => {
        return axios.delete(`/api/users/notifications/${notificationId}`, header);
    },
    deleteAllNotifications: (userId: Snowflake | undefined): Promise<AxiosResponse> => {
        return axios.delete(`/api/users/notifications/bulk-delete`, header);
    },
    createNotification: (userId: Snowflake | undefined, body: { content: string, type: NotificationType, url?: string }): Promise<AxiosResponse> => {
        return axios.post(`/api/users/notifications`, body, header);
    },
    getApiStatus: (): Promise<AxiosResponse<StatusStrucuture>> => {
        return axios.get("/api/status");
    },
    createApiKey: (botId: Snowflake): Promise<AxiosResponse<{ api_key: string }>> => {
        return axios.post(`/api/auth/api-key/${botId}`, null, header);
    },
    getUserFromDB: (userId: Snowflake): Promise<AxiosResponse<UserStructure>> => {
        return axios.get("/api/users/" + userId, header);
    },
    patchUser: (body: { bio?: string, banner_url?: string; }): Promise<AxiosResponse<{ bio?: string; banner_url?: string }>> => {
        return axios.patch("/api/users", body, header);
    },
    getTeam: (teamID: Snowflake): Promise<AxiosResponse<Team>> => {
        return axios.get("/api/teams/" + teamID, header);
    },
    getUserTeams: (): Promise<AxiosResponse<Team[]>> => {
        return axios.get("/api/teams/@all", header);
    },
    deleteTeam: (): Promise<AxiosResponse<Team>> => {
        return axios.delete("/api/teams", header);
    },
    createTeam: (body: Team): Promise<AxiosResponse<Team>> => {
        return axios.post("/api/teams", body, header);
    },
    patchTeam: (teamID: string, body: Team): Promise<AxiosResponse<Team>> => {
        return axios.patch("/api/teams/" + teamID, body, header);
    },
    joinTeam: (teamID: string, inviteHash: string): Promise<AxiosResponse<Team>> => {
        return axios.put(`/api/teams/${teamID}/${inviteHash}`, null, header);
    },
    transferOnwer: (userID: Snowflake): Promise<AxiosResponse<Team>> => {
        return axios.put(`/api/teams/change-owner/${userID}`, null, header);
    },
    removeMember: (teamID: string, userID: Snowflake): Promise<AxiosResponse<Team>> => {
        return axios.put(`/api/teams/${teamID}/remove-member`, { member_id: userID }, header);
    },
    getTeamBots: (teamID: string): Promise<AxiosResponse<BotStructure[]>> => {
        return axios.get(`/api/teams/${teamID}/bots`, header);
    }
};

export default api;