import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const EmployeePerformanceChart = ({ data }) => {
  const styles = {
    container: {
      width: '100%',
      maxWidth: '500px',
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
      margin: '0px auto',
    },
    title: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginTop: '0px',
      color: '#333333',
    },
    chartWrapper: {
      width: '100%',
      overflowX: 'auto',
      paddingBottom: '20px',
    },
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            padding: '10px',
            border: '1px solid #cccccc',
            borderRadius: '4px',
          }}
        >
          <p style={{ margin: 0 }}>{`처리 수: ${payload[0].value}건`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>직원별 상담 처리수</h2>
      <div style={styles.chartWrapper}>
        <BarChart
          width={400}
          height={400}
          data={data}
          layout="vertical"
          margin={{
            top: 40,
            right: 30,
            left: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={true} stroke="#e0e0e0" />
          <XAxis
            type="number"
            stroke="#666666"
            style={{
              fontSize: '12px',
              fontFamily: 'Arial, sans-serif',
            }}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={80}
            stroke="#666666"
            style={{
              fontSize: '14px',
              fontFamily: 'Arial, sans-serif',
            }}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }} />
          <Bar dataKey="value" fill="#00C49F" radius={[0, 4, 4, 0]} barSize={20} />
        </BarChart>
      </div>
    </div>
  );
};

export default EmployeePerformanceChart;
