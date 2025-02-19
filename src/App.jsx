import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { SensorServiceProvider } from './services/SensorService';
import { NotificationServiceProvider } from './services/NotificationService';
import { CameraServiceProvider } from './services/CameraService';
import { BackupServiceProvider } from './services/BackupService';

// Import pages and components
import Dashboard from './components/dashboard/Dashboard.jsx';
import SwitchCard from './auth/SwitchCard';
import ProtectedLayout from "./components/ProtectedLayout.jsx";
import PlantManagement from "./components/plantManagement/PlantManagement.jsx";
import SensorManagement from "./components/sensorManagement/SensorManagement.jsx";
import NotificationsSettings from "./components/settings/NotificationsSettings.jsx";
import BackupRestore from './components/BackupRestore';
import DataExport from './components/DataExport';
import UserProfile from "./components/userManagement/UserProfile.jsx";

// Protected Route Wrapper to enforce authentication
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

const UserProfileWrapper = () => {
    const { user } = useAuth(); // Retrieve user object from the Auth context
    const userId = user?.id; // Extract userId from the user object

    if (!userId) {
        return <Navigate to="/login" />; // Redirect to login if userId is not available
    }

    return <UserProfile userId={userId} />;
};

function App() {
    return (
        <AuthProvider>
                <SensorServiceProvider>
                    <NotificationServiceProvider>
                        <CameraServiceProvider>
                            <BackupServiceProvider>
                                <Routes>
                                    {/* Public Route for Login */}
                                    <Route path="/login" element={<SwitchCard />} />

                                    {/* Protected Routes */}
                                    <Route
                                        element={
                                            <ProtectedRoute>
                                                <ProtectedLayout />
                                            </ProtectedRoute>
                                        }
                                    >
                                        <Route path="/dashboard" element={<Dashboard />} />
                                        <Route path="/plant-management" element={<PlantManagement />} />
                                        <Route path="/sensor-management" element={<SensorManagement />} />
                                        <Route path="/notifications" element={<NotificationsSettings />} />
                                        <Route path="/backup" element={<BackupRestore />} />
                                        <Route path="/data-export" element={<DataExport />} />
                                        <Route path="/user-profile" element={<UserProfileWrapper />} />
                                    </Route>

                                    {/* Redirect all other routes to login */}
                                    <Route path="*" element={<Navigate to="/login" />} />
                                </Routes>
                            </BackupServiceProvider>
                        </CameraServiceProvider>
                    </NotificationServiceProvider>
                </SensorServiceProvider>
        </AuthProvider>
    );
}

export default App;
