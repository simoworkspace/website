import rawBots from "../data/bots.json";
import rawUsers from "../data/users.json";
import rawFeedbacks from "../data/feedbacks.json";
import rawTeams from "../data/teams.json";
import rawAuditLogs from "../data/auditlogs.json";

import {
	BotStructure,
	UserStructure,
	FeedbackStructure,
	Team,
	AuditLogStructure,
	TeamMember,
	VoteStructure,
	StatusStrucuture,
	NotificationStructure,
	NotificationType,
} from "../../types";

const allUsers: UserStructure[] = (rawUsers as any[]).map((u) => ({
	...u,
	id: u._id ?? u.id,
	notifications: u.notifications ?? {},
	notifications_viewed: u.notifications_viewed ?? false,
	flags: u.flags ?? 0,
	bio: u.bio ?? null,
	banner_url: u.banner_url ?? null,
}));

export const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];

const delay = (ms = 120) => new Promise((r) => setTimeout(r, ms));

function ok<T>(data: T) {
	return {
		data,
		status: 200,
		statusText: "OK",
		headers: {},
		config: {} as any,
	};
}

function notFound(msg = "Not found") {
	return Promise.reject({ response: { status: 404, data: { message: msg } } });
}

const bots: BotStructure[] = (rawBots as any[]).map((b) => ({
	...b,
	id: b._id ?? b.id,
	votes: (b.votes ?? []).map((v: any) => ({
		user: v.user_id ?? v.user,
		votes: v.votes,
		last_vote: v.last_vote,
	})) as VoteStructure[],
}));

const users: UserStructure[] = (rawUsers as any[]).map((u) => ({
	...u,
	id: u._id ?? u.id,
	notifications: u.notifications ?? {},
	notifications_viewed: u.notifications_viewed ?? false,
	flags: u.flags ?? 0,
	bio: u.bio ?? null,
	banner_url: u.banner_url ?? null,
}));

const feedbacks: FeedbackStructure[] = (rawFeedbacks as any[]).map((f) => ({
	...f,
	author: (() => {
		const author = users.find((u) => u.id === f.author_id);
		return author
			? { id: author.id, avatar: author.avatar, username: author.username }
			: { id: f.author_id, avatar: "", username: "Usuário" };
	})(),
	reply_message: f.reply_message ?? {},
	target_bot: f.target_bot_id ?? f.target_bot,
}));

const teams: Team[] = (rawTeams as any[]).map((t) => ({
	...t,
	id: t.id ?? t._id?.$oid,
	members: (t.members ?? []).map((m: any): TeamMember => {
		const u = users.find((u) => u.id === m.id);
		return {
			id: m.id,
			permission: m.permission,
			joined_at: m.joined_at,
			avatar: u?.avatar ?? "",
			username: u?.username ?? "Usuário",
		};
	}),
}));

const api = {
	getAllBots: async (startAt?: number, endAt?: number) => {
		await delay();
		const start = startAt ?? 0;
		const end = endAt ?? bots.length;
		return ok(bots.filter((b) => b.approved).slice(start, end));
	},

	getBotInfos: async (botID: string) => {
		await delay();
		const bot = bots.find((b) => b.id === botID);
		return bot ? ok(bot) : notFound(`Bot ${botID} não encontrado`);
	},

	getUserBots: async () => {
		await delay();
		const userBots = bots.filter((b) => b.owner_id === randomUser.id);
		return ok(userBots.length > 0 ? userBots : bots.slice(0, 3));
	},

	addBot: async (_bodyData: BotStructure, _botID: string) => {
		await delay(300);
		return ok({} as BotStructure);
	},

	patchBot: async (_botID: string, _bodyData: BotStructure) => {
		await delay(300);
		return ok({} as BotStructure);
	},

	deleteBot: async (_botID: string) => {
		await delay(300);
		return ok({});
	},

	getUserData: async () => {
		await delay();
		return ok(randomUser);
	},

	getUserFromDB: async (userID: string) => {
		await delay();
		const user = users.find((u) => u.id === userID) ?? users[0];
		return ok(user);
	},

	getDiscordUser: async (userID: string) => {
		await delay();
		const user = users.find((u) => u.id === userID) ?? users[0];
		return ok(user as any);
	},

	patchUser: async (_body: {
		bio?: string | null;
		banner_url?: string | null;
		notifications_viewed?: boolean;
	}) => {
		await delay(300);
		return ok({});
	},

	getToken: async () => {
		return "";
	},

	logoutUser: async () => {
		return ok({});
	},

	getBotFeedbacks: async (botID: string) => {
		await delay();
		const result = feedbacks.filter(
			(f) =>
				(f as any).target_bot === botID || (f as any).target_bot_id === botID,
		);
		return ok(result);
	},

	postFeedback: async (
		_stars: number,
		_posted_at: string,
		_content: string,
		_botID: string,
		_userID: string,
	) => {
		await delay(400);
		return ok({} as FeedbackStructure);
	},

	deleteFeedback: async (_botID: string) => {
		await delay(300);
		return ok({});
	},

	editFeedback: async (_botId: string, _props: FeedbackStructure) => {
		await delay(300);
		return ok({} as FeedbackStructure);
	},

	voteBot: async (_userID: string, _botID: string) => {
		await delay(300);
		return ok({});
	},

	voteStatus: async (_botID: string) => {
		await delay();
		return ok({ can_vote: false, rest_time: 43200 });
	},

	getNotifications: async () => {
		await delay();
		return ok({} as NotificationStructure);
	},

	deleteNotification: async (
		_userId: string | undefined,
		_notificationId: string,
	) => {
		await delay(200);
		return ok({});
	},

	deleteAllNotifications: async (_userId: string | undefined) => {
		await delay(200);
		return ok({});
	},

	createNotification: async (
		_userId: string | undefined,
		_body: { content: string; type: NotificationType; url?: string },
	) => {
		await delay(200);
		return ok({});
	},

	getApiStatus: async () => {
		await delay();
		const status: StatusStrucuture = {
			total_mem: 0,
			free_mem: 0,
			users: users.length,
			bots: bots.filter((b) => b.approved).length,
			uptime: 0,
			request_count: 0,
		};
		return ok(status);
	},

	createApiKey: async (_botId: string) => {
		await delay(300);
		return ok({ api_key: "mock-api-key-disabled" });
	},

	getApiKey: async (_botID: string) => {
		await delay();
		return ok({ api_key: "mock-api-key-disabled" });
	},

	getTeam: async (teamID: string) => {
		await delay();
		const team = teams.find((t) => t.id === teamID);
		return team ? ok(team) : notFound(`Time ${teamID} não encontrado`);
	},

	getUserTeams: async () => {
		await delay();
		const userTeams = teams.filter((t) =>
			t.members?.some((m) => m.id === randomUser.id),
		);
		return ok(userTeams.length > 0 ? userTeams : teams.slice(0, 2));
	},

	getTeamBots: async (teamID: string) => {
		await delay();
		const team = teams.find((t) => t.id === teamID);
		if (!team) return notFound();
		const teamBots = bots.filter((b) => (team.bots_id ?? []).includes(b.id));
		return ok(teamBots);
	},

	createTeam: async (_body: Team) => {
		await delay(400);
		return ok({} as Team);
	},

	patchTeam: async (_teamID: string, _body: Team) => {
		await delay(300);
		return ok({} as Team);
	},

	deleteTeam: async (_teamID: string) => {
		await delay(300);
		return ok({} as Team);
	},

	joinTeam: async (_teamID: string, _inviteHash: string) => {
		await delay(400);
		return ok({} as Team);
	},

	leaveTeam: async (_teamID: string) => {
		await delay(300);
		return ok({} as TeamMember);
	},

	transferOnwer: async (_userID: string) => {
		await delay(300);
		return ok({} as Team);
	},

	removeMember: async (_teamID: string, _userID: string) => {
		await delay(300);
		return ok({} as Team);
	},

	patchMember: async (
		_teamID: string,
		_memberID: string,
		_data: { permission?: 0 | 1 },
	) => {
		await delay(300);
		return ok({});
	},

	teamAddBot: async (_params: { teamID: string; botID: string }) => {
		await delay(300);
		return ok({});
	},

	removeBotTeam: async (_params: { teamID: string; botID: string }) => {
		await delay(300);
		return ok({});
	},

	updateTeamInviteCode: async (_teamID: string) => {
		await delay(300);
		return ok({ invite_code: "mock-invite" });
	},

	getAuditLogs: async (teamID: string) => {
		await delay();
		const logs = (rawAuditLogs as any[]).find((l: any) => l.team_id === teamID);
		return logs
			? ok(logs as AuditLogStructure)
			: ok({ team_id: teamID, entries: [] } as AuditLogStructure);
	},
};

export default api;
