import React, { createContext, useState, useContext } from 'react';

const NotificationServiceContext = createContext();

export const NotificationServiceProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const configureNotification = (notification) => setNotifications([...notifications, notification]);

    return (
        <NotificationServiceContext.Provider value={{ notifications, configureNotification }}>
            {children}
        </NotificationServiceContext.Provider>
    );
};

export const useNotificationService = () => useContext(NotificationServiceContext);
