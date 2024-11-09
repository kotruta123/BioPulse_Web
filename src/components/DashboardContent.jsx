import React from 'react';
import PlantCard from './PlantCard';
import SensorCard from './SensorCard';
import ElectricityConsumptionChart from './ElectricityConsumption.jsx';
import ImageCarousel from './ImageCarousel';
import { ContentContainer, PlantAndCarouselRow, PlantGrid, SensorGrid, ChartContainer } from '../styles';

const DashboardContent = () => (
    <ContentContainer>
        <PlantAndCarouselRow>
            <PlantGrid>
                <PlantCard title="Cabbage" status="Active" imageUrl="/images/cabbage.jpg" isActive />
                <PlantCard title="Tomato" imageUrl="/images/tomato.jpg" />
                <PlantCard title="Lettuce" imageUrl="/images/lettuce.jpg" />
                <PlantCard title="Basil" imageUrl="/images/basil.jpg" />
                <PlantCard title="Spinach" imageUrl="/images/spinach.jpg" />
                <PlantCard title="Strawberry" imageUrl="/images/strawberry.jpg" />
            </PlantGrid>
            <ImageCarousel />
        </PlantAndCarouselRow>

        <SensorGrid>
            <SensorCard title="Humidity" value="72%" status="Good" />
            <SensorCard title="Temp" value="31°C" status="Moderate" />
            <SensorCard title="Water EC" value="250 μS/cm" status="Bad" />
            <SensorCard title="pH" value="7.9" status="Good" />
            <SensorCard title="Light" value="9800 lux" status="Good" />
        </SensorGrid>

        <ChartContainer>
            <ElectricityConsumptionChart />
        </ChartContainer>
    </ContentContainer>
);

export default DashboardContent;
