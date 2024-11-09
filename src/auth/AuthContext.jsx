import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = (username, password) => {
        const storedUser = JSON.parse(localStorage.getItem(username));
        if (storedUser && storedUser.password === password) {
            setIsAuthenticated(true);
            return true;
        } else {
            alert('Invalid username or password');
            return false;
        }
    };

    const register = (username, email, securityQuestion, password) => {
        if (localStorage.getItem(username)) {
            alert('Username already exists');
            return false;
        }

        const user = { username, email, securityQuestion, password };
        localStorage.setItem(username, JSON.stringify(user));
        alert('Registration successful!');
        return true;
    };

    const loginAsGuest = () => {
        setIsAuthenticated(true);
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, register, loginAsGuest, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
