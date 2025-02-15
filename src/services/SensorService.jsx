// services/SensorService.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const SensorServiceContext = createContext();

const API_HOST = 'http://10.154.220.92:5000/api/sensors';

export const SensorServiceProvider = ({ children }) => {
    const [sensors, setSensors] = useState([]);
    const [dashboardSensors, setDashboardSensors] = useState([]);

    // Fetch sensors from the backend on component mount
    useEffect(() => {
        fetchSensors();
    }, []);

    const fetchSensors = async () => {
        try {
            const response = await axios.get(API_HOST);
            setSensors(response.data);
        } catch (error) {
            console.error('Failed to fetch sensors:', error);
        }
    };

    const addToDashboard = (sensor) => {
        setDashboardSensors((prev) => {
            if (prev.find((s) => s.id === sensor.id)) {
                return prev; // Sensor already in dashboard
            }
            return [...prev, sensor];
        });
    };

    const removeFromDashboard = (sensorId) => {
        setDashboardSensors((prev) => prev.filter((s) => s.id !== sensorId));
    };

    return (
        <SensorServiceContext.Provider
            value={{
                sensors,
                dashboardSensors,
                fetchSensors,
                addToDashboard,
                removeFromDashboard,
            }}
        >
            {children}
        </SensorServiceContext.Provider>
    );
};

export const useSensorService = () => useContext(SensorServiceContext);
