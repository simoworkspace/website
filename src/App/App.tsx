import { Header } from "../components/Header/Header";
import { Bots } from "../components/BotList/Bots";
import { Addbot } from "../pages/Bot/Addbot";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "../pages/Mixed/NotFound";
import { Mobilemenu } from "../components/Mobile/Mobilemenu";
import { Bot } from "../pages/Bot/Bot";
import { Vote } from "../pages/Bot/Vote";
import { Tests } from "../pages/Mixed/Tests";
import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { appColor } from "../utils/theme/app";
import { Search } from "../pages/Bot/Search";
import { Footer } from "../components/Footer/Footer";
import { User } from "../components/User/User";
import { NotificationsPage } from "../pages/Mixed/Notifications";
import { ThemesPage } from "../pages/Mixed/Theme";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { DashboardEditPage } from "../pages/Dashboard/Edit";
import { CreateTeamPage } from "../pages/Team/CreateTeam";
import { TeamPage } from "../pages/Team/Team";
import { ManageTeamPage } from "../pages/Team/ManageTeam";
import { InvitePage } from "../pages/Team/Invite";
import { Auth } from "../components/Mixed/Auth";
import { Login } from "../pages/Login/Login";

function App() {
    const { color } = useContext(ThemeContext);
    const [snowflakes, setSnowflakes] = useState<boolean>(true);

    return (
        <main className={`xl:no-scrollbar xlr:h-1 flex flex-col items-center overflow-x-hidden min-h-screen ${appColor[color]} bg-fixed scrollbar-track-neutral-900 scrollbar-thin`}>
            {snowflakes && (
                <div className="snowflakes xl:invisible">
                    {Array(14).fill(
                        <div className="snowflake">
                            ❅
                        </div>
                    )}
                </div>
            )}
            <Header snowflakes={snowflakes} setSnowflakes={setSnowflakes} />
            <section className="flex flex-1 flex-col">
                <Routes>
                    <Route path="/testes" element={<Tests />} />
                    <Route path="/bot/:botid" element={<Bot />} />
                    <Route path="/vote/:botid" element={<Vote />} />
                    <Route path="/" element={<Bots />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/themes" element={<ThemesPage />} />
                    <Route path="/addbot" element={<Auth><Addbot /></Auth>} />
                    <Route path="/user/:userid" element={<User />} />
                    <Route path="/dashboard" element={<Auth><Dashboard /></Auth>} />
                    <Route path="/dashboard/edit/:botId" element={<Auth><DashboardEditPage /></Auth>} />
                    <Route path="/team/create" element={<Auth><CreateTeamPage /></Auth>} />
                    <Route path="/team/:teamId" element={<TeamPage />} />
                    <Route path="/team/:teamId/invite/:hash" element={<InvitePage />} />
                    <Route path="/team/manage/:teamId" element={<Auth><ManageTeamPage /></Auth>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Mobilemenu />
            </section>
            <Footer />
        </main>
    );
}

export default App;
