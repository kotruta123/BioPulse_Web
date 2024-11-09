import React from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import DashboardContent from "./components/DashboardContent";
import { AppContainer, MainContent } from "./styles";

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
