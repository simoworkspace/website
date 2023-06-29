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

function App() {
    return (
        <main className="overflow-x-hidden">
            <header>
                <Header />
            </header>
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
        </main>
    );
}

export default App;
