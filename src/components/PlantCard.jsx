import React from 'react';
import { PlantCardContainer, PlantImage, PlantOverlay, PlantTitle, PlantStatus } from '../styles';

const PlantCard = ({ imageUrl, title, status, isActive }) => (
    <PlantCardContainer isActive={isActive}>
        <PlantImage src={imageUrl} alt={title} />
        <PlantOverlay>
            {status && <PlantStatus>{status}</PlantStatus>}
            <PlantTitle>{title}</PlantTitle>
        </PlantOverlay>
    </PlantCardContainer>
);

export default PlantCard;
