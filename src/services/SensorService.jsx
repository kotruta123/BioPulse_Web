// services/SensorService.jsx
import React, { createContext, useState, useContext } from 'react';

const SensorServiceContext = createContext();

export const SensorServiceProvider = ({ children }) => {
    const [sensors, setSensors] = useState([
        {
            id: 1,
            name: "Temperature Sensor",
            isEnabled: true,
            isWireless: true,
            lastReading: "35.6°C",
            lastReadingTime: "2024-12-08 10:00 AM",
            address: "Room A1",
            sensorType: "Temperature",
        },
    ]);

    const addSensor = (sensor) =>
        setSensors((prev) => [
            ...prev,
            { ...sensor, id: Date.now(), isEnabled: false, lastReading: "N/A", lastReadingTime: "N/A" },
        ]);

    const editSensor = (id, updatedSensor) =>
        setSensors((prev) =>
            prev.map((sensor) => (sensor.id === id ? { ...sensor, ...updatedSensor } : sensor))
        );

    const deleteSensor = (id) => setSensors((prev) => prev.filter((sensor) => sensor.id !== id));

    const toggleActivation = (id) =>
        setSensors((prev) =>
            prev.map((sensor) =>
                sensor.id === id ? { ...sensor, isEnabled: !sensor.isEnabled } : sensor
            )
        );

    return (
        <SensorServiceContext.Provider
            value={{ sensors, addSensor, editSensor, deleteSensor, toggleActivation }}
        >
            {children}
        </SensorServiceContext.Provider>
    );
};

export const useSensorService = () => useContext(SensorServiceContext);
