import '../css/KioskPage.css';
import HumanImg from '../assets/human.png';
import KioskImg from '../assets/kiosk-f.png';
import ButtonImg from '../assets/button.png';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { checkLogin } from '../utils/api';
import { useEffect, useState } from 'react';

const KioskPage = () => {
  const [department, setDepartment] = useState({ userId: [] });
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  // 페이지 이동
  const onMenuClickHandler = (e) => {
    const value = e.currentTarget.getAttribute('data');
    navigate(value);
  };
  useEffect(() => {
    checkLogin()
      .then((res) => {
        if (res.data.errorResponse !== null) {
          navigate('/');
        } else {
          setDepartment(res.data.data.department);
          setUserInfo(res.data.data);
        }
      })
      .catch((err) => {
        alert('서버에 문제가 발생했습니다.');
      });
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="main-main-container center">
          <div className="main-main-container-l">
            <div className="main-box-l-t plain center-v">
              <div className="main-l-user-info">
                <p>관리자 정보</p>
                <h2>{userInfo.username}</h2>
                <p>근무지점 : {department.deptName}</p>
                <p>
                  직급:{' '}
                  {userInfo.userDVCD == '2' || userInfo.userDVCD == '02'
                    ? '관리자'
                    : userInfo.userDVCD == '03' || userInfo.userDVCD == '3'
                    ? '부장'
                    : userInfo.userDVCD == '04' || userInfo.userDVCD == '4'
                    ? '지점장'
                    : '프로'}
                </p>
              </div>
            </div>
            <div className="main-box-l-m plain center-v">
              <div className="box-item-flex center">
                <img src={HumanImg} />
                <p>근무 인원</p>
              </div>
              <h2>총 {department.userId.length}명</h2>
            </div>
            <div className="main-box-l-b plain center-v">
              <div className="box-item-flex center left-b">
                <img src={HumanImg} />
                <p className="wait-status">근무점 정보</p>
              </div>
              <p className="process-title">근무지점</p>
              <div className="box-item-grid center">
                <div className="grid-grid-v center-v">
                  <h2>3명</h2>
                  <p>현재 대기인원</p>
                </div>
                <div className="grid-grid-v center-v">
                  <h2>163번</h2>
                  <p>현재 상담번호</p>
                </div>
              </div>
              <p className="process-title grid-tmp">카드 업무</p>
              <div className="box-item-grid center">
                <div className="grid-grid-v center-v">
                  <h2>3명</h2>
                  <p>현재 대기인원</p>
                </div>
                <div className="grid-grid-v center-v">
                  <h2>163번</h2>
                  <p>현재 상담번호</p>
                </div>
              </div>
            </div>
          </div>
          <div className="main-main-container-r">
            <div className="branch-name center">{department.deptName}</div>
            <div className="main-btn-list-2">
              <div className="main-btn-item center-v plain" data="management" onClick={onMenuClickHandler}>
                <h2>키오스크 등록</h2>
                <img src={KioskImg} />
              </div>
              <div className="main-btn-item center-v plain" data="button" onClick={onMenuClickHandler}>
                <h2>키오스크 버튼관리</h2>
                <img src={ButtonImg} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default KioskPage;