import React, { useState } from 'react';
import { useSensorService } from '../../services/SensorService.jsx';
import { Form, Input, Button, Container } from '../../styles.js';

const SensorManagement = () => {
    const { sensors, addSensor } = useSensorService();
    const [type, setType] = useState('');
    const [frequency, setFrequency] = useState('');

    const handleAddSensor = (e) => {
        e.preventDefault();
        addSensor({ type, frequency });
        setType('');
        setFrequency('');
    };

    return (
        <Container>
            <h2>Sensor Management</h2>
            <Form onSubmit={handleAddSensor}>
                <Input
                    type="text"
                    placeholder="Sensor Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                />
                <Button type="submit">Add Sensor</Button>
            </Form>

            <h3>Existing Sensors</h3>
            <ul>
                {sensors.map((sensor, idx) => (
                    <li key={idx}>{sensor.type} - Frequency: {sensor.frequency}</li>
                ))}
            </ul>
        </Container>
    );
};

export default SensorManagement;
