// services/PlantProfileService.js
import axios from "axios";

const API_HOST = "https://10.154.220.92:5000/api/plant-profiles";

export const getPlantProfiles = async () => {
    try {
        const response = await axios.get(API_HOST);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch plant profiles.");
    }
};

export const addPlantProfile = async (profileData) => {
    try {
        const response = await axios.post(API_HOST, profileData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to add plant profile.");
    }
};

export const updatePlantProfile = async (profileData) => {
    try {
        const response = await axios.put(`${API_HOST}/${profileData.id}`, profileData, {
            headers: { "Content-Type": "application/json" },
        });
        return response.data;
    } catch (error) {
        throw new Error("Failed to update plant profile.");
    }
};

export const deletePlantProfile = async (id) => {
    try {
        const response = await axios.delete(`${API_HOST}/${id}`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to delete plant profile.");
    }
};

// New service to activate a plant profile
export const activatePlantProfile = async (id) => {
    try {
        const response = await axios.post(`${API_HOST}/${id}/activate`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to activate plant profile.");
    }
};

export const deactivatePlantProfile = async () => {
    try {
        const response = await axios.post(`${API_HOST}/deactivate`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to deactivate plant profile.");
    }
};

export const getActivePlantProfile = async () => {
    try {
        const response = await axios.get(`${API_HOST}/active`);
        return response.data;
    } catch (error) {
        throw new Error("Failed to fetch the active plant profile.");
    }
};

