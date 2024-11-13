import React, { useState } from 'react';
import { usePlantService } from '../services/PlantService';
import { Form, Input, Button, Container } from '../styles';

const PlantManagement = () => {
    const { plantProfiles, addPlantProfile } = usePlantService();
    const [name, setName] = useState('');
    const [phRange, setPhRange] = useState([6, 7]);

    const handleAddPlant = (e) => {
        e.preventDefault();
        addPlantProfile({ name, phRange });
        setName('');
        setPhRange([6, 7]);
    };

    return (
        <Container>
            <h2>Plant Management</h2>
            <Form onSubmit={handleAddPlant}>
                <Input
                    type="text"
                    placeholder="Plant Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="pH Range"
                    value={phRange.join('-')}
                    onChange={(e) => setPhRange(e.target.value.split('-').map(Number))}
                />
                <Button type="submit">Add Plant</Button>
            </Form>

            <h3>Existing Plants</h3>
            <ul>
                {plantProfiles.map((plant, idx) => (
                    <li key={idx}>{plant.name} - pH Range: {plant.phRange.join(' - ')}</li>
                ))}
            </ul>
        </Container>
    );
};

export default PlantManagement;
