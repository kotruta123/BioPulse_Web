import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { PlantServiceProvider } from './services/PlantService';
import { SensorServiceProvider } from './services/SensorService';
import { NotificationServiceProvider } from './services/NotificationService';
import { CameraServiceProvider } from './services/CameraService';
import { BackupServiceProvider } from './services/BackupService';

// Import all components used in routing
import Dashboard from './components/Dashboard';
import SwitchCard from './auth/SwitchCard';
import PlantManagement from './components/PlantManagement';
import SensorManagement from './components/SensorManagement';
import CameraSettings from './components/CameraSettings';
import NotificationsSettings from './components/NotificationsSettings';
import BackupRestore from './components/BackupRestore';
import DataExport from './components/DataExport';

// Protected Route Wrapper to enforce authentication
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Make sure useAuth is imported and used here
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
                                        {/* Public Routes */}
                                        <Route path="/login" element={<SwitchCard />} />

                                        {/* Protected Routes */}
                                        <Route
                                            path="/dashboard"
                                            element={
                                                <ProtectedRoute>
                                                    <Dashboard />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/plant-management"
                                            element={
                                                <ProtectedRoute>
                                                    <PlantManagement />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/sensor-management"
                                            element={
                                                <ProtectedRoute>
                                                    <SensorManagement />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/camera-settings"
                                            element={
                                                <ProtectedRoute>
                                                    <CameraSettings />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/notifications"
                                            element={
                                                <ProtectedRoute>
                                                    <NotificationsSettings />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/backup"
                                            element={
                                                <ProtectedRoute>
                                                    <BackupRestore />
                                                </ProtectedRoute>
                                            }
                                        />
                                        <Route
                                            path="/data-export"
                                            element={
                                                <ProtectedRoute>
                                                    <DataExport />
                                                </ProtectedRoute>
                                            }
                                        />

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
