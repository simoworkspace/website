import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Addbot } from "./pages/Addbot";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Mobilemenu } from "./components/Mobilemenu";
import { Bot } from "./pages/Bot";
import { RequireAuth } from "./components/RequireAuth";
import { Guild } from "./pages/Guild";
import { Vote } from "./pages/Vote";
import { Guilds } from "./pages/Guilds";
import { Tests } from "./pages/Tests";
import "./index.css";
import "tailwindcss/tailwind.css";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";

function App() {
    const { color } = useContext(ThemeContext);

    return (
        <main
            className={`overflow-x-hidden min-h-[100vh] ${
                color === "blue" && "bg-gradient-to-b from-[#033757] to-black bg-fixed"
            } ${color === "green" && "bg-gradient-to-b from-[#056b49] to-black bg-fixed"} ${
                color === "red" && "bg-gradient-to-b from-[#571423] to-black bg-fixed"
            } bg-fixed`}
        >
            <header>
                <Header />
            </header>
            <section>
                <Routes>
                    <Route path="/guild/:guildid" element={<Guild />} />
                    <Route path="/testes" element={<Tests />} />
                    <Route path="/bot/:botid" element={<Bot />} />
                    <Route path="/vote/:botid" element={<Vote />} />
                    <Route path="/guilds" element={<Guilds />} />
                    <Route path="/" element={<Main />} />
                    <Route
                        path="addbot"
                        element={
                            <RequireAuth>
                                <Addbot />
                            </RequireAuth>
                        }
                    />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Mobilemenu />
            </section>
        </main>
    );
}

export default App;
