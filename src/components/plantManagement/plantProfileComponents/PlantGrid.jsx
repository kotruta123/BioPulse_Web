// PlantGrid.jsx
import React from 'react';
import {
    PlantGrid as StyledPlantGrid,
    AddButton
} from "../PlantStyles.js";
import PlantCard from "./PlantCard.jsx";

const PlantGrid = ({ plantProfiles, onCardClick, onEdit, onDelete, onAddNewPlant }) => {
    return (
        <StyledPlantGrid>
            {plantProfiles.map((profile) => (
                <PlantCard
                    key={profile.id}
                    id={profile.id}
                    imageUrl={profile.imageUrl}
                    title={profile.name}
                    onClick={() => onCardClick(profile)}
                    onEdit={() => onEdit(profile)}
                    onDelete={() => onDelete(profile.id)}
                    isDefault={profile.isDefault}
                    isActive={profile.isActive}
                />
            ))}
            <AddButton onClick={onAddNewPlant}>
                Add New Plant Profile +
            </AddButton>
        </StyledPlantGrid>
    );
};

export default PlantGrid;
