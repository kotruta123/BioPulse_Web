// PlantForm.jsx
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
import { Input } from "../../../styles.js";

const PlantForm = ({ profile, formData, setFormData, onClose, onSave, errors }) => {
    // Function to format datetime-local input value
    const formatDateTimeLocal = (isoString) => {
        if (!isoString) return '';
        const date = new Date(isoString);
        const tzOffset = date.getTimezoneOffset() * 60000; // in milliseconds
        const localISOTime = (new Date(date - tzOffset)).toISOString().slice(0, 16);
        return localISOTime;
    };

    return (
        <ModalBackground>
            <FormContainer onSubmit={onSave}>
                <CloseButton onClick={onClose}>×</CloseButton>
                <FormHeader>
                    {profile ? `Edit Plant: ${profile.name}` : "Add New Plant Profile"}
                </FormHeader>

                <FullWidthGroup>
                    <label htmlFor="name">Plant Name</label>
                    <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Plant Name"
                        required
                    />
                    {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                </FullWidthGroup>

                {/* Remove isDefault field to prevent frontend from setting it */}
                <TwoColumnRow>
                    <FormGroup>
                        <label htmlFor="phMin">pH Min</label>
                        <Input
                            id="phMin"
                            type="number"
                            step="0.1"
                            value={formData.phMin}
                            onChange={(e) => setFormData({ ...formData, phMin: e.target.value })}
                            required
                        />
                        {errors.phMin && <ErrorMessage>{errors.phMin}</ErrorMessage>}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="phMax">pH Max</label>
                        <Input
                            id="phMax"
                            type="number"
                            step="0.1"
                            value={formData.phMax}
                            onChange={(e) => setFormData({ ...formData, phMax: e.target.value })}
                            required
                        />
                        {errors.phMax && <ErrorMessage>{errors.phMax}</ErrorMessage>}
                    </FormGroup>
                </TwoColumnRow>

                {/* Display pH Range Error */}
                {errors.phRange && <ErrorMessage>{errors.phRange}</ErrorMessage>}

                <TwoColumnRow>
                    <FormGroup>
                        <label htmlFor="temperatureMin">Temp Min (°C)</label>
                        <Input
                            id="temperatureMin"
                            type="number"
                            step="0.1"
                            value={formData.temperatureMin}
                            onChange={(e) => setFormData({ ...formData, temperatureMin: e.target.value })}
                            required
                        />
                        {errors.temperatureMin && <ErrorMessage>{errors.temperatureMin}</ErrorMessage>}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="temperatureMax">Temp Max (°C)</label>
                        <Input
                            id="temperatureMax"
                            type="number"
                            step="0.1"
                            value={formData.temperatureMax}
                            onChange={(e) => setFormData({ ...formData, temperatureMax: e.target.value })}
                            required
                        />
                        {errors.temperatureMax && <ErrorMessage>{errors.temperatureMax}</ErrorMessage>}
                    </FormGroup>
                </TwoColumnRow>

                {/* Display Temperature Range Error */}
                {errors.temperatureRange && <ErrorMessage>{errors.temperatureRange}</ErrorMessage>}

                <TwoColumnRow>
                    <FormGroup>
                        <label htmlFor="lightOnTime">Light On Time</label>
                        <Input
                            id="lightOnTime"
                            type="datetime-local"
                            value={formatDateTimeLocal(formData.lightOnTime)}
                            onChange={(e) => setFormData({ ...formData, lightOnTime: new Date(e.target.value).toISOString() })}
                            required
                        />
                        {errors.lightOnTime && <ErrorMessage>{errors.lightOnTime}</ErrorMessage>}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="lightOffTime">Light Off Time</label>
                        <Input
                            id="lightOffTime"
                            type="datetime-local"
                            value={formatDateTimeLocal(formData.lightOffTime)}
                            onChange={(e) => setFormData({ ...formData, lightOffTime: new Date(e.target.value).toISOString() })}
                            required
                        />
                        {errors.lightOffTime && <ErrorMessage>{errors.lightOffTime}</ErrorMessage>}
                    </FormGroup>
                </TwoColumnRow>

                {/* Display Light Time Range Error */}
                {errors.lightTimeRange && <ErrorMessage>{errors.lightTimeRange}</ErrorMessage>}

                <TwoColumnRow>
                    <FormGroup>
                        <label htmlFor="lightMin">Light Min</label>
                        <Input
                            id="lightMin"
                            type="number"
                            step="0.1"
                            value={formData.lightMin}
                            onChange={(e) => setFormData({ ...formData, lightMin: e.target.value })}
                            required
                        />
                        {errors.lightMin && <ErrorMessage>{errors.lightMin}</ErrorMessage>}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="lightMax">Light Max</label>
                        <Input
                            id="lightMax"
                            type="number"
                            step="0.1"
                            value={formData.lightMax}
                            onChange={(e) => setFormData({ ...formData, lightMax: e.target.value })}
                            required
                        />
                        {errors.lightMax && <ErrorMessage>{errors.lightMax}</ErrorMessage>}
                    </FormGroup>
                </TwoColumnRow>

                <TwoColumnRow>
                    <FormGroup>
                        <label htmlFor="ecMin">EC Min</label>
                        <Input
                            id="ecMin"
                            type="number"
                            step="0.1"
                            value={formData.ecMin}
                            onChange={(e) => setFormData({ ...formData, ecMin: e.target.value })}
                            required
                        />
                        {errors.ecMin && <ErrorMessage>{errors.ecMin}</ErrorMessage>}
                    </FormGroup>
                    <FormGroup>
                        <label htmlFor="ecMax">EC Max</label>
                        <Input
                            id="ecMax"
                            type="number"
                            step="0.1"
                            value={formData.ecMax}
                            onChange={(e) => setFormData({ ...formData, ecMax: e.target.value })}
                            required
                        />
                        {errors.ecMax && <ErrorMessage>{errors.ecMax}</ErrorMessage>}
                    </FormGroup>
                </TwoColumnRow>

                {/* Cross-field Errors */}
                {errors.phRange && <ErrorMessage>{errors.phRange}</ErrorMessage>}
                {errors.temperatureRange && <ErrorMessage>{errors.temperatureRange}</ErrorMessage>}
                {errors.lightTimeRange && <ErrorMessage>{errors.lightTimeRange}</ErrorMessage>}

                <SaveButton type="submit">Save Changes</SaveButton>
            </FormContainer>
        </ModalBackground>
    );

};

export default PlantForm;
