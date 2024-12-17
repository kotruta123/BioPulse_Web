// DataCard.jsx
import React from 'react';
import { DataCard as StyledDataCard } from "../PlantStyles.js";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const DataCard = ({ profile, onActivate }) => {
    const isActive = profile.isActive;

    return (
        <StyledDataCard>
            <h4>Current Profile Data</h4>
            <div className="data-grid">
                <div className="data-item">
                    <span className="label">Name:</span>
                    <span className="value">{profile.name}</span>
                </div>
                <div className="data-item">
                    <span className="label">pH Range:</span>
                    <span className="value">{profile.phMin} - {profile.phMax}</span>
                </div>
                <div className="data-item">
                    <span className="label">Temp Range (°C):</span>
                    <span className="value">{profile.temperatureMin} - {profile.temperatureMax}</span>
                </div>
                <div className="data-item">
                    <span className="label">Light On/Off:</span>
                    <span className="value">
                        {new Date(profile.lightOnTime).toLocaleString()} / {new Date(profile.lightOffTime).toLocaleString()}
                    </span>
                </div>
                <div className="data-item">
                    <span className="label">Light Range:</span>
                    <span className="value">{profile.lightMin} - {profile.lightMax}</span>
                </div>
                <div className="data-item">
                    <span className="label">EC Range:</span>
                    <span className="value">{profile.ecMin} - {profile.ecMax}</span>
                </div>
            </div>
            {!isActive ? (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <button
                        onClick={onActivate}
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            backgroundColor: '#4caf50',
                            color: 'white',
                            borderRadius: '8px',
                            cursor: 'pointer'
                        }}
                    >
                        Activate Profile
                    </button>
                </div>
            ) : (
                <div style={{ color: 'green', fontSize: '16px', marginTop: '20px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircleIcon style={{ marginRight: '8px' }} /> This plant profile is active now.
                </div>
            )}
        </StyledDataCard>
    );
};

export default DataCard;
