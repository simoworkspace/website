type Snowflake = string;

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
    owners: Snowflake[] | string;
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
    avatar: string
  };