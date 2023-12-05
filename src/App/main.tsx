import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../contexts/UserContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { ChakraProvider } from "@chakra-ui/react";
import "./index.css";
import "tailwindcss/tailwind.css";

const root = document.getElementById("root") as HTMLElement;

createRoot(root).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <UserProvider>
                    <ChakraProvider>
                        <App />
                    </ChakraProvider>
                </UserProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
