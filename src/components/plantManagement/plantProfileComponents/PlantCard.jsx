import React from 'react';
import {
    PlantCardContainer,
    PlantImage,
    PlantOverlay,
    PlantTitle,
} from "../../../styles.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const PlantCard = ({ id, imageUrl, title, onClick, onEdit, onDelete, isDefault }) => (
    <PlantCardContainer onClick={onClick} style={{ cursor: 'pointer' }}>
        <PlantImage src={imageUrl} alt={title} />
        <PlantOverlay>
            <PlantTitle>{title}</PlantTitle>
            <EditIcon
                data-testid={`edit-icon-${id}`}
                style={{ cursor: "pointer", color: "white", marginTop: "10px" }}
                onClick={(e) => { e.stopPropagation(); onEdit(); }}
            />
            {!isDefault && (
                <DeleteIcon
                    data-testid={`delete-icon-${id}`}
                    style={{ cursor: "pointer", color: "red", marginTop: "10px" }}
                    onClick={(e) => { e.stopPropagation(); onDelete(); }}
                />
            )}
        </PlantOverlay>
    </PlantCardContainer>
);

export default PlantCard;
