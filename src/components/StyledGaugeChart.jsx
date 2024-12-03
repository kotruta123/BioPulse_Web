import React from "react";
import GaugeChart from "react-gauge-chart";

const StyledGaugeChart = ({ title, value, maxValue, unit }) => {
    const percentage = value / maxValue;

    return (
        <div style={{ textAlign: "center", margin: "20px" }}>
            <h4 style={{ marginBottom: "10px" }}>{title}</h4>
            <GaugeChart
                id={`gauge-chart-${title}`}
                nrOfLevels={3}
                colors={["#FF5B5B", "#FFC700", "#00E676"]}
                percent={percentage}
                textColor="#000"
                arcPadding={0.02}
                needleColor="#757575"
            />
            <p style={{ marginTop: "-20px", fontSize: "14px" }}>
                {value.toFixed(2)} {unit}
            </p>
        </div>
    );
};

export default StyledGaugeChart;
