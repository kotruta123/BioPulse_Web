import React, { useState, useEffect } from "react";
import {
        PlantGrid,
        PlantCardContainer,
        PlantImage,
        PlantOverlay,
        PlantTitle,
        Input,
        Form,
} from "../../styles.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import strawberryImage from "../../../public/images/strawberry.jpg";
import cabbageImage from "../../../public/images/cabbage.jpg";
import basilImage from "../../../public/images/basil.jpg";
import lettuceImage from "../../../public/images/lettuce.jpg";
import spinachImage from "../../../public/images/spinach.jpg";
import tomatoImage from "../../../public/images/tomato.jpg";
import {
        getPlantProfiles,
        addPlantProfile,
        updatePlantProfile,
        deletePlantProfile
} from "../../services/PlantService.jsx";
import {
        GlobalStyle,
        fadeIn,
        PageContainer,
        AddButton,
        ModalBackground,
        FormContainer,
        CloseButton,
        FormHeader,
        FullWidthGroup,
        FormGroup,
        TwoColumnRow,
        SaveButton,
        ErrorMessage,
        DataCard,
        MessageBanner,
} from "./PlantStyles";


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
                                        imageUrl: profile.imageUrl || predefinedImages[index] || strawberryImage,
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
                    {successMessage && (
                        <MessageBanner type="success">
                                {successMessage}
                        </MessageBanner>
                    )}
                    {errorMessage && (
                        <MessageBanner type="error">
                                {errorMessage}
                        </MessageBanner>
                    )}

                    <PlantGrid>
                            {plantProfiles.map((profile) => (
                                <PlantCardContainer key={profile.id} onClick={() => handleCardClick(profile)} style={{cursor:'pointer'}}>
                                        <PlantImage src={profile.imageUrl} alt={profile.name} />
                                        <PlantOverlay>
                                                <PlantTitle>{profile.name}</PlantTitle>
                                                <EditIcon
                                                    data-testid={`edit-icon-${profile.id}`}
                                                    style={{ cursor: "pointer", color: "white", marginTop: "10px" }}
                                                    onClick={(e) => { e.stopPropagation(); handleEdit(profile); }}
                                                />
                                                {!profile.isDefault && (
                                                    <DeleteIcon
                                                        data-testid={`delete-icon-${profile.id}`}
                                                        style={{ cursor: "pointer", color: "red", marginTop: "10px" }}
                                                        onClick={(e) => { e.stopPropagation(); handleDeleteProfile(profile.id); }}
                                                    />
                                                )}
                                        </PlantOverlay>
                                </PlantCardContainer>
                            ))}
                            <AddButton onClick={handleAddNewPlant}>
                                    Add New Plant Profile +
                            </AddButton>
                    </PlantGrid>

                    {selectedProfile && (
                        <DataCard>
                                <h4>Current Profile Data</h4>
                                <div className="data-grid">
                                        <div className="data-item">
                                                <span className="label">Name:</span>
                                                <span className="value">{selectedProfile.name}</span>
                                        </div>
                                        <div className="data-item">
                                                <span className="label">pH Range:</span>
                                                <span className="value">{selectedProfile.phMin} - {selectedProfile.phMax}</span>
                                        </div>
                                        <div className="data-item">
                                                <span className="label">Temp Range (°C):</span>
                                                <span className="value">{selectedProfile.temperatureMin} - {selectedProfile.temperatureMax}</span>
                                        </div>
                                        <div className="data-item">
                                                <span className="label">Light On/Off:</span>
                                                <span className="value">{new Date(selectedProfile.lightOnTime).toLocaleString()} / {new Date(selectedProfile.lightOffTime).toLocaleString()}</span>
                                        </div>
                                        <div className="data-item">
                                                <span className="label">Light Range:</span>
                                                <span className="value">{selectedProfile.lightMin} - {selectedProfile.lightMax}</span>
                                        </div>
                                        <div className="data-item">
                                                <span className="label">EC Range:</span>
                                                <span className="value">{selectedProfile.ecMin} - {selectedProfile.ecMax}</span>
                                        </div>
                                </div>
                        </DataCard>
                    )}

                    {showModal && (
                        <ModalBackground>
                                <FormContainer>
                                        <CloseButton onClick={closeModal}>×</CloseButton>
                                        <FormHeader>
                                                {editingProfile ? `Edit Plant: ${editingProfile.name}` : "Add New Plant Profile"}
                                        </FormHeader>

                                        <FullWidthGroup>
                                                <label>Plant Name</label>
                                                <Input
                                                    type="text"
                                                    value={newProfile.name}
                                                    onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                                                    placeholder="Plant Name"
                                                />
                                                {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                                        </FullWidthGroup>

                                        <TwoColumnRow>
                                                <FormGroup>
                                                        <label>pH Min</label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={newProfile.phMin}
                                                            onChange={(e) => setNewProfile({ ...newProfile, phMin: e.target.value })}
                                                        />
                                                </FormGroup>
                                                <FormGroup>
                                                        <label>pH Max</label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={newProfile.phMax}
                                                            onChange={(e) => setNewProfile({ ...newProfile, phMax: e.target.value })}
                                                        />
                                                </FormGroup>
                                        </TwoColumnRow>

                                        <TwoColumnRow>
                                                <FormGroup>
                                                        <label>Temp Min (°C)</label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={newProfile.temperatureMin}
                                                            onChange={(e) => setNewProfile({ ...newProfile, temperatureMin: e.target.value })}
                                                        />
                                                </FormGroup>
                                                <FormGroup>
                                                        <label>Temp Max (°C)</label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={newProfile.temperatureMax}
                                                            onChange={(e) => setNewProfile({ ...newProfile, temperatureMax: e.target.value })}
                                                        />
                                                </FormGroup>
                                        </TwoColumnRow>

                                        <TwoColumnRow>
                                                <FormGroup>
                                                        <label>Light On Time</label>
                                                        <Input
                                                            type="datetime-local"
                                                            value={new Date(newProfile.lightOnTime).toISOString().slice(0,16)}
                                                            onChange={(e) => setNewProfile({ ...newProfile, lightOnTime: new Date(e.target.value).toISOString() })}
                                                        />
                                                </FormGroup>
                                                <FormGroup>
                                                        <label>Light Off Time</label>
                                                        <Input
                                                            type="datetime-local"
                                                            value={new Date(newProfile.lightOffTime).toISOString().slice(0,16)}
                                                            onChange={(e) => setNewProfile({ ...newProfile, lightOffTime: new Date(e.target.value).toISOString() })}
                                                        />
                                                </FormGroup>
                                        </TwoColumnRow>

                                        <TwoColumnRow>
                                                <FormGroup>
                                                        <label>Light Min</label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={newProfile.lightMin}
                                                            onChange={(e) => setNewProfile({ ...newProfile, lightMin: e.target.value })}
                                                        />
                                                </FormGroup>
                                                <FormGroup>
                                                        <label>Light Max</label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={newProfile.lightMax}
                                                            onChange={(e) => setNewProfile({ ...newProfile, lightMax: e.target.value })}
                                                        />
                                                </FormGroup>
                                        </TwoColumnRow>

                                        <TwoColumnRow>
                                                <FormGroup>
                                                        <label>EC Min</label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={newProfile.ecMin}
                                                            onChange={(e) => setNewProfile({ ...newProfile, ecMin: e.target.value })}
                                                        />
                                                </FormGroup>
                                                <FormGroup>
                                                        <label>EC Max</label>
                                                        <Input
                                                            type="number"
                                                            step="0.1"
                                                            value={newProfile.ecMax}
                                                            onChange={(e) => setNewProfile({ ...newProfile, ecMax: e.target.value })}
                                                        />
                                                </FormGroup>
                                        </TwoColumnRow>

                                        <SaveButton onClick={handleSave}>Save Changes</SaveButton>
                                </FormContainer>
                        </ModalBackground>
                    )}
            </PageContainer>
        );
};

export default PlantManagement;
