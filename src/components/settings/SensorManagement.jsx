import React, { useState } from "react";
import { useSensorService } from "../../services/SensorService.jsx";
import {
    Container, SensorGrid, SensorCardContainer, Form, Input, Button, Section, Heading, FormContainer
} from "../../styles.js";
import SensorCard from "../SensorCard";
import StyledGaugeChart from "../StyledGaugeChart";
import { Thermostat, Add, Delete, Edit, Wifi, Home } from "@mui/icons-material";

const SensorManagement = () => {
    const { sensors, addSensor, editSensor, deleteSensor, toggleActivation } = useSensorService();
    const [name, setName] = useState("");
    const [sensorType, setSensorType] = useState("");
    const [isWireless, setIsWireless] = useState(false);
    const [address, setAddress] = useState("");
    const [editingId, setEditingId] = useState(null);

    const handleAddOrEditSensor = (e) => {
        e.preventDefault();
        if (editingId) {
            editSensor(editingId, { name, sensorType, isWireless, address });
            setEditingId(null);
        } else {
            addSensor({ name, sensorType, isWireless, address });
        }
        setName("");
        setSensorType("");
        setIsWireless(false);
        setAddress("");
    };

    const handleEditClick = (sensor) => {
        setName(sensor.name);
        setSensorType(sensor.sensorType);
        setIsWireless(sensor.isWireless);
        setAddress(sensor.address);
        setEditingId(sensor.id);
    };

    return (
        <Container>
            {/* Existing Sensors Section */}
            <Section>
                <Heading>Existing Sensors</Heading>
                <SensorGrid>
                    {sensors.map((sensor) => (
                        <SensorCardContainer key={sensor.id}>
                            <SensorCard
                                title={sensor.name}
                                value={sensor.lastReading}
                                status={sensor.isEnabled ? "Active" : "Inactive"}
                            />
                            {/*<StyledGaugeChart*/}
                            {/*    title={sensor.sensorType}*/}
                            {/*    value={Math.random() * 100} // Mocked value*/}
                            {/*    maxValue={100}*/}
                            {/*    unit=""*/}
                            {/*/>*/}
                            <div style={{ marginTop: "15px" }}>
                                <Button onClick={() => handleEditClick(sensor)}>
                                    <Edit /> Edit
                                </Button>
                                <Button onClick={() => deleteSensor(sensor.id)}>
                                    <Delete /> Delete
                                </Button>
                                <Button onClick={() => toggleActivation(sensor.id)}>
                                    {sensor.isEnabled ? <Wifi /> : <Home />}
                                    {sensor.isEnabled ? "Deactivate" : "Activate"}
                                </Button>
                            </div>
                        </SensorCardContainer>
                    ))}
                </SensorGrid>
            </Section>

            {/* Add/Edit Sensor Form */}
            <Section>
                <Heading>Add or Edit Sensor</Heading>
                <FormContainer>
                    <Form onSubmit={handleAddOrEditSensor}>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                            <Input
                                type="text"
                                placeholder="Sensor Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <Thermostat style={{ marginLeft: "10px", fontSize: "20px" }} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                            <Input
                                type="text"
                                placeholder="Sensor Type"
                                value={sensorType}
                                onChange={(e) => setSensorType(e.target.value)}
                                required
                            />
                            <Wifi style={{ marginLeft: "10px", fontSize: "20px" }} />
                        </div>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                            <Input
                                type="checkbox"
                                checked={isWireless}
                                onChange={(e) => setIsWireless(e.target.checked)}
                            />
                            <span style={{ marginLeft: "10px" }}>Wireless</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", marginBottom: "15px" }}>
                            <Input
                                type="text"
                                placeholder="Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                            <Home style={{ marginLeft: "10px", fontSize: "20px" }} />
                        </div>
                        <Button type="submit" style={{ display: "flex", alignItems: "center" }}>
                            <Add style={{ marginRight: "10px" }} />
                            {editingId ? "Update Sensor" : "Add Sensor"}
                        </Button>
                    </Form>
                </FormContainer>
            </Section>
        </Container>
    );
};

export default SensorManagement;
