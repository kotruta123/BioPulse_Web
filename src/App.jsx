import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { PlantServiceProvider } from './services/PlantService';
import { SensorServiceProvider } from './services/SensorService';
import { NotificationServiceProvider } from './services/NotificationService';
import { CameraServiceProvider } from './services/CameraService';
import { BackupServiceProvider } from './services/BackupService';

// Import pages and components
import Dashboard from './components/Dashboard';
import SwitchCard from './auth/SwitchCard';
import ProtectedLayout from "./components/ProtectedLayout.jsx";
import PlantManagement from "./components/settings/PlantManagement.jsx";
import SensorManagement from "./components/settings/SensorManagement.jsx";
import CameraSettings from "./components/settings/CameraSettings.jsx";
import NotificationsSettings from "./components/settings/NotificationsSettings.jsx";
import BackupRestore from './components/BackupRestore';
import DataExport from './components/DataExport';

// Protected Route Wrapper to enforce authentication
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    return (
        <AuthProvider>
            <PlantServiceProvider>
                <SensorServiceProvider>
                    <NotificationServiceProvider>
                        <CameraServiceProvider>
                            <BackupServiceProvider>
                                <Router>
                                    <Routes>
                                        {/* Public Route for Login and Register */}
                                        <Route path="/login" element={<SwitchCard />} />

                                        {/* Protected Routes within ProtectedLayout */}
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
                                            <Route path="/camera-settings" element={<CameraSettings />} />
                                            <Route path="/notifications" element={<NotificationsSettings />} />
                                            <Route path="/backup" element={<BackupRestore />} />
                                            <Route path="/data-export" element={<DataExport />} />
                                        </Route>

                                        {/* Redirect all other routes to login */}
                                        <Route path="*" element={<Navigate to="/login" />} />
                                    </Routes>
                                </Router>
                            </BackupServiceProvider>
                        </CameraServiceProvider>
                    </NotificationServiceProvider>
                </SensorServiceProvider>
            </PlantServiceProvider>
        </AuthProvider>
    );
}

export default App;
