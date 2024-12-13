import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { createRoot } from "react-dom/client";
import {AuthProvider} from "./auth/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <AuthProvider>
        <App />
        </AuthProvider>
    </BrowserRouter>
);
