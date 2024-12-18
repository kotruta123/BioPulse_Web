// components/sensorManagement/SensorManagement.jsx
import React from "react";
import { useSensorService } from "../../services/SensorService.jsx";
import {
    Container,
    SensorGrid,
    SensorCardContainer,
    Button,
    Section,
    Heading,
} from "../../styles.js";
import SensorCard from "./SensorCard.jsx";

const SensorManagement = () => {
    const { sensors, dashboardSensors, addToDashboard, removeFromDashboard } = useSensorService();

    const handleAddToDashboard = (sensor) => {
        addToDashboard(sensor);
    };

    const handleRemoveFromDashboard = (sensorId) => {
        removeFromDashboard(sensorId);
    };

    const isSensorInDashboard = (sensorId) => {
        return dashboardSensors.some((s) => s.id === sensorId);
    };

    return (
        <Container>
            <Section>
                <Heading>Sensor Management</Heading>
                <SensorGrid>
                    {sensors.map((sensor) => (
                        <SensorCardContainer key={sensor.id}>
                            <SensorCard
                                title={sensor.name}
                                value={
                                    sensor.sensorReadings.length > 0
                                        ? sensor.sensorReadings[sensor.sensorReadings.length - 1].value
                                        : "N/A"
                                }
                                status={sensor.connectionDetails}
                            />
                            <div style={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
                                {isSensorInDashboard(sensor.id) ? (
                                    <Button onClick={() => handleRemoveFromDashboard(sensor.id)} color="secondary">
                                        Remove from Dashboard
                                    </Button>
                                ) : (
                                    <Button onClick={() => handleAddToDashboard(sensor)} color="primary">
                                        Add to Dashboard
                                    </Button>
                                )}
                            </div>
                        </SensorCardContainer>
                    ))}
                </SensorGrid>
            </Section>
        </Container>
    );
};

export default SensorManagement;
