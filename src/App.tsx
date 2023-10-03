import { Header } from "./components/Header";
import { Bots } from "./components/BotList/Bots";
import { Addbot } from "./pages/Addbot";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Mobilemenu } from "./components/Mobilemenu";
import { Bot } from "./pages/Bot";
import { RequireAuth } from "./components/RequireAuth";
import { Vote } from "./pages/Vote";
import { Tests } from "./pages/Tests";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { appColor } from "./utils/theme/app";
import { Search } from "./pages/Search";
import "./index.css";
import { Footer } from "./components/Footer/Footer";
import { User } from "./components/User/User";

function App() {
    const { color } = useContext(ThemeContext);

    return (
        <main className={`xl:scrollbar-hide overflow-x-hidden min-h-[100vh] ${appColor[color]} bg-fixed h-1 xl:h-0 scrollbar-track-neutral-900 scrollbar-thin`}>
            <header>
                <Header />
            </header>
            <section>
                <Routes>
                    <Route path="/testes" element={<Tests />} />
                    <Route path="/bot/:botid" element={<Bot />} />
                    <Route path="/vote/:botid" element={<Vote />} />
                    <Route path="/" element={<Bots />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="addbot" element={<RequireAuth><Addbot /></RequireAuth>}/>
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
