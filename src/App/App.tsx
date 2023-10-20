import { Header } from "../components/Header/Header";
import { Bots } from "../components/BotList/Bots";
import { Addbot } from "../pages/Addbot";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { Mobilemenu } from "../components/Mobile/Mobilemenu";
import { Bot } from "../pages/Bot";
import { Vote } from "../pages/Vote";
import { Tests } from "../pages/Tests";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { appColor } from "../utils/theme/app";
import { Search } from "../pages/Search";
import { Footer } from "../components/Footer/Footer";
import { User } from "../components/User/User";
import { NotificationsPage } from "../pages/Notifications";
import { ThemesPage } from "../pages/Theme";
import "./index.css";

function App() {
    const { color } = useContext(ThemeContext);

    return (
        <main className={`xl:no-scrollbar xlr:h-1 flex flex-col items-center overflow-x-hidden min-h-screen ${appColor[color]} bg-fixed scrollbar-track-neutral-900 scrollbar-thin`}>
            <Header />
            <section>
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
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Mobilemenu />
            </section>
            <Footer />
        </main>
    );
}

export default App;
