import { Legend } from 'chart.js';
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const BranchEmployeeChart = ({ data }) => {
  const chartData = [
    { name: '해당지점', 명: data.해당지점 },
    { name: '지점평균', 명: data.지점평균 },
  ];

  return (
    <div className="chart-container center-v">
      <h2 className="chart-title" style={{ width: '90%' }}>
        부점 직원 수
      </h2>
      <BarChart width={300} height={300} data={chartData} style={{ marginRight: '2vw', marginTop: '7vh' }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="명" fill="#00C49F" />
      </BarChart>
    </div>
  );
};

export default BranchEmployeeChart;
