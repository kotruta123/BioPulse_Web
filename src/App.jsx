import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import Sidebar from './components/Sidebar';
import DashboardContent from './components/DashboardContent';
import Header from './components/Header';
import SwitchCard from './auth/SwitchCard';
import { AppContainer, MainContent } from './styles';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<SwitchCard />} />
                    <Route
                        path="/dashboard"
                        element={
                            <ProtectedRoute>
                                <AppContainer>
                                    <Sidebar />
                                    <MainContent>
                                        <Header />
                                        <DashboardContent />
                                    </MainContent>
                                </AppContainer>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
