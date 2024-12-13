import React, { useState, useEffect } from "react";
import {
        PlantGrid,
        PlantCardContainer,
        PlantImage,
        PlantOverlay,
        PlantTitle,
        Input,
        Form,
} from "../../styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import strawberryImage from "../../../public/images/strawberry.jpg";
import {
        getPlantProfiles,
        addPlantProfile,
        updatePlantProfile,
        deletePlantProfile
} from "../../services/PlantService.jsx";
import styled, { keyframes, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
        body {
                position: relative;
        }
`;

const fadeIn = keyframes`
        0% { opacity: 0; transform: translateY(-10px); }
        100% { opacity: 1; transform: translateY(0); }
`;

const fadeOut = keyframes`
        from {opacity:1;}
        to {opacity:0;}
`;

const PageContainer = styled.div`
        padding: 20px;
        animation: ${fadeIn} 0.5s ease forwards;
        min-height: 100vh;
        background: #f0f2f5;
        position: relative;
`;

const AddButton = styled.button`
        font-size: 16px;
        background: linear-gradient(to right, #4a90e2, #0072ff);
        color: #fff;
        border-radius: 8px;
        padding: 12px 20px;
        cursor: pointer;
        border: none;
        margin-top: 20px;
        transition: transform 0.2s ease-in-out, background 0.3s;
        font-weight: 600;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);

        &:hover {
                transform: scale(1.03);
                background: linear-gradient(to right, #0072ff, #4a90e2);
        }
`;

const ModalBackground = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        animation: ${fadeIn} 0.3s ease forwards;
`;

const FormContainer = styled(Form)`
        background: #ffffff;
        border-radius: 12px;
        padding: 30px 30px 40px;
        max-width: 700px;
        width: 90%;
        box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        animation: ${fadeIn} 0.5s ease forwards;
        position: relative;
`;

const CloseButton = styled.button`
        background: transparent;
        border: none;
        font-size: 22px;
        color: #999;
        cursor: pointer;
        position: absolute;
        top: 15px;
        right: 20px;

        &:hover {
                color: #666;
        }
`;

const FormHeader = styled.h3`
        font-size: 22px;
        margin-bottom: 25px;
        color: #333;
        text-align: center;
        font-weight: 700;
`;

const FullWidthGroup = styled.div`
        grid-column: 1 / -1;
        display: flex;
        flex-direction: column;
        align-items: center;

        label {
                font-size: 14px;
                font-weight: 600;
                margin-bottom: 8px;
                color: #333;
                text-align: center;
        }

        ${Input} {
                text-align: center;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
                background: #fafafa;
                width: 70%;
                max-width: 300px;
                transition: border 0.2s;
                &:focus {
                        border-color: #4a90e2;
                        outline: none;
                }
        }
`;

const FormGroup = styled.div`
        display: flex;
        flex-direction: column;

        label {
                font-size: 14px;
                font-weight: 600;
                margin-bottom: 8px;
                color: #333;
        }

        ${Input} {
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
                background: #fafafa;
                transition: border 0.2s;
                &:focus {
                        border-color: #4a90e2;
                        outline: none;
                }
        }
`;

const TwoColumnRow = styled.div`
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 30px;
        grid-column: 1 / -1; /* full width of the grid */
        margin-top: 20px;
`;

const SaveButton = styled.button`
        margin-top: 30px;
        width: 100%;
        background: linear-gradient(to right, #4a90e2, #0072ff);
        padding: 14px 0;
        font-size: 16px;
        font-weight: 600;
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: transform 0.2s ease-in-out, background 0.3s;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);

        &:hover {
                transform: scale(1.02);
                background: linear-gradient(to right, #0072ff, #4a90e2);
        }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const DataCard = styled.div`
  background: #f9fafc;
  border-radius: 10px;
  margin-top: 30px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  animation: ${fadeIn} 0.5s ease forwards;
  max-width: 700px;
  width: 100%;
  margin: 30px auto;

  h4 {
    font-size: 20px;
    margin-bottom: 25px;
    font-weight: 700;
    color: #333;
    text-align: center;
  }

  .data-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
  }

  .data-item {
    background: #fff;
    border-radius: 8px;
    padding: 12px;
    border: 1px solid #eee;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    span.label {
      font-size: 12px;
      color: #666;
      margin-bottom: 5px;
    }

    span.value {
      font-size: 14px;
      font-weight: 600;
      color: #333;
    }
  }
`;

// Success and Error banners
const MessageBanner = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  text-align: center;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease forwards;
  ${({ type }) => type === 'success' && `background: #4caf50;`}
  ${({ type }) => type === 'error' && `background: #f44336;`}
`;

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
                                setPlantProfiles(profiles);
                        } catch (error) {
                                console.error("Error fetching plant profiles:", error);
                                setErrorMessage("Failed to load plant profiles.");
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
                        ecMax: parseFloat(newProfile.ecMax)
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
                        const profiles = await getPlantProfiles();
                        setPlantProfiles(profiles);

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
                                        <PlantImage src={strawberryImage} alt={profile.name} />
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
                                        <FormHeader>{editingProfile ? `Edit Plant: ${editingProfile.name}` : "Add New Plant Profile"}</FormHeader>

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
