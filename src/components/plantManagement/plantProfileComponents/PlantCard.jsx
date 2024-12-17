// PlantCard.jsx
import React from 'react';
import {
    PlantCardContainer,
    PlantImage,
    PlantOverlay,
    PlantTitle,
    ActiveIconButton,
    IconButton
} from "../../../styles.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PlantCard = ({
                       id,
                       imageUrl,
                       title,
                       onClick,
                       onEdit,
                       onDelete,
                       isDefault,
                       isActive,
                   }) => (
    <PlantCardContainer
        onClick={onClick}
        isActive={isActive}
        style={{
            cursor: 'pointer',
            border: isActive ? '2px solid #33d69f' : 'none',
            boxShadow: isActive ? '0 0 10px rgba(51, 214, 159, 0.5)' : 'none' // Add shadow for visual emphasis
        }}
    >
        <PlantImage src={imageUrl} alt={title} />
        <PlantOverlay>
            <PlantTitle>{title}</PlantTitle>
            {!isDefault && (
                <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                    <EditIcon
                        style={{ cursor: "pointer", color: "white" }}
                        onClick={(e) => { e.stopPropagation(); onEdit(); }}
                    />
                    <DeleteIcon
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={(e) => { e.stopPropagation(); onDelete(); }}
                    />
                </div>
            )}
            {isActive && (
                <ActiveIconButton>
                    <CheckCircleIcon style={{ marginRight: '4px' }} /> Active
                </ActiveIconButton>
            )}
        </PlantOverlay>
    </PlantCardContainer>
);

export default PlantCard;
