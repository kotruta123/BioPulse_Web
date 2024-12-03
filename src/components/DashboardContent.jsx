import React, { useState } from "react";
import SensorCard from "./SensorCard";
import StyledGaugeChart from "./StyledGaugeChart";
import ImageCarousel from "./ImageCarousel";
import { SensorGrid, RefreshButton, ContentContainer } from "../styles";
import RefreshIcon from "@mui/icons-material/Refresh";

const DashboardContent = () => {
    const [data, setData] = useState({
        temp: 35.65,
        ph: 7.8,
        ec: 677.64,
    });

    const handleRefresh = () => {
        setData({
            temp: Math.random() * 50,
            ph: (Math.random() * 14).toFixed(2),
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
            <SensorGrid>
                <div>
                    <SensorCard
                        title="Temp"
                        value={`${data.temp.toFixed(2)}°C`}
                        status="Moderate"
                    />
                    <StyledGaugeChart
                        title="Temperature"
                        value={data.temp}
                        maxValue={50}
                        unit="°C"
                    />
                </div>
                <div>
                    <SensorCard
                        title="pH"
                        value={data.ph}
                        status="Good"
                    />
                    <StyledGaugeChart
                        title="pH Levels"
                        value={parseFloat(data.ph)}
                        maxValue={14}
                        unit=""
                    />
                </div>
                <div>
                    <SensorCard
                        title="Water EC"
                        value={`${data.ec.toFixed(2)} μS/cm`}
                        status="Bad"
                    />
                    <StyledGaugeChart
                        title="Water EC"
                        value={data.ec}
                        maxValue={1000}
                        unit="μS/cm"
                    />
                </div>
            </SensorGrid>
            <ImageCarousel />
        </ContentContainer>

    );
};

export default DashboardContent;
