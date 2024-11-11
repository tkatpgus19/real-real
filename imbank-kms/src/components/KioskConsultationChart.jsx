import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const KioskConsultationChart = ({ data, onDateChange }) => {
  const [dateRange, setDateRange] = useState('today');

  const handleRangeChange = (range) => {
    setDateRange(range);
    onDateChange(range);
  };

  const styles = {
    container: {
      width: '100%',
      height: '100%',
      minHeight: '300px',
      position: 'relative',
    },
    title: {
      position: 'absolute',
      top: '10px',
      left: '10px',
      fontSize: '14px',
      fontWeight: 'bold',
    },
    buttonContainer: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      display: 'flex',
      gap: '8px',
      zIndex: 10,
    },
    button: {
      padding: '4px 8px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '12px',
    },
    activeButton: {
      backgroundColor: '#4CAF50',
      color: 'white',
    },
    inactiveButton: {
      backgroundColor: '#f0f0f0',
      color: 'black',
    },
  };

  return (
    <div style={styles.container}>
      <div className="chart-title">
        <strong>키오스크별 사용 현황</strong>
      </div>
      <div style={styles.buttonContainer}>
        <button
          style={{
            ...styles.button,
            ...(dateRange === 'today' ? styles.activeButton : styles.inactiveButton),
          }}
          onClick={() => handleRangeChange('today')}
        >
          어제
        </button>
        <button
          style={{
            ...styles.button,
            ...(dateRange === 'week' ? styles.activeButton : styles.inactiveButton),
          }}
          onClick={() => handleRangeChange('week')}
        >
          1주
        </button>
        <button
          style={{
            ...styles.button,
            ...(dateRange === 'month' ? styles.activeButton : styles.inactiveButton),
          }}
          onClick={() => handleRangeChange('month')}
        >
          1개월
        </button>
        <button
          style={{
            ...styles.button,
            ...(dateRange === 'year' ? styles.activeButton : styles.inactiveButton),
          }}
          onClick={() => handleRangeChange('year')}
        >
          1년
        </button>
      </div>

      <ResponsiveContainer width="100%" height={420}>
        <BarChart data={data} margin={{ top: 80, right: 60, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="kioskId" label={{ value: '키오스크 번호', position: 'bottom', offset: 0 }} />
          <YAxis
            label={{
              value: '상담 건수',
              angle: -90,
              position: 'insideLeft',
              offset: 10,
            }}
          />
          <Tooltip
            formatter={(value) => [`${value}건`, '상담 건수']}
            labelFormatter={(label) => `키오스크 ${label}번`}
          />
          <Bar dataKey="consultationCount" name="상담 건수" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KioskConsultationChart;
