// components/sensorManagement/SensorCard.jsx
import React from 'react';
import { SensorCardContainer, SensorIcon, SensorValue, SensorStatus, SensorTitle } from '../../styles.js';
import { Thermostat, WaterDrop, Opacity, LightMode, Science } from '@mui/icons-material';
import PropTypes from 'prop-types';

const getIcon = (title) => {
    switch(title.toLowerCase()) {
        case "humidity": return <Opacity />;
        case "temperature sensor": return <Thermostat />;
        case "water ec": return <Science />;
        case "pH": return <WaterDrop />;
        case "light": return <LightMode />;
        default: return null;
    }
};

const SensorCard = ({ title, value, status }) => (
    <SensorCardContainer>
        <SensorIcon>{getIcon(title)}</SensorIcon>
        <SensorTitle>{title}</SensorTitle>
        <SensorValue>{value}</SensorValue>
        <SensorStatus>{status}</SensorStatus>
    </SensorCardContainer>
);

SensorCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    status: PropTypes.string.isRequired,
};

export default SensorCard;
