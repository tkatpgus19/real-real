import { useNavigate } from 'react-router-dom';
import LogoTopImg from '../assets/logoTop.png';
import '../css/Header.css';
import { checkLogin, getLogout } from '../utils/api';
import CheckInactivity from './CheckInactivity';
import { useEffect, useState } from 'react';

const Header = () => {
  const navigate = useNavigate();
  const [isHQ, setIsHQ] = useState(false);
  const [department, setDepartment] = useState({ userId: [] });
  const [userInfo, setUserInfo] = useState({});
  const onClickHandler = (e) => {
    const data = e.currentTarget.getAttribute('data');
    navigate('/' + data);
  };

  const onLogoutHandler = () => {
    getLogout()
      .then((res) => {
        if (res.data.errorResponse === null) {
          alert('로그아웃 되었습니다.');
          navigate('/');
        }
      })
      .catch((err) => alert('서버에 문제가 발생했습니다.'));
  };

  const goMainHandler = () => {
    navigate('/main');
  };

  useEffect(() => {
    checkLogin()
      .then((res) => {
        if (res.data.errorResponse !== null) {
          navigate('/');
        } else {
          setDepartment(res.data.data.department);
          if (res.data.data.department.id == 11) {
            setIsHQ(true);
          }
          setUserInfo(res.data.data);
        }
      })
      .catch((err) => {
        alert('서버에 문제가 발생했습니다.');
      });
  }, []);
  return (
    <>
      <header>
        <img src={LogoTopImg} onClick={goMainHandler} style={{ cursor: 'pointer' }} />
        <div className="header-items-r center-e">
          {isHQ ? (
            <p className="center-e" data="dashboard/0" onClick={onClickHandler}>
              대시보드
            </p>
          ) : (
            <>
              <p className="center-e" data="kiosk" onClick={onClickHandler}>
                키오스크 관리
              </p>
              <p className="center-e" data="ticket" onClick={onClickHandler}>
                번호표 관리
              </p>
              <p className="center-e" data="layout" onClick={onClickHandler}>
                배치도 관리
              </p>
            </>
          )}

          <CheckInactivity />
          <div className="button-s" onClick={onLogoutHandler}>
            로그아웃
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
