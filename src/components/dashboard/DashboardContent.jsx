// components/dashboard/DashboardContent.jsx
import React, { useEffect, useState } from "react";
import { useSensorService } from "../../services/SensorService.jsx";
import SensorCard from "../sensorManagement/SensorCard.jsx";
import StyledGaugeChart from "../sensorManagement/StyledGaugeChart.jsx";
import ImageCarousel from "./ImageCarousel.jsx";
import { SensorGrid, ContentContainer, RefreshButton, Button } from "../../styles.js";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast } from 'react-toastify';
import * as PlantService from "../../services/PlantService.jsx";

const DashboardContent = () => {
    const { dashboardSensors, fetchSensors, removeFromDashboard } = useSensorService();
    const [plantProfile, setPlantProfile] = useState(null);
    const [sensorData, setSensorData] = useState({});
    const [loading, setLoading] = useState(true);

    const BUFFER = 5; // Define buffer

    const fetchActivePlantProfile = async () => {
        try {
            const profile = await PlantService.getActivePlantProfile();
            setPlantProfile(profile);
        } catch (error) {
            console.error("Error fetching active plant profile:", error);
            toast.error("Failed to fetch active plant profile.");
        }
    };

    const fetchSensorReadings = () => {
        const data = {};
        dashboardSensors.forEach((sensor) => {
            if (sensor.sensorReadings && sensor.sensorReadings.length > 0) {
                const latestReading = sensor.sensorReadings[sensor.sensorReadings.length - 1];
                data[sensor.id] = latestReading.value;
            } else {
                data[sensor.id] = null;
            }
        });
        setSensorData(data);
    };

    const initializeDashboard = async () => {
        setLoading(true);
        await fetchSensors();
        await fetchActivePlantProfile();
        fetchSensorReadings();
        setLoading(false);
    };

    useEffect(() => {
        initializeDashboard();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run only once on mount

    const handleRefresh = async () => {
        setLoading(true);
        await fetchActivePlantProfile();
        fetchSensorReadings();
        setLoading(false);
        toast.info("Dashboard data refreshed.");
    };

    const handleRemoveFromDashboard = (sensorId) => {
        removeFromDashboard(sensorId);
        toast.info("Sensor removed from dashboard.");
    };

    if (loading) {
        return <div>Loading Dashboard...</div>;
    }

    if (!plantProfile) {
        return <div>No active plant profile found.</div>;
    }

    const getPlantProfileRange = (sensorType) => {
        switch (sensorType.toLowerCase()) {
            case "temperature":
                return { min: plantProfile.temperatureMin, max: plantProfile.temperatureMax };
            case "pH":
                return { min: plantProfile.phMin, max: plantProfile.phMax };
            case "water ec":
                return { min: plantProfile.ecMin, max: plantProfile.ecMax };
            case "humidity":
                return { min: plantProfile.humidityMin, max: plantProfile.humidityMax };
            case "light":
                return { min: plantProfile.lightMin, max: plantProfile.lightMax };
            default:
                return { min: 0, max: 100 };
        }
    };

    const getSensorType = (sensorTypeEnum) => {
        switch (sensorTypeEnum) {
            case 0:
                return "Temperature";
            case 1:
                return "pH";
            case 2:
                return "Water EC";
            case 3:
                return "Humidity";
            case 4:
                return "Light";
            default:
                return "Unknown";
        }
    };

    const getUnit = (sensorType) => {
        switch (sensorType.toLowerCase()) {
            case "temperature":
                return "°C";
            case "pH":
                return "";
            case "water ec":
                return "μS/cm";
            case "humidity":
                return "%";
            case "light":
                return "Lux";
            default:
                return "";
        }
    };

    return (
        <ContentContainer>
            <div style={{ textAlign: "right", padding: "10px" }}>
                <RefreshButton onClick={handleRefresh}>
                    <RefreshIcon /> Refresh
                </RefreshButton>
            </div>

            <h2>Dashboard</h2>
            <SensorGrid>
                {dashboardSensors.map((sensor) => {
                    const value = sensorData[sensor.id];
                    const sensorType = getSensorType(sensor.sensorType);
                    const range = getPlantProfileRange(sensorType);

                    // Calculate Gauge Range with Buffer
                    const gaugeMin = range.min - BUFFER;
                    const gaugeMax = range.max + BUFFER;

                    // Prevent gaugeMin from being negative or illogical
                    const adjustedGaugeMin = gaugeMin < 0 ? 0 : gaugeMin;

                    // Calculate percentage
                    const percentage = (value - adjustedGaugeMin) / (gaugeMax - adjustedGaugeMin);

                    // Clamp percentage between 0 and 1
                    const clampedPercentage = Math.min(Math.max(percentage, 0), 1);

                    // Determine if the value is within range
                    const isInRange = value >= range.min && value <= range.max;

                    // Determine status text
                    const status = isInRange ? "Good" : "Bad";

                    return (
                        <div key={sensor.id} style={{ marginBottom: "30px" }}>
                            <SensorCard
                                title={sensor.name}
                                value={value !== null ? `${value}` : "N/A"}
                                status={status}
                            />
                            <StyledGaugeChart
                                title={sensorType}
                                value={value !== null ? value : adjustedGaugeMin}
                                minValue={adjustedGaugeMin}
                                maxValue={gaugeMax}
                                range={range}
                                unit={getUnit(sensorType)}
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
