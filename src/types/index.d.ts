type Snowflake = string;

export interface BotType {
    _id: Snowflake;
    name: string;
    avatar: string;
    botInviteURL: string;
    websiteURL: string;
    supportServer: string;
    sourceCode: string;
    description: string;
    longDescription: string;
    prefix: string[] | string;
    owners: Snowflake[] | string;
    creationTimestamp: number;
    verifiedBot: boolean;
    tags: string[];
};