import React from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
    { name: 'Jan', consumption: 30 },
    { name: 'Feb', consumption: 20 },
    { name: 'Mar', consumption: 48.3 },
    { name: 'Apr', consumption: 25 },
    { name: 'May', consumption: 60 },
    { name: 'Jun', consumption: 35 },
];

const ElectricityConsumptionChart = () => (
    <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
        <h3>Electricity Consumption</h3>
        <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="consumption" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    </div>
);

export default ElectricityConsumptionChart;
