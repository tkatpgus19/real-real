import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimeSeriesChart = ({ data, onDateChange }) => {
  const [dateRange, setDateRange] = useState('today');
  const [clickId, setClickId] = useState(0);

  const styles = {
    container: {
      width: '100%',
      height: '100%',
      minHeight: '300px',
      position: 'relative',
    },
    buttonContainer: {
      position: 'absolute',
      top: '10px',
      right: '10px',
      display: 'flex',
      gap: '8px',
      zIndex: 10, // z-index 값 증가
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
      <p className="chart-title">
        <strong>시간대별 업무 상담수</strong>
      </p>
      <div style={styles.buttonContainer}>
        <button
          style={{
            ...styles.button,
            ...(dateRange === 'today' ? styles.activeButton : styles.inactiveButton),
          }}
          onClick={() => onDateChange('today')}
        >
          어제
        </button>
        <button
          style={{
            ...styles.button,
            ...(dateRange === 'week' ? styles.activeButton : styles.inactiveButton),
          }}
          onClick={() => onDateChange('week')}
        >
          지난주
        </button>
        <button
          style={{
            ...styles.button,
            ...(dateRange === 'month' ? styles.activeButton : styles.inactiveButton),
          }}
          onClick={() => onDateChange('month')}
        >
          1개월
        </button>
        <button
          style={{
            ...styles.button,
            ...(dateRange === 'year' ? styles.activeButton : styles.inactiveButton),
          }}
          onClick={() => onDateChange('year')}
        >
          1년
        </button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data} margin={{ top: 50, right: 80, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            contentStyle={{ backgroundColor: 'white', border: '1px solid #ccc' }}
            formatter={(value) => [value + '건', '']}
          />
          <Legend verticalAlign="top" height={36} />
          <Line
            type="monotone"
            dataKey="cardAvg"
            name="카드업무"
            stroke="#00C49F"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="generalAvg"
            name="일반업무"
            stroke="#0088FE"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="loanAvg"
            name="대출업무"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="otherAvg"
            name="기타업무"
            stroke="#ffc658"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimeSeriesChart;
