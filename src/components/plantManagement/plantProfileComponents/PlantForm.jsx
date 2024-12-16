import React from 'react';
import {
    ModalBackground,
    FormContainer,
    CloseButton,
    FormHeader,
    FullWidthGroup,
    FormGroup,
    TwoColumnRow,
    SaveButton,
    ErrorMessage,
} from "../PlantStyles.js";
import {Input} from "../../../styles.js";
import ParticlesBackground from "./ParticlesBackground.jsx";

const PlantForm = ({ profile, formData, setFormData, onClose, onSave, errors }) => {
    return (
        <ModalBackground>
            <FormContainer onSubmit={onSave}>
                <ParticlesBackground
                    particleCount={80}
                    particleSpeed={0.8}
                    opacity={0.2}
                    zIndex={0}
                    enableHoverEffect={false}
                    customStyle={{ filter: "blur(1px)" }}
                />
                <CloseButton onClick={onClose}>×</CloseButton>
                <FormHeader>
                    {profile ? `Edit Plant: ${profile.name}` : "Add New Plant Profile"}
                </FormHeader>

                <FullWidthGroup>
                    <label>Plant Name</label>
                    <Input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                            value={formData.phMin}
                            onChange={(e) => setFormData({ ...formData, phMin: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>pH Max</label>
                        <Input
                            type="number"
                            step="0.1"
                            value={formData.phMax}
                            onChange={(e) => setFormData({ ...formData, phMax: e.target.value })}
                        />
                    </FormGroup>
                </TwoColumnRow>

                <TwoColumnRow>
                    <FormGroup>
                        <label>Temp Min (°C)</label>
                        <Input
                            type="number"
                            step="0.1"
                            value={formData.temperatureMin}
                            onChange={(e) => setFormData({ ...formData, temperatureMin: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Temp Max (°C)</label>
                        <Input
                            type="number"
                            step="0.1"
                            value={formData.temperatureMax}
                            onChange={(e) => setFormData({ ...formData, temperatureMax: e.target.value })}
                        />
                    </FormGroup>
                </TwoColumnRow>

                <TwoColumnRow>
                    <FormGroup>
                        <label>Light On Time</label>
                        <Input
                            type="datetime-local"
                            value={new Date(formData.lightOnTime).toISOString().slice(0, 16)}
                            onChange={(e) => setFormData({ ...formData, lightOnTime: new Date(e.target.value).toISOString() })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Light Off Time</label>
                        <Input
                            type="datetime-local"
                            value={new Date(formData.lightOffTime).toISOString().slice(0, 16)}
                            onChange={(e) => setFormData({ ...formData, lightOffTime: new Date(e.target.value).toISOString() })}
                        />
                    </FormGroup>
                </TwoColumnRow>

                <TwoColumnRow>
                    <FormGroup>
                        <label>Light Min</label>
                        <Input
                            type="number"
                            step="0.1"
                            value={formData.lightMin}
                            onChange={(e) => setFormData({ ...formData, lightMin: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Light Max</label>
                        <Input
                            type="number"
                            step="0.1"
                            value={formData.lightMax}
                            onChange={(e) => setFormData({ ...formData, lightMax: e.target.value })}
                        />
                    </FormGroup>
                </TwoColumnRow>

                <TwoColumnRow>
                    <FormGroup>
                        <label>EC Min</label>
                        <Input
                            type="number"
                            step="0.1"
                            value={formData.ecMin}
                            onChange={(e) => setFormData({ ...formData, ecMin: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>EC Max</label>
                        <Input
                            type="number"
                            step="0.1"
                            value={formData.ecMax}
                            onChange={(e) => setFormData({ ...formData, ecMax: e.target.value })}
                        />
                    </FormGroup>
                </TwoColumnRow>

                <SaveButton type="submit">Save Changes</SaveButton>
            </FormContainer>
        </ModalBackground>
    );
};

export default PlantForm;
