import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Addbot } from "./pages/Addbot";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Mobilemenu } from "./components/Mobilemenu";
import { Bot } from "./pages/Bot";
import { RequireAuth } from "./components/RequireAuth";
import { useEffect } from "react";

function App() {
    return (
        <body className="overflow-x-hidden">
            <header>
                <Header />
            </header>
            <section>
                <Routes>
                    <Route path="/bot/:botid" element={<Bot />} />
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
        </body>
    );
}

export default App;
