import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import { AppContainer, MainContent } from '../styles';

const ProtectedLayout = () => {
    return (
        <AppContainer>
            <Sidebar />
            <MainContent>
                <Outlet />
            </MainContent>
        </AppContainer>
    );
};

export default ProtectedLayout;
