import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const WaitTimeChart = ({ data }) => {
  return (
    <div className="chart-container">
      <h2 className="chart-title">업무별 평균 대기 시간</h2>
      <div className="chart-wrapper">
        <BarChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 40,
            right: 30,
            left: 60,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} label={{ value: '대기시간 (분)', angle: -90, position: 'insideLeft' }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="해당지점" fill="#00C49F" />
          <Bar dataKey="지점평균" fill="#82ca9d" />
        </BarChart>
      </div>
    </div>
  );
};

export default WaitTimeChart;
