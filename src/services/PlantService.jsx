import React, { createContext, useState, useContext } from 'react';

const PlantServiceContext = createContext();

export const PlantServiceProvider = ({ children }) => {
    const [plantProfiles, setPlantProfiles] = useState([]);

    const addPlantProfile = (profile) => setPlantProfiles([...plantProfiles, profile]);

    return (
        <PlantServiceContext.Provider value={{ plantProfiles, addPlantProfile }}>
            {children}
        </PlantServiceContext.Provider>
    );
};

export const usePlantService = () => useContext(PlantServiceContext);
