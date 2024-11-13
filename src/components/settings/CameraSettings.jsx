import React, { useState } from 'react';
import { useCameraService } from '../../services/CameraService.jsx';
import { Form, Input, Button, Container } from '../../styles.js';

const CameraSettings = () => {
    const { configureCamera } = useCameraService();
    const [frequency, setFrequency] = useState('');
    const [resolution, setResolution] = useState('');

    const handleConfigureCamera = (e) => {
        e.preventDefault();
        configureCamera({ frequency, resolution });
    };

    return (
        <Container>
            <h2>Camera Settings</h2>
            <Form onSubmit={handleConfigureCamera}>
                <Input
                    type="text"
                    placeholder="Capture Frequency"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Resolution"
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    required
                />
                <Button type="submit">Configure</Button>
            </Form>
        </Container>
    );
};

export default CameraSettings;
