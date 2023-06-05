import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { Addbot } from "./pages/Addbot";
import { Routes, Route } from "react-router-dom";
import { NotFound } from "./pages/NotFound";
import { Mobilemenu } from "./components/Mobilemenu";
import { Bot } from "./pages/Bot";
import { RequireAuth } from "./components/RequireAuth";

function App() {
    return (
        <>
            <header>
                <Header />
            </header>
            <body className="overflow-x-hidden">
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
            </body>
        </>
    );
}

export default App;
