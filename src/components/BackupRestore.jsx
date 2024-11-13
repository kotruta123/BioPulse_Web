import React from 'react';
import { useBackupService } from '../services/BackupService';
import { Button, Container } from '../styles';

const BackupRestore = () => {
    const { backupData, restoreData } = useBackupService();

    return (
        <Container>
            <h2>Backup and Restore</h2>
            <Button onClick={backupData}>Backup Data</Button>
            <Button onClick={restoreData}>Restore Data</Button>
        </Container>
    );
};

export default BackupRestore;
