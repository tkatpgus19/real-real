import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyConsultationChart = () => {
  const data = [
    { month: '1월', 카드업무: 1.2, 일반업무: 1.8, 대출업무: 1.5, 기타업무: 2.2 },
    { month: '2월', 카드업무: 2.1, 일반업무: 1.5, 대출업무: 1.6, 기타업무: 2.3 },
    { month: '3월', 카드업무: 1.7, 일반업무: 1.9, 대출업무: 1.5, 기타업무: 2.4 },
    { month: '4월', 카드업무: 2.2, 일반업무: 1.4, 대출업무: 1.3, 기타업무: 2.5 },
    { month: '5월', 카드업무: 1.8, 일반업무: 2.8, 대출업무: 1.7, 기타업무: 2.0 },
    { month: '6월', 카드업무: 2.4, 일반업무: 2.2, 대출업무: 1.8, 기타업무: 2.6 },
    { month: '7월', 카드업무: 2.0, 일반업무: 2.3, 대출업무: 1.7, 기타업무: 2.7 },
    { month: '8월', 카드업무: 2.1, 일반업무: 1.9, 대출업무: 1.8, 기타업무: 2.4 },
    { month: '9월', 카드업무: 1.5, 일반업무: 2.0, 대출업무: 1.2, 기타업무: 2.1 },
  ];
  const styles = {
    container: {
      width: '100%',
      height: '100%', // 고정 높이 대신 100%로 설정
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
      fontSize: '14px',
      fontWeight: 'bold',
      padding: '8px',
      textAlign: 'center',
    },
    chartWrapper: {
      flex: 1, // 남은 공간을 차지하도록 설정
      minHeight: 0, // flex container에서 필수
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>
        업무별 상담 증가율
        <span style={{ fontSize: '12px', marginLeft: '8px' }}>(월간 기준)</span>
      </div>
      <div style={styles.chartWrapper}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="카드업무" stroke="#00C49F" strokeWidth={1.5} dot={{ r: 2 }} />
            {/* 다른 Line 컴포넌트들 */}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyConsultationChart;
