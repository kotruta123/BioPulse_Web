import React from 'react';
import { SensorCardContainer, SensorIcon, SensorValue, SensorStatus, SensorTitle } from '../../styles.js';
import { Thermostat, WaterDrop, Opacity, LightMode, Science } from '@mui/icons-material';

const getIcon = (title) => {
    switch(title) {
        case "Humidity": return <Opacity />;
        case "Temp": return <Thermostat />;
        case "Water EC": return <Science />;
        case "pH": return <WaterDrop />;
        case "Light": return <LightMode />;
        default: return null;
    }
};

const SensorCard = ({ title, value, status }) => (
    <SensorCardContainer>
        <SensorIcon>{getIcon(title)}</SensorIcon>
        <SensorTitle>{title}</SensorTitle>
        <SensorValue>{value}</SensorValue>
        <SensorStatus status={status}>{status}</SensorStatus>
    </SensorCardContainer>
);

export default SensorCard;
