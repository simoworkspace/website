import express, { Application, Response, Request } from "express";
import cors from "cors";
import cookieparser from "cookie-parser";
import { config } from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface UserStructure {
    id: string;
    username: string;
    avatar: string;
}

config();

const app: Application = express();

app.use(cors({ origin: "http://localhost:5173" }), cookieparser());

app.get("/auth/(:method(callback|user|logout|cookie))", async (req: Request, res: Response) => {
    const { code } = req.query;
    const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI, SCOPES, REDIRECT_AUTH, AUTH_LINK, JWT_SECRET, AUTH }: NodeJS.ProcessEnv = process.env;

    const data = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "authorization_code",
        code,
        redirect_uri: REDIRECT_URI,
        scope: JSON.parse(SCOPES as string).join(" ")
    };

    if(req.params.method === "cookie") {
        res.cookie('ola', 'oie', { httpOnly: true });
        return res.send('cookie salvado');
    } 

    if (req.params.method === "user") {
        return res.json(req.cookies)
        /*
        try {
            // if (req.headers.authorization !== AUTH) return res.status(UNAUTHORIZED).json({ message: GENERICS.INVALID_AUTH, code: UNAUTHORIZED });
            const userData: string | JwtPayload = jwt.verify(req.cookies.discordUser, JWT_SECRET as string);
            
            return res.json(userData);
        } catch (error: unknown) {
            return res.status(500).json({ message: JSON.stringify(error), code: 500 });
        }
        */
    }

    if (req.params.method === "logout") {
        try {
            if (req.headers.authorization !== AUTH) return res.status(401).json({ message: 'Invalid Auth', code: 401 });
            
            res.clearCookie("discordUser");

            return res.status(200).json({ message: 'Auth Error', code: 200 });
        } catch (error: unknown) {
            return res.status(500).json({ message: 'Auth Error', code: 500 });
        }
    }

    try {
        const req: globalThis.Response = await fetch("https://discord.com/api/v10/oauth2/token", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data as Record<string, string>) });
        const response: { error: string; access_token: string; } = await req.json();

        if (response.error === "invalid_grant") return res.redirect(AUTH_LINK as string);

        const accessToken: string = response.access_token;
        const request: globalThis.Response = await fetch("https://discord.com/api/v10/users/@me", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const { username, id, avatar }: UserStructure = await request.json();
        const sevenDays: 604800000 = 604800000 as const;

        const token: string = jwt.sign({
            data: { username, id, avatar }
        }, JWT_SECRET as string, { expiresIn: sevenDays });

        res.cookie("discordUser", token, { maxAge: sevenDays, httpOnly: false });

        res.redirect(REDIRECT_AUTH as string);
    } catch (error: unknown) {
        console.error(error);

        res.status(500).json({ message: 'Auth Error', code: 'Internal server error' });
    }
});

app.listen(80, () => {
    console.log("api online na porta 80");
});
