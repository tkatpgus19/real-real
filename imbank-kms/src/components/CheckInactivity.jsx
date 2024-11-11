import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { checkLogin, getLogout } from '../utils/api';

const CheckInactivity = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5분 = 300초
  const [department, setDepartment] = useState({});

  const check = () => {
    checkLogin().then((res) => {
      if (res.data.errorResponse === null) {
        setDepartment(res.data.data);
        setTimeLeft(300); // 타이머를 5분으로 초기화
      }
    });
  };

  useEffect(() => {
    checkLogin().then((res) => {
      if (res.data.errorResponse === null) {
        setDepartment(res.data.data);
      }
    });

    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdown);
          getLogout().then(() => {
            alert('장기간 이용하지 않아 로그아웃 되었습니다.');
            navigate('/');
          });
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(countdown); // 컴포넌트 언마운트 시 타이머 정리
  }, [navigate]);

  return (
    <>
      <div className="container">
        <div className="left-section">
          <p className="t" style={{ color: 'black' }}>
            {department.username} 관리자
          </p>
          <p className="b" style={{ color: 'red' }}>
            {Math.floor(timeLeft / 60)}분 {timeLeft % 60}초 후, 세션 만료
          </p>
        </div>
        <div className="right-section">
          <div className="plain session-btn" onClick={check}>
            세션 연장
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckInactivity;
