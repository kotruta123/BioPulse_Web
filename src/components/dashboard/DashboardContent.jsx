import React, { useState } from "react";
import { useSensorService } from "../../services/SensorService.jsx";
import SensorCard from "../sensorManagement/SensorCard.jsx";
import StyledGaugeChart from "../sensorManagement/StyledGaugeChart.jsx";
import ImageCarousel from "./ImageCarousel.jsx";
import { SensorGrid, ContentContainer, RefreshButton } from "../../styles.js";
import RefreshIcon from "@mui/icons-material/Refresh";

const DashboardContent = () => {
    const { sensors } = useSensorService();
    const activeSensors = sensors.filter((sensor) => sensor.isEnabled);

    const [data, setData] = useState({
        temp: Math.random() * 50, // Example: Temperature value
        ph: Math.random() * 14,  // Example: pH value
        ec: Math.random() * 1000, // Example: EC value
    });

    const handleRefresh = () => {
        setData({
            temp: Math.random() * 50,
            ph: Math.random() * 14,
            ec: Math.random() * 1000,
        });
    };

    return (
        <ContentContainer>
            <div style={{ textAlign: "right", padding: "10px" }}>
                <RefreshButton onClick={handleRefresh}>
                    <RefreshIcon /> Refresh
                </RefreshButton>
            </div>

            <h2>Active Sensors</h2>
            <SensorGrid>
                {activeSensors.map((sensor, index) => {
                    const value =
                        sensor.sensorType === "Temperature" ? data.temp :
                            sensor.sensorType === "pH" ? data.ph : data.ec;

                    const range =
                        sensor.sensorType === "Temperature" ? { min: 20, max: 35 } : // Example range for Temperature
                            sensor.sensorType === "pH" ? { min: 6.5, max: 8.5 } : // Example range for pH
                                { min: 500, max: 800 }; // Example range for EC

                    return (
                        <div key={sensor.id}>
                            <SensorCard
                                title={sensor.name}
                                value={value.toFixed(2)} // Dynamic value
                                status={value >= range.min && value <= range.max ? "Good" : "Bad"}
                            />
                            <StyledGaugeChart
                                title={sensor.sensorType}
                                value={value} // Dynamic value
                                minValue={0}
                                maxValue={sensor.sensorType === "pH" ? 14 : sensor.sensorType === "EC" ? 1000 : 50}
                                range={range}
                                unit={sensor.sensorType === "Temperature" ? "°C" : ""}
                            />

                        </div>
                    );
                })}
            </SensorGrid>

            <ImageCarousel />
        </ContentContainer>
    );
};

export default DashboardContent;
