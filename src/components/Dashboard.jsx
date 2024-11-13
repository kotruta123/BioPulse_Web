import React from "react";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import DashboardContent from "./DashboardContent.jsx";
import { AppContainer, MainContent } from "../styles.js";

const Dashboard = () => {
    return (
        <AppContainer>
            <Sidebar />
            <MainContent>
                <Header />
                <DashboardContent />
            </MainContent>
        </AppContainer>
    );
};

export default Dashboard;
