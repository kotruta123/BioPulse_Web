import React from 'react';
import { useBackupService } from '../services/BackupService';
import { Button, Container } from '../styles';

const DataExport = () => {
    const { exportData } = useBackupService();

    return (
        <Container>
            <h2>Data Export</h2>
            <Button onClick={exportData}>Export Sensor Data</Button>
        </Container>
    );
};

export default DataExport;
