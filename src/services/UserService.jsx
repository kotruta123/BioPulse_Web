import React, { createContext, useState, useContext } from 'react';

const UserServiceContext = createContext();

export const UserServiceProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    const addUser = (user) => setUsers([...users, user]);

    return (
        <UserServiceContext.Provider value={{ users, addUser }}>
            {children}
        </UserServiceContext.Provider>
    );
};

export const useUserService = () => useContext(UserServiceContext);
