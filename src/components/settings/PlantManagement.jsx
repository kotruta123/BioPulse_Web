import React, { useState } from "react";
import {
        PlantGrid,
        PlantCardContainer,
        PlantImage,
        PlantOverlay,
        PlantTitle,
        PlantStatus,
        Input,
        Button,
        Form,
} from "../../styles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PlantManagement = () => {
        const [plantProfiles, setPlantProfiles] = useState([
                {
                        id: 1,
                        name: "Cabbage",
                        status: "Inactive",
                        imageUrl: "/images/cabbage.jpg",
                        sensors: [
                                { id: 101, type: "Temperature", range: "18°C - 24°C" },
                                { id: 102, type: "pH", range: "6.0 - 6.5" },
                        ],
                        isDefault: true,
                },
                {
                        id: 2,
                        name: "Tomato",
                        status: "Inactive",
                        imageUrl: "/images/tomato.jpg",
                        sensors: [
                                { id: 201, type: "Light", range: "12 hours/day" },
                                { id: 202, type: "EC", range: "1.8 - 2.3 mS/cm" },
                        ],
                        isDefault: true,
                },
                {
                        id: 3,
                        name: "Lettuce",
                        status: "Inactive",
                        imageUrl: "/images/lettuce.jpg",
                        sensors: [
                                { id: 301, type: "Temperature", range: "15°C - 20°C" },
                                { id: 302, type: "pH", range: "5.5 - 6.0" },
                        ],
                        isDefault: true,
                },
                {
                        id: 4,
                        name: "Spinach",
                        status: "Inactive",
                        imageUrl: "/images/spinach.jpg",
                        sensors: [
                                { id: 401, type: "Temperature", range: "16°C - 24°C" },
                                { id: 402, type: "Light", range: "10 hours/day" },
                        ],
                        isDefault: false,
                },
                {
                        id: 5,
                        name: "Carrot",
                        status: "Inactive",
                        imageUrl: "/images/carrot.jpg",
                        sensors: [
                                { id: 501, type: "pH", range: "6.0 - 6.8" },
                                { id: 502, type: "EC", range: "1.6 - 2.2 mS/cm" },
                        ],
                        isDefault: false,
                },
        ]);


        const [newProfile, setNewProfile] = useState({ name: "", imageUrl: null, sensors: [] });
        const [editingProfile, setEditingProfile] = useState(null);
        const [newSensor, setNewSensor] = useState({ type: "", range: "" });
        const [showSensorInput, setShowSensorInput] = useState(false);
        const [errors, setErrors] = useState({});
        const [isAddingNewPlant, setIsAddingNewPlant] = useState(false);

        const sensorTypes = ["Temperature", "pH", "EC", "Light"];

        const resetForm = () => {
                setNewProfile({ name: "", imageUrl: null, sensors: [] });
                setEditingProfile(null);
                setErrors({});
        };

        const handleEdit = (profile) => {
                resetForm();
                setEditingProfile(profile);
                setNewProfile({ ...profile });
        };

        const handleSave = (e) => {
                e.preventDefault();
                let formErrors = {};
                if (!newProfile.name) formErrors.name = "Plant name is required.";
                if (!newProfile.imageUrl) formErrors.imageUrl = "Plant image is required.";

                if (Object.keys(formErrors).length > 0) {
                        setErrors(formErrors);
                        return;
                }

                if (editingProfile) {
                        const updatedProfiles = plantProfiles.map((profile) =>
                            profile.id === editingProfile.id ? { ...newProfile } : profile
                        );
                        setPlantProfiles(updatedProfiles);
                } else {
                        const newPlant = { ...newProfile, id: Date.now(), isDefault: false };
                        setPlantProfiles([...plantProfiles, newPlant]);
                }

                resetForm();
                setIsAddingNewPlant(false);
        };

        const handleImageUpload = (e) => {
                const file = e.target.files[0];
                if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setNewProfile({ ...newProfile, imageUrl: reader.result });
                        reader.readAsDataURL(file);
                }
        };

        const handleActivate = (id) => {
                const updatedProfiles = plantProfiles.map((profile) =>
                    profile.id === id
                        ? { ...profile, status: "Active" }
                        : { ...profile, status: "Inactive" }
                );
                setPlantProfiles(updatedProfiles);
        };

        const handleDeleteProfile = (id) => {
                setPlantProfiles(plantProfiles.filter((profile) => profile.id !== id || profile.isDefault));
        };

        const handleAddSensor = () => {
                setShowSensorInput(true);
        };

        const handleSaveSensor = () => {
                let formErrors = {};
                if (!newSensor.type) formErrors.sensorType = "Sensor type is required.";
                if (!newSensor.min || isNaN(newSensor.min)) formErrors.sensorMin = "Valid minimum value is required.";
                if (!newSensor.max || isNaN(newSensor.max)) formErrors.sensorMax = "Valid maximum value is required.";
                if (Object.keys(formErrors).length > 0) {
                        setErrors(formErrors);
                        return;
                }
                setNewProfile({
                        ...newProfile,
                        sensors: [
                                ...newProfile.sensors,
                                { ...newSensor, id: Date.now() },
                        ],
                });
                setNewSensor({ type: "", min: "", max: "" });
                setShowSensorInput(false);
                setErrors({});
        };

        const handleDeleteSensor = (id) => {
                setNewProfile({
                        ...newProfile,
                        sensors: newProfile.sensors.filter((sensor) => sensor.id !== id),
                });
        };

        const handleAddNewPlant = () => {
                resetForm();
                setIsAddingNewPlant(true);
        };

        return (
            <div style={{ padding: "20px" }}>
                    {/* Plant Profiles */}
                    <PlantGrid>
                            {plantProfiles.map((profile) => (
                                <PlantCardContainer key={profile.id} isActive={profile.status === "Active"}>
                                        <PlantImage src={profile.imageUrl} alt={profile.name} />
                                        <PlantOverlay>
                                                <PlantTitle>{profile.name}</PlantTitle>
                                                <PlantStatus>{profile.status || "Inactive"}</PlantStatus>
                                                <EditIcon
                                                    style={{ cursor: "pointer", color: "white", marginTop: "10px" }}
                                                    onClick={() => handleEdit(profile)}
                                                />
                                                {!profile.isDefault && (
                                                    <DeleteIcon
                                                        style={{ cursor: "pointer", color: "red", marginTop: "10px" }}
                                                        onClick={() => handleDeleteProfile(profile.id)}
                                                    />
                                                )}
                                        </PlantOverlay>
                                </PlantCardContainer>
                            ))}
                            <Button
                                style={{
                                        marginTop: "20px",
                                        fontSize: "18px",
                                        background: "linear-gradient(to right, #00c6ff, #0072ff)",
                                        color: "white",
                                        borderRadius: "10px",
                                        padding: "15px",
                                        cursor: "pointer",
                                        transition: "transform 0.2s ease-in-out",
                                        boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
                                }}
                                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                                onClick={handleAddNewPlant}
                            >
                                    Add New Plant Profile +
                            </Button>
                    </PlantGrid>

                    {/* Add/Edit Profile Form */}
                    {(isAddingNewPlant || editingProfile) && (
                        <Form style={{ marginTop: "20px", animation: "fadeIn 0.5s ease-in-out" }}>
                                <h3>{editingProfile ? `Edit Plant: ${editingProfile.name}` : "Add New Plant Profile"}</h3>
                                <Input
                                    type="text"
                                    placeholder="Plant Name"
                                    value={newProfile.name}
                                    onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                                />
                                {errors.name && <p style={{ color: "red", fontSize: "12px" }}>{errors.name}</p>}

                                <h4 style={{ marginTop: "20px" }}>Sensors</h4>
                                {newProfile.sensors.map((sensor) => (
                                    <div key={sensor.id} style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                                            <span style={{ marginRight: "10px", fontWeight: "bold" }}>{sensor.type}</span>
                                            <Input
                                                type="text"
                                                value={sensor.range}
                                                placeholder="Working Range"
                                                onChange={(e) =>
                                                    setNewProfile({
                                                            ...newProfile,
                                                            sensors: newProfile.sensors.map((s) =>
                                                                s.id === sensor.id ? { ...s, range: e.target.value } : s
                                                            ),
                                                    })
                                                }
                                                style={{
                                                        flex: "1",
                                                        marginRight: "10px",
                                                        borderRadius: "5px",
                                                        border: "1px solid #ddd",
                                                        padding: "10px",
                                                }}
                                            />
                                            <DeleteIcon
                                                style={{ cursor: "pointer", color: "red" }}
                                                onClick={() => handleDeleteSensor(sensor.id)}
                                            />
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    style={{
                                            marginTop: "10px",
                                            backgroundColor: "#28a745",
                                            color: "white",
                                            borderRadius: "5px",
                                            padding: "10px 15px",
                                            transition: "transform 0.2s ease-in-out",
                                    }}
                                    onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                                    onClick={handleAddSensor}
                                >
                                        Add Sensor +
                                </Button>
                                {showSensorInput && (
                                    <div style={{ marginTop: "10px" }}>
                                            <select
                                                value={newSensor.type}
                                                onChange={(e) => setNewSensor({ ...newSensor, type: e.target.value })}
                                                style={{
                                                        marginBottom: "10px",
                                                        padding: "10px",
                                                        borderRadius: "5px",
                                                        backgroundColor: "#f7f7f7",
                                                        border: "1px solid #ddd",
                                                        outline: "none",
                                                        cursor: "pointer",
                                                        transition: "all 0.3s ease",
                                                }}
                                                onFocus={(e) => (e.target.style.boxShadow = "0 0 10px rgba(0, 123, 255, 0.5)")}
                                                onBlur={(e) => (e.target.style.boxShadow = "none")}
                                            >
                                                    <option value="">Select Sensor Type</option>
                                                    {sensorTypes.map((type) => (
                                                        <option key={type} value={type}>
                                                                {type}
                                                        </option>
                                                    ))}
                                            </select>
                                            {errors.sensorType && <p style={{ color: "red", fontSize: "12px" }}>{errors.sensorType}</p>}
                                            <Input
                                                name="sensor-min"
                                                placeholder="Min Value"
                                                value={newSensor.min}
                                                onChange={(e) => setNewSensor({ ...newSensor, min: e.target.value })}
                                            />
                                            <Input
                                                name="sensor-max"
                                                placeholder="Max Value"
                                                value={newSensor.max}
                                                onChange={(e) => setNewSensor({ ...newSensor, max: e.target.value })}
                                            />
                                            {errors.sensorRange && <p style={{ color: "red", fontSize: "12px" }}>{errors.sensorRange}</p>}
                                            <Button
                                                type="button"
                                                onClick={handleSaveSensor}
                                                style={{
                                                        marginRight: "10px",
                                                        backgroundColor: "#007bff",
                                                        color: "white",
                                                        borderRadius: "5px",
                                                        padding: "10px 15px",
                                                        transition: "transform 0.2s ease-in-out",
                                                }}
                                                onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                                                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                                            >
                                                    Save Sensor
                                            </Button>
                                    </div>
                                )}

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{
                                            marginTop: "20px",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            border: "1px solid #ddd",
                                    }}
                                />
                                {errors.imageUrl && <p style={{ color: "red", fontSize: "12px" }}>{errors.imageUrl}</p>}

                                <Button
                                    type="submit"
                                    onClick={handleSave}
                                    style={{
                                            marginTop: "20px",
                                            backgroundColor: "#007bff",
                                            color: "white",
                                            borderRadius: "5px",
                                            padding: "10px 15px",
                                            transition: "transform 0.2s ease-in-out",
                                    }}
                                    onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                                    onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                                >
                                        Save Changes
                                </Button>
                                {editingProfile && (
                                    <Button
                                        type="button"
                                        onClick={() => handleActivate(editingProfile.id)}
                                        style={{
                                                marginTop: "10px",
                                                backgroundColor: "greenyellow",
                                                color: "white",
                                                borderRadius: "5px",
                                                padding: "10px 15px",
                                                transition: "transform 0.2s ease-in-out",
                                        }}
                                        onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                                        onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                                    >
                                            Activate
                                    </Button>
                                )}
                        </Form>
                    )}
            </div>
        );
};

export default PlantManagement;
