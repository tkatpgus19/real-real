import { useEffect, useState } from 'react';
import BranchEmployeeChart from '../components/BranchEmployeeChart';
import EmployeePerformanceChart from '../components/EmployeePerformanceChart';
import Header from '../components/Header';
import HeaderMenuHQ from '../components/HeaderMenuHQ';
import WaitTimeChart from '../components/WaitTimeChart';
import '../css/DashBoardPage.css';
import {
  checkLogin,
  getChart1,
  getChart2,
  getChart3,
  getChart4,
  getChart5,
  getChart8,
  getKioskConsultations,
} from '../utils/api';
import DepartmentDonutChart from '../components/DepartmentDonutChart';
import TimeSeriesChart from '../components/TimeSeriesChart';
import CsnlTimeChart from '../components/CsnlTimeChart';
import MonthlyConsultationChart from '../components/MonthlyConsultationChart';
import { useNavigate, useParams } from 'react-router-dom';
import KioskConsultationChart from '../components/KioskConsultationChart';

const DashBoardPage = () => {
  const navigate = useNavigate();
  const [chartData8, setChartData8] = useState([]);
  const [chartData1, setChartData1] = useState({});
  const [chartData2, setChartData2] = useState([]);
  const [chartData4, setChartData4] = useState([]);
  const [chartData3, setChartData3] = useState([]);
  const [kioskData, setKioskData] = useState([]);
  const [timeSeriesData, setTimeSeriesData] = useState([]);
  const deptId = useParams();

  const handleTimeSeriesRangeChange = async (range) => {
    try {
      const response = await getChart5(deptId.id, range);
      setTimeSeriesData(response.data.data);
    } catch (error) {
      console.error('Error fetching time series data:', error);
    }
  };

  const handleKioskDateChange = async (range) => {
    try {
      const response = await getKioskConsultations(deptId.id, range);
      setKioskData(response.data.data);
      console.log('dfafdasf', response.data.data);
    } catch (error) {
      console.error('Error fetching kiosk data:', error);
    }
  };

  useEffect(() => {
    getChart8(deptId.id).then((res) => {
      setChartData8(res.data.data);
    });
    getChart1(deptId.id)
      .then((res) => {
        setChartData1(res.data.data);
      })
      .catch((err) => console.log(err));
    getChart2(deptId.id)
      .then((res) => {
        setChartData2(res.data.data);
      })
      .catch((err) => console.log(err));
    getChart4(deptId.id).then((res) => {
      setChartData4(res.data.data);
    });
    getChart3(deptId.id).then((res) => {
      setChartData3(res.data.data);
    });
    getChart5(deptId.id, 'year').then((res) => setTimeSeriesData(res.data.data));
    handleKioskDateChange('today');
  }, [deptId]);
  return (
    <>
      <Header />
      <main>
        <div className="dash-main-container">
          <HeaderMenuHQ type={'HQ'} />
          <div className="dash-grid-container">
            <div className="dash-3">
              <div className="dash-2-h">
                <div className="plain">
                  <div className="chart-wrapper">
                    <BranchEmployeeChart data={chartData1} />
                  </div>
                </div>
                <div className="plain">
                  <div className="chart-wrapper">
                    <DepartmentDonutChart rawData={chartData2} />
                  </div>
                </div>
              </div>
              <div className="plain">
                <div className="chart-wrapper">
                  <WaitTimeChart data={chartData4} />
                </div>
              </div>
              <div className="plain">
                <div className="chart-wrapper">
                  <CsnlTimeChart data={chartData3} />
                </div>
              </div>
            </div>
            <div className="dash-3-2">
              <div className="plain">
                <div className="chart-wrapper">
                  <TimeSeriesChart data={timeSeriesData} onDateChange={handleTimeSeriesRangeChange} />
                </div>
              </div>
              <div className="dash-2-v">
                <div className="dash-2-h">
                  <div className="plain">
                    <div className="chart-wrapper">
                      <KioskConsultationChart data={kioskData} onDateChange={handleKioskDateChange} />
                    </div>
                  </div>
                  <div className="plain">
                    <div className="chart-wrapper">
                      <div className="chart-wrapper">
                        <EmployeePerformanceChart data={chartData8} />
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="plain center"
                  style={{ display: 'flex', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/main');
                  }}
                >
                  <h1> 돌아가기 </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashBoardPage;
