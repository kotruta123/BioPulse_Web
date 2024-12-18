// components/sensorManagement/StyledGaugeChart.jsx
import React from "react";
import GaugeChart from "react-gauge-chart";

const StyledGaugeChart = ({ title, value, maxValue, minValue = 0, range, unit }) => {
    const percentage = (value - minValue) / (maxValue - minValue); // Calculate percentage for gauge
    const isInRange = value >= range.min && value <= range.max; // Check if the value is in range

    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h4 style={{ marginBottom: "10px" }}>{title}</h4>
            <GaugeChart
                id={`gauge-chart-${title}`}
                nrOfLevels={3}
                colors={["#ff5b5b", "#33d69f", "#ff5b5b"]}
                percent={percentage}
                textColor="transparent" // This hides the percentage
                arcPadding={0.02}
                needleColor="#757575"
            />
            <p style={{ marginTop: "-20px", fontSize: "14px", color: isInRange ? "#33d69f" : "#ff5b5b" }}>
                {isInRange ? `In Range (${range.min} - ${range.max}${unit})` : `Out of Range`}
            </p>
            <p style={{ fontSize: "14px" }}>{value.toFixed(2)} {unit}</p>
        </div>
    );
};

export default StyledGaugeChart;
