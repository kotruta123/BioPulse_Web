import React, { createContext, useState, useContext } from 'react';

const SensorServiceContext = createContext();

export const SensorServiceProvider = ({ children }) => {
    const [sensors, setSensors] = useState([]);

    const addSensor = (sensor) => setSensors([...sensors, sensor]);

    return (
        <SensorServiceContext.Provider value={{ sensors, addSensor }}>
            {children}
        </SensorServiceContext.Provider>
    );
};

export const useSensorService = () => useContext(SensorServiceContext);
