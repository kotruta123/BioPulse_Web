import React, { useState } from 'react';
import { useNotificationService } from '../services/NotificationService';
import { Form, Input, Button, Container } from '../styles';

const NotificationsSettings = () => {
    const { configureNotification } = useNotificationService();
    const [contact, setContact] = useState('');
    const [notificationType, setNotificationType] = useState('');

    const handleConfigureNotification = (e) => {
        e.preventDefault();
        configureNotification({ contact, notificationType });
    };

    return (
        <Container>
            <h2>Notifications Settings</h2>
            <Form onSubmit={handleConfigureNotification}>
                <Input
                    type="text"
                    placeholder="Contact (Email or Phone)"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Notification Type"
                    value={notificationType}
                    onChange={(e) => setNotificationType(e.target.value)}
                />
                <Button type="submit">Configure</Button>
            </Form>
        </Container>
    );
};

export default NotificationsSettings;
