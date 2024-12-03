import React, { createContext, useState, useContext } from 'react';

const CameraServiceContext = createContext();

export const CameraServiceProvider = ({ children }) => {
    const [cameraSettings, setCameraSettings] = useState({});

    const configureCamera = (settings) => setCameraSettings(settings);

    return (
        <CameraServiceContext.Provider value={{ cameraSettings, configureCamera }}>
            {children}
        </CameraServiceContext.Provider>
    );
};

export const useCameraService = () => useContext(CameraServiceContext);
