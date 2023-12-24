import React from "react";
import { BotComponent } from "../../components/Bot/Bot";
import { Helmet } from "react-helmet";

export const Bot: React.FC = () => {
    return (
        <>
            <Helmet>
                <title>Simo Botlist - bot</title>
                <meta property="og:title" content="bot legal e bonito" />
                <meta property="og:type" content="website" />
                {/* <meta property="og:image" content={`https://cdn.discordapp.com/avatars/${botData.id}/${botData.avatar}.png`} /> */}
                <meta property="og:description" content="short descrioç]ap" />
                <meta name="theme-color" content="#FFFFFF" />
            </Helmet>
            <BotComponent />
        </>
    )
};
