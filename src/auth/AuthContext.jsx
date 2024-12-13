import React, { createContext, useContext, useState } from "react";
import UserService from "../services/UserService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            const userData = await UserService.authenticateUser(email, password);
            setIsAuthenticated(true);
            setUser(userData);
            return { success: true };
        } catch (error) {
            return { success: false, message: error.message || "Login failed. Please try again." };
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
