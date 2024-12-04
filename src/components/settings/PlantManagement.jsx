
// eslint-disable-next-line no-unused-vars
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
                        status: "Active",
                        imageUrl: "/images/cabbage.jpg",
                        ph_range: "6.0-7.5",
                        ec_range: "1.5-2.5",
                        temp_range: "15-20°C",
                        light_cycle: "16 hours",
                        isDefault: true,
                },
                {
                        id: 2,
                        name: "Tomato",
                        imageUrl: "/images/tomato.jpg",
                        ph_range: "5.5-6.5",
                        ec_range: "2.0-4.0",
                        temp_range: "20-25°C",
                        light_cycle: "12 hours",
                        isDefault: true,
                },
                { id: 3, name: "Lettuce", imageUrl: "/images/lettuce.jpg", isDefault: true },
                { id: 4, name: "Spinach", imageUrl: "/images/spinach.jpg", isDefault: true },
                { id: 5, name: "Strawberry", imageUrl: "/images/strawberry.jpg", isDefault: true },
                { id: 6, name: "Basil", imageUrl: "/images/basil.jpg", isDefault: true },
        ]);

        const [newProfile, setNewProfile] = useState({
                name: "",
                status: "",
                ph_range: "",
                ec_range: "",
                temp_range: "",
                light_cycle: "",
                imageUrl: null,
        });

        const [editingProfile, setEditingProfile] = useState(null);

        const handleEdit = (profile) => {
                setEditingProfile(profile);
                setNewProfile({ ...profile, imageUrl: null });
        };

        const handleSave = (e) => {
                e.preventDefault();
                if (!newProfile.name || !newProfile.imageUrl) return alert("Please fill in all required fields.");
                const id = Date.now();
                const updatedProfiles = editingProfile
                    ? plantProfiles.map((profile) => (profile.id === id ? { ...newProfile, id } : profile))
                    : [...plantProfiles, { ...newProfile, id, isDefault: false }];

                setPlantProfiles(updatedProfiles);
                setNewProfile({ name: "", status: "", ph_range: "", ec_range: "", temp_range: "", light_cycle: "", imageUrl: null });
                setEditingProfile(null);
        };

        const handleImageUpload = (e) => {
                const file = e.target.files[0];
                if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setNewProfile({ ...newProfile, imageUrl: reader.result });
                        reader.readAsDataURL(file);
                }
        };

        const handleDelete = (id) => {
                setPlantProfiles((prev) => prev.filter((profile) => profile.id !== id));
        };

        return (
            <div>
                    <PlantGrid>
                            {plantProfiles.map((profile) => (
                                <PlantCardContainer key={profile.id} isActive={profile.status === "Active"}>
                                        <PlantImage src={profile.imageUrl} alt={profile.name} />
                                        <PlantOverlay>
                                                <PlantTitle>{profile.name}</PlantTitle>
                                                <PlantStatus>{profile.status || "Custom Plant"}</PlantStatus>
                                                {profile.isDefault ? (
                                                    <EditIcon
                                                        style={{ cursor: "pointer", marginTop: "10px" }}
                                                        onClick={() => handleEdit(profile)}
                                                    />
                                                ) : (
                                                    <div style={{ marginTop: "10px" }}>
                                                            <EditIcon
                                                                style={{ cursor: "pointer", marginRight: "10px" }}
                                                                onClick={() => handleEdit(profile)}
                                                            />
                                                            <DeleteIcon style={{ cursor: "pointer" }} onClick={() => handleDelete(profile.id)} />
                                                    </div>
                                                )}
                                        </PlantOverlay>
                                </PlantCardContainer>
                            ))}
                    </PlantGrid>

                    <Form onSubmit={handleSave} style={{ marginTop: "20px" }}>
                            <h3>{editingProfile ? `Edit Plant: ${editingProfile.name}` : "Add New Plant Profile"}</h3>
                            <Input
                                type="text"
                                placeholder="Plant Name"
                                value={newProfile.name}
                                onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                                required
                            />
                            <Input
                                type="text"
                                placeholder="pH Range (e.g., 6.0-7.5)"
                                value={newProfile.ph_range}
                                onChange={(e) => setNewProfile({ ...newProfile, ph_range: e.target.value })}
                            />
                            <Input
                                type="text"
                                placeholder="EC Range (e.g., 1.5-2.5)"
                                value={newProfile.ec_range}
                                onChange={(e) => setNewProfile({ ...newProfile, ec_range: e.target.value })}
                            />
                            <Input
                                type="text"
                                placeholder="Temperature Range (e.g., 15-20°C)"
                                value={newProfile.temp_range}
                                onChange={(e) => setNewProfile({ ...newProfile, temp_range: e.target.value })}
                            />
                            <Input
                                type="text"
                                placeholder="Light Cycle (e.g., 16 hours)"
                                value={newProfile.light_cycle}
                                onChange={(e) => setNewProfile({ ...newProfile, light_cycle: e.target.value })}
                            />
                            <Input type="file" accept="image/*" onChange={handleImageUpload} />
                            {newProfile.imageUrl && (
                                <div style={{ margin: "10px 0" }}>
                                        <img
                                            src={newProfile.imageUrl}
                                            alt="Preview"
                                            style={{ width: "100px", height: "100px", borderRadius: "8px", objectFit: "cover" }}
                                        />
                                </div>
                            )}
                            <Button type="submit">{editingProfile ? "Save Changes" : "Add Plant"}</Button>
                    </Form>
            </div>
        );

};

export default PlantManagement;
