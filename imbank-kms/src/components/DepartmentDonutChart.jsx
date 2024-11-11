import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const DepartmentDonutChart = ({ rawData }) => {
  const workTypeMap = {
    '01': { name: '카드 업무', color: '#4CBB17' },
    '02': { name: '일반 업무', color: '#00A86B' },
    '03': { name: '대출 업무', color: '#29AB87' },
    '04': { name: '기타 업무', color: '#789B98' },
  };
  // deptId가 1인 데이터만 필터링하고 차트 데이터 형식으로 변환
  const data = rawData
    .filter((item) => item.deptId !== null)
    .map((item) => ({
      name: workTypeMap[item.wdDvcd].name,
      value: item.employeeCount,
      color: workTypeMap[item.wdDvcd].color,
    }));

  const totalEmployees = data.reduce((sum, item) => sum + item.value, 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow">
          <p>{`${payload[0].name}: ${payload[0].value}명`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h3 className="chart-title">업무별 직원 분포 (전체 {totalEmployees}명)</h3>
      <div>
        <PieChart width={300} height={400} style={{ margin: 'auto' }}>
          <Pie data={data} cx={100} cy={200} innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend layout="vertical" align="left" verticalAlign="middle" />
        </PieChart>
      </div>
    </div>
  );
};

export default DepartmentDonutChart;
