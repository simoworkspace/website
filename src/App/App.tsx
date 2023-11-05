import { Header } from "../components/Header/Header";
import { Bots } from "../components/BotList/Bots";
import { Addbot } from "../pages/Bot/Addbot";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "../pages/Mixed/NotFound";
import { Mobilemenu } from "../components/Mobile/Mobilemenu";
import { Bot } from "../pages/Bot/Bot";
import { Vote } from "../pages/Bot/Vote";
import { Tests } from "../pages/Mixed/Tests";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { appColor } from "../utils/theme/app";
import { Search } from "../pages/Bot/Search";
import { Footer } from "../components/Footer/Footer";
import { User } from "../components/User/User";
import { NotificationsPage } from "../pages/Mixed/Notifications";
import { ThemesPage } from "../pages/Mixed/Theme";
import "./index.css";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { DashboardEditPage } from "../pages/Dashboard/Edit";
import { SettingsPage } from "../pages/Dashboard/Settings";

function App() {
    const { color } = useContext(ThemeContext);

    return (
        <main className={`xl:no-scrollbar xlr:h-1 flex flex-col items-center overflow-x-hidden min-h-screen ${appColor[color]} bg-fixed scrollbar-track-neutral-900 scrollbar-thin`}>
            <Header />
            <section className="flex flex-1 flex-col">
                <Routes>
                    <Route path="/testes" element={<Tests />} />
                    <Route path="/bot/:botid" element={<Bot />} />
                    <Route path="/vote/:botid" element={<Vote />} />
                    <Route path="/" element={<Bots />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/notifications" element={<NotificationsPage />} />
                    <Route path="/themes" element={<ThemesPage />} />
                    <Route path="addbot" element={<Addbot />}/>
                    <Route path="/users/:userid" element={<User/>}/>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/edit/:botId" element={<DashboardEditPage />} />
                    <Route path="/dashboard/settings" element={<SettingsPage />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Mobilemenu />
            </section>
            <Footer />
        </main>
    );
}

export default App;
