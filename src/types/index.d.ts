type Snowflake = string;

export type Theme = "blue" | "red" | "green" | "black" | "purple";

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

export interface FeedbackStructure {
    author: {
        id: string;
        avatar: string;
        username: string;
    }
    stars: number;
    postedAt: string;
    content: string;
}

export interface ThemeStructure {
    blue: string,
    green: string,
    red: string,
    purple: string,
    black: string
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
    inviteURL: string;
    websiteURL: string;
    supportServer: string;
    sourceCode: string;
    shortDescription: string;
    longDescription: string;
    prefix: string[] | string;
    owners: Snowflake[];
    createdAt: string;
    verifiedBot: boolean;
    tags: string[];
    approved: boolean;
    votes: VoteStructure[];
}

export interface VoteStructure {
    votes: number;
    user: Snowflake;
    lastVote: string;
}

export interface UserStructure {
    username: string;
    id: Snowflake | string;
    avatar: string;
};

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

/** Represents Discord user flags */

enum UserFlags {
    Staff = 1 << 0,
    Partner = 1 << 1,
    Hypesquad = 1 << 2,
    BugHunterLevel1 = 1 << 3,
    HypesquadOnlineHouse1 = 1 << 6,
    HypesquadOnlineHouse2 = 1 << 7,
    HypesquadOnlineHouse3 = 1 << 8,
    PremiumEarlySupporter = 1 << 9,
    TeamPseudoUser = 1 << 10,
    BugHunterLevel2 = 1 << 14,
    VerifiedBot = 1 << 16,
    VerifiedDeveloper = 1 << 17,
    CertifiedModeration = 1 << 18,
    BotHTPPInteractions = 1 << 19,
    ActiveDeveloper = 1 << 22
}

enum DiscordNitroType {
    None,
    NitroClassic,
    Nitro,
    NitroBasic
}
export interface DiscordUser extends UserStructure {
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