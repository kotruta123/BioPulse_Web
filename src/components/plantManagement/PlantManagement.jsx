// PlantManagement.jsx
import React, { useEffect, useState } from "react";
import { GlobalStyle, PageContainer } from "./PlantStyles";
import {
        addPlantProfile,
        deletePlantProfile,
        getPlantProfiles,
        getActivePlantProfile,
        updatePlantProfile,
        activatePlantProfile
} from "../../services/PlantService.jsx";
import PlantGrid from "./plantProfileComponents/PlantGrid.jsx";
import PlantForm from "./plantProfileComponents/PlantForm.jsx";
import DataCard from "./plantProfileComponents/DataCard.jsx";
import MessageBanner from "./plantProfileComponents/MessageBanner.jsx";
import strawberryImage from "../../../public/images/strawberry.jpg";
import cabbageImage from "../../../public/images/cabbage.jpg";
import basilImage from "../../../public/images/basil.jpg";
import lettuceImage from "../../../public/images/lettuce.jpg";
import spinachImage from "../../../public/images/spinach.jpg";
import tomatoImage from "../../../public/images/tomato.jpg";
import ParticlesBackground from "./plantProfileComponents/ParticlesBackground.jsx";

const PlantManagement = () => {
        const [plantProfiles, setPlantProfiles] = useState([]);
        const [activeProfile, setActiveProfile] = useState(null);
        const [newProfile, setNewProfile] = useState({
                name: "",
                phMin: 6.0,
                phMax: 7.5,
                temperatureMin: 22.0,
                temperatureMax: 27.0,
                lightOnTime: new Date().toISOString(),
                lightOffTime: new Date().toISOString(),
                lightMin: 250.0,
                lightMax: 450.0,
                ecMin: 1.5,
                ecMax: 2.5,
                imageUrl: "",
        });
        const predefinedImages = [basilImage, cabbageImage, lettuceImage, spinachImage, tomatoImage];

        const [editingProfile, setEditingProfile] = useState(null);
        const [errors, setErrors] = useState({});
        const [showModal, setShowModal] = useState(false);
        const [selectedProfile, setSelectedProfile] = useState(null);
        const [successMessage, setSuccessMessage] = useState("");
        const [errorMessage, setErrorMessage] = useState("");

        // Fetch plant profiles and active profile on component mount
        useEffect(() => {
                fetchPlantProfiles();
        }, []);

        // Fetch plant profiles
        const fetchPlantProfiles = async () => {
                try {
                        const profiles = await getPlantProfiles();
                        const updatedProfiles = profiles.map((profile, index) => ({
                                ...profile,
                                imageUrl: profile.imageUrl || predefinedImages[index % predefinedImages.length] || strawberryImage,
                        }));
                        setPlantProfiles(updatedProfiles);
                        await fetchActiveProfile(updatedProfiles); // Fetch active profile after profiles are loaded
                } catch (error) {
                        console.error("Error fetching plant profiles:", error);
                        setErrorMessage("Failed to fetch plant profiles.");
                }
        };

        // Fetch the active plant profile
        const fetchActiveProfile = async (profiles = plantProfiles) => {
                try {
                        const active = await getActivePlantProfile();
                        setActiveProfile(active);
                        // Update plantProfiles to reflect the active status
                        const updatedProfiles = profiles.map((profile) => ({
                                ...profile,
                                isActive: active && profile.id === active.id,
                        }));
                        setPlantProfiles(updatedProfiles);
                        setSelectedProfile(active); // Optionally select the active profile
                } catch (error) {
                        console.error("Error fetching active plant profile:", error);
                        // It's possible there is no active profile, handle accordingly
                        setActiveProfile(null);
                        const updatedProfiles = profiles.map((profile) => ({
                                ...profile,
                                isActive: false,
                        }));
                        setPlantProfiles(updatedProfiles);
                }
        };

        // Auto-hide success messages after 3 seconds
        useEffect(() => {
                if (successMessage) {
                        const timer = setTimeout(() => setSuccessMessage(""), 3000);
                        return () => clearTimeout(timer);
                }
        }, [successMessage]);

        // Auto-hide error messages after 5 seconds
        useEffect(() => {
                if (errorMessage) {
                        const timer = setTimeout(() => setErrorMessage(""), 5000);
                        return () => clearTimeout(timer);
                }
        }, [errorMessage]);

        // Reset form to initial state
        const resetForm = () => {
                setNewProfile({
                        name: "",
                        phMin: 6.0,
                        phMax: 7.5,
                        temperatureMin: 22.0,
                        temperatureMax: 27.0,
                        lightOnTime: new Date().toISOString(),
                        lightOffTime: new Date().toISOString(),
                        lightMin: 250.0,
                        lightMax: 450.0,
                        ecMin: 1.5,
                        ecMax: 2.5,
                        imageUrl: "",
                });
                setEditingProfile(null);
                setErrors({});
        };

        // Handle clicking on a plant card
        const handleCardClick = (profile) => {
                setSelectedProfile(profile);
        };

        // Handle editing a plant profile
        const handleEdit = (profile) => {
                if (profile.isDefault) {
                        setErrorMessage("Default profiles cannot be edited.");
                        return;
                }
                resetForm();
                setEditingProfile(profile);
                setNewProfile({
                        name: profile.name,
                        phMin: profile.phMin,
                        phMax: profile.phMax,
                        temperatureMin: profile.temperatureMin,
                        temperatureMax: profile.temperatureMax,
                        lightOnTime: profile.lightOnTime,
                        lightOffTime: profile.lightOffTime,
                        lightMin: profile.lightMin,
                        lightMax: profile.lightMax,
                        ecMin: profile.ecMin,
                        ecMax: profile.ecMax,
                        imageUrl: profile.imageUrl || "",
                });
                setShowModal(true);
        };

        // Validate form inputs
        const validateForm = () => {
                let formErrors = {};
                if (!newProfile.name.trim()) formErrors.name = "Plant name is required.";
                if (isNaN(newProfile.phMin) || newProfile.phMin < 0 || newProfile.phMin > 14)
                        formErrors.phMin = "pH Min must be between 0 and 14.";
                if (isNaN(newProfile.phMax) || newProfile.phMax < 0 || newProfile.phMax > 14)
                        formErrors.phMax = "pH Max must be between 0 and 14.";
                if (parseFloat(newProfile.phMin) > parseFloat(newProfile.phMax))
                        formErrors.phRange = "pH Min cannot be greater than pH Max.";
                // Add more validations as needed (e.g., temperature, light, EC ranges)
                return formErrors;
        };

        // Handle saving (adding or updating) a plant profile
        const handleSave = async (e) => {
                e.preventDefault();
                const formErrors = validateForm();
                if (Object.keys(formErrors).length > 0) {
                        setErrors(formErrors);
                        return;
                }

                const profileData = {
                        name: newProfile.name.trim(),
                        phMin: parseFloat(newProfile.phMin),
                        phMax: parseFloat(newProfile.phMax),
                        temperatureMin: parseFloat(newProfile.temperatureMin),
                        temperatureMax: parseFloat(newProfile.temperatureMax),
                        lightOnTime: new Date(newProfile.lightOnTime).toISOString(),
                        lightOffTime: new Date(newProfile.lightOffTime).toISOString(),
                        lightMin: parseFloat(newProfile.lightMin),
                        lightMax: parseFloat(newProfile.lightMax),
                        ecMin: parseFloat(newProfile.ecMin),
                        ecMax: parseFloat(newProfile.ecMax),
                        imageUrl: newProfile.imageUrl || strawberryImage,
                };

                try {
                        if (editingProfile) {
                                profileData.id = editingProfile.id;
                                await updatePlantProfile(profileData);
                                setSuccessMessage("Profile updated successfully!");
                        } else {
                                await addPlantProfile(profileData);
                                setSuccessMessage("Profile added successfully!");
                        }

                        // Refresh profiles to reflect changes
                        await fetchPlantProfiles();

                        resetForm();
                        setShowModal(false);
                } catch (error) {
                        console.error("Error saving plant profile:", error);
                        setErrorMessage("Failed to save the profile. Please try again.");
                }
        };

        // Handle deleting a plant profile
        const handleDeleteProfile = async (id) => {
                try {
                        await deletePlantProfile(id);
                        const updatedProfiles = plantProfiles.filter((profile) => profile.id !== id);
                        setPlantProfiles(updatedProfiles);
                        if (selectedProfile && selectedProfile.id === id) {
                                setSelectedProfile(null);
                        }
                        // If the deleted profile was active, clear activeProfile
                        if (activeProfile && activeProfile.id === id) {
                                setActiveProfile(null);
                                setSelectedProfile(null);
                        }
                        setSuccessMessage("Profile deleted successfully!");
                } catch (error) {
                        console.error("Error deleting plant profile:", error);
                        setErrorMessage("Failed to delete the profile. Please try again.");
                }
        };

        // Handle adding a new plant profile
        const handleAddNewPlant = () => {
                resetForm();
                setShowModal(true);
        };

        // Close the modal form
        const closeModal = () => {
                setShowModal(false);
                resetForm();
        };

        // Handle activating a plant profile
        const handleActivateProfile = async (profile) => {
                try {
                        await activatePlantProfile(profile.id);
                        setSuccessMessage(`${profile.name} has been activated.`);

                        // Update activeProfile state
                        setActiveProfile(profile);

                        // Update plantProfiles to reflect the active status
                        const updatedProfiles = plantProfiles.map((p) => ({
                                ...p,
                                isActive: p.id === profile.id, // Only the selected profile is active
                        }));

                        setPlantProfiles(updatedProfiles);
                        setSelectedProfile({ ...profile, isActive: true });
                } catch (error) {
                        console.error("Error activating plant profile:", error);
                        setErrorMessage("Failed to activate the profile. Please try again.");
                }
        };

        return (
            <PageContainer>
                    <GlobalStyle />
                    <ParticlesBackground />
                    {successMessage && <MessageBanner type="success" message={successMessage} />}
                    {errorMessage && <MessageBanner type="error" message={errorMessage} />}

                    <PlantGrid
                        plantProfiles={plantProfiles}
                        onCardClick={handleCardClick}
                        onEdit={handleEdit}
                        onDelete={handleDeleteProfile}
                        onAddNewPlant={handleAddNewPlant}
                    />

                    {selectedProfile && (
                        <DataCard
                            profile={selectedProfile}
                            onActivate={() => handleActivateProfile(selectedProfile)}
                        />
                    )}

                    {showModal && (
                        <PlantForm
                            profile={editingProfile}
                            formData={newProfile}
                            setFormData={setNewProfile}
                            onClose={closeModal}
                            onSave={handleSave}
                            errors={errors}
                        />
                    )}
            </PageContainer>
        );
};

export default PlantManagement;
