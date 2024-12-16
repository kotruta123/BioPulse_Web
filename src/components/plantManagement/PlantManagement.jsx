import React, {useEffect, useState} from "react";
import {GlobalStyle, PageContainer,} from "./PlantStyles";
import {
        addPlantProfile,
        deletePlantProfile,
        getPlantProfiles,
        updatePlantProfile
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
        const [newProfile, setNewProfile] = useState({
                name: "",
                isDefault: false,
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
        });
        const predefinedImages = [basilImage, cabbageImage, lettuceImage, spinachImage, tomatoImage];

        const [editingProfile, setEditingProfile] = useState(null);
        const [errors, setErrors] = useState({});
        const [showModal, setShowModal] = useState(false);
        const [selectedProfile, setSelectedProfile] = useState(null);
        const [successMessage, setSuccessMessage] = useState("");
        const [errorMessage, setErrorMessage] = useState("");

        useEffect(() => {
                const fetchProfiles = async () => {
                        try {
                                const profiles = await getPlantProfiles();
                                const updatedProfiles = profiles.map((profile, index) => ({
                                        ...profile,
                                        imageUrl: profile.imageUrl || predefinedImages[index % predefinedImages.length] || strawberryImage,
                                }));
                                setPlantProfiles(updatedProfiles);
                        } catch (error) {
                                console.error("Error fetching plant profiles:", error);
                        }
                };
                fetchProfiles();
        }, []);

        useEffect(() => {
                if (successMessage) {
                        const timer = setTimeout(() => setSuccessMessage(""), 3000);
                        return () => clearTimeout(timer);
                }
        }, [successMessage]);

        useEffect(() => {
                if (errorMessage) {
                        const timer = setTimeout(() => setErrorMessage(""), 5000);
                        return () => clearTimeout(timer);
                }
        }, [errorMessage]);

        const resetForm = () => {
                setNewProfile({
                        name: "",
                        isDefault: false,
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
                });
                setEditingProfile(null);
                setErrors({});
        };

        const handleCardClick = (profile) => {
                setSelectedProfile(profile);
        };

        const handleEdit = (profile) => {
                resetForm();
                setEditingProfile(profile);
                setNewProfile({
                        name: profile.name,
                        isDefault: profile.isDefault,
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
                        imageUrl: "",
                });
                setShowModal(true);
        };

        const validateForm = () => {
                let formErrors = {};
                if (!newProfile.name) formErrors.name = "Plant name is required.";
                return formErrors;
        };

        const handleSave = async (e) => {
                e.preventDefault();
                const formErrors = validateForm();
                if (Object.keys(formErrors).length > 0) {
                        setErrors(formErrors);
                        return;
                }

                const profileData = {
                        name: newProfile.name,
                        isDefault: newProfile.isDefault,
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

                        // Fetch updated plant profiles and assign image URLs
                        const profiles = await getPlantProfiles();
                        const updatedProfiles = profiles.map((profile, index) => ({
                                ...profile,
                                imageUrl: profile.imageUrl || predefinedImages[index % predefinedImages.length] || strawberryImage,
                        }));
                        setPlantProfiles(updatedProfiles);

                        resetForm();
                        setShowModal(false);
                } catch (error) {
                        console.error("Error saving plant profile:", error);
                        setErrorMessage("Failed to save the profile. Please try again.");
                }
        };

        const handleDeleteProfile = async (id) => {
                try {
                        await deletePlantProfile(id);
                        setPlantProfiles(plantProfiles.filter((profile) => profile.id !== id));
                        if (selectedProfile && selectedProfile.id === id) {
                                setSelectedProfile(null);
                        }
                        setSuccessMessage("Profile deleted successfully!");
                } catch (error) {
                        console.error("Error deleting plant profile:", error);
                        setErrorMessage("Failed to delete the profile. Please try again.");
                }
        };

        const handleAddNewPlant = () => {
                resetForm();
                setShowModal(true);
        };

        const closeModal = () => {
                setShowModal(false);
                resetForm();
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

                    {selectedProfile && <DataCard profile={selectedProfile} />}

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
