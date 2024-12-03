import React, { createContext, useContext } from 'react';

const BackupServiceContext = createContext();

export const BackupServiceProvider = ({ children }) => {
    const backupData = () => {
        alert('Data backup successful.');
        // Implementation for data backup
    };

    const restoreData = () => {
        alert('Data restored successfully.');
        // Implementation for data restore
    };

    const exportData = () => {
        alert('Data export successful.');
        // Implementation for exporting data
    };

    return (
        <BackupServiceContext.Provider value={{ backupData, restoreData, exportData }}>
            {children}
        </BackupServiceContext.Provider>
    );
};

export const useBackupService = () => useContext(BackupServiceContext);
