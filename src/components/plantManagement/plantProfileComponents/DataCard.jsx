import React from 'react';
import {DataCard as StyledDataCard} from "../PlantStyles.js";
import ParticlesBackground from "./ParticlesBackground.jsx";

const DataCard = ({ profile }) => {
    return (
        <StyledDataCard>
            <ParticlesBackground
                particleCount={40}
                particleSpeed={0.5}
                color={["#a1c4fd", "#c2e9fb"]}
                opacity={0.2}
                zIndex={0}
                enableHoverEffect={false}
                customStyle={{ filter: "blur(2px)" }}
            />
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
        </StyledDataCard>
    );
};

export default DataCard;
