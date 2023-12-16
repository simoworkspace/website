type Snowflake = string;

export type Theme = "blue" | "red" | "green" | "black" | "purple" | "christmas";

export interface ThemeContextProps {
    color: Theme;
    changeTheme: (newTheme: Theme) => void;
}

export interface reducerActionType {
    type: string;
    payload: {
        [key: string]: any;
    }
}

interface DiscordWebhookStructure {
    content?: string;
    username?: string;
    avatar_url?: string;
    tts?: boolean;
    embeds?: [{
        title?: string;
        description?: string;
        color?: number;
        thumbnail?: {
            url: string;
        }
        fields?: {
            name: string;
            value: string;
            inline?: boolean;
        }[]
    }]
}

export interface FindBotStructure {
    username: string;
    id: Snowflake | string;
    avatar: string;
    created_at: string;
    discord_date: number
    verified: boolean;
}

export interface FeedbackStructure {
    author?: {
        id?: string;
        avatar?: string;
        username?: string;
    }
    author_id?: string;
    reply_message: {
        content?: string;
        posted_at?: string;
        edited?: boolean;
    };
    stars?: number;
    posted_at?: string;
    content?: string;
    edited?: boolean;
}

export interface ThemeStructure {
    blue: string,
    green: string,
    red: string,
    purple: string,
    black: string
    christmas: string
}

export interface botDataStructure {
    id: Snowflake | string;
    username?: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    bot: boolean;
    flags: number;
    banner: object | string;
    accent_color: object | string;
    global_name: object | string;
    avatar_decoration: object | number;
    display_name: object | string;
    banner_color: object | string;
}

export interface BotStructure {
    _id: Snowflake;
    name: string;
    avatar: string;
    invite_url: string;
    website_url: string;
    support_server: string;
    source_code: string;
    short_description: string;
    long_description: string;
    prefixes: string[];
    owner_id: string;
    created_at: string;
    verified: boolean;
    tags: string[];
    team_id?: string;
    approved: boolean;
    votes: VoteStructure[];
    vote_message?: string;
    webhook_url?: string
}

export interface VoteStructure {
    votes: number;
    user: Snowflake;
    last_vote: string;
}

export interface UserStructure {
    notifications_viewed: boolean
    notifications: Map<string, NotificationBody>;
    username: string;
    flags: UserFlags
    banner_url: string | null;
    _id: Snowflake | string;
    avatar: string;
    bio: string | null;
}

interface Locales {
    id?: string;
    da?: string;
    de?: string;
    "en-GB"?: string;
    UK?: string;
    "en-US"?: string;
    US?: string;
    "es-ES"?: string;
    fr?: string;
    hr?: string;
    it?: string;
    lt?: string;
    hu?: string;
    nl?: string;
    no?: string;
    pl?: string;
    "pt-BR"?: string;
    ro?: string;
    fi?: string;
    "sv-SE"?: string;
    vi?: string;
    tr?: string;
    cs?: string;
    el?: string;
    bg?: string;
    ru?: string;
    uk?: string;
    hi?: string;
    th?: string;
    "zh-CN"?: string;
    ja?: string;
    "zh-TW"?: string;
    ko?: string;
}

enum DiscordNitroType {
    None,
    NitroClassic,
    Nitro,
    NitroBasic
}
export interface DiscordUser extends UserStructure {
    id: Snowflake
    discriminator: string;
    bot?: boolean;
    system?: boolean;
    mfa_enabled?: boolean;
    banner: string | null;
    accent_color?: string;
    locale?: keyof Locales;
    verified: boolean;
    email?: string;
    flags: UserFlags;
    premium_type: DiscordNitroType;
    public_flags: UserFlags;
    global_name: string | null;
    display_name: string | null;
    banner_color: string | null;
}

export interface NotificationStructure {
    [key: string]: NotificationBody
}

export interface NotificationBody {
    content: string;
    sent_at: number;
    url?: string;
    type: NotificationType;
}

export enum NotificationType {
    Comment,
    ApprovedBot,
    RefusedBot,
    Mixed
}

export interface StatusStrucuture {
    total_mem: number;
    free_mem: number
    users: number;
    bots: number;
    uptime: number;
    request_count: number;
}

export interface Team {
    members?: TeamMember[];
    id?: string;
    name: string;
    invite_code?: string;
    avatar_url: string;
    description: string | null;
    bots_id?: Snowflake[];
}

export interface TeamMember {
    id: Snowflake;
    avatar: string;
    username: string;
    permission?: TeamPermissions;
}

export enum TeamPermissions {
    Administrator,
    ReadOnly,
    Owner
}

export interface ErrorStructure {
    message?: string;
    show: boolean;
    title?: string;
}

export interface AuditLogStructure {
    team_id: string;
    entries: AuditLogEntryStructure[];
}

export interface AuditLogEntryStructure {
    executor: {
        _id: Snowflake;
        username: string;
        avatar: string;
    }
    target: {
        username: string
    } | null
    created_at: string;
    id: string;
    action_type: AuditLogActionType;
    changes: AnyAuditLogChange[];
}

export enum AuditLogActionType {
    /**
     * Member was added in a team
     */
    MemberAdd,
    /**
     * Member was removed in a team
     */
    MemberRemove,
    /**
     * Member was updated in a team
     */
    MemberUpdate,

    /**
     * Ownership of a team has been transferred
     */
    TeamOwnershipTransfer,
    /**
     * Team settings were updated
     */
    TeamUpdate,

    /**
     * Bot was added to a team
     */
    BotAdd,
    /**
     * Bot was removed in a team
     */
    BotRemove,

    /**
     * Invite was updated
     */
    InviteUpdate,
    
    MemberAutoKick
}

export type AnyAuditLogChange =
    | AuditLogInviteUpdateChange
    | AuditLogBotAddChange
    | AuditLogBotRemoveChange
    | AuditLogTeamUpdateChange
    | AuditLogMemberAddChange
    | AuditLogMemberRemoveChange
    | AuditLogMemberUpdateChange
    | AuditLogTeamOwnershipTransferChange;

export type AuditLogMemberAddChange = BaseAuditLogChange<never, never>;
export type AuditLogMemberRemoveChange = AuditLogMemberAddChange;

export type AuditLogMemberUpdateChange = BaseAuditLogChange<
    "permission",
    TeamPermissions
>;

export type AuditLogTeamOwnershipTransferChange = BaseAuditLogChange<
    "id",
    Snowflake
>;

export type AuditLogTeamUpdateChange = BaseAuditLogChange<
    "name" | "description" | "avatar_url" | "vanity_url",
    string
>;

export type AuditLogBotAddChange = BaseAuditLogChange<"bot_id", Snowflake>;
export type AuditLogBotRemoveChange = AuditLogBotAddChange;

export type AuditLogInviteUpdateChange = BaseAuditLogChange<
    "invite_code",
    string
>;

export type BaseAuditLogChange<Key, Data> = {
    changed_key: Key;
    old_value: Data;
    new_value?: Data;
};

export enum UserFlags {
    BugHunter,
    Contributor,
    PremiumPartner,
    Developer,
}

export enum PremiumType {
    None,
    Basic,
    Advanced,
}