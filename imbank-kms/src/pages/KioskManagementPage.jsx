import Header from '../components/Header';
import HomeImg from '../assets/home.png';
import ArrowImg from '../assets/arrow.png';
import '../css/KioskManagementPage.css';
import AddImg from '../assets/add.png';
import KioskFImg from '../assets/kiosk-f.png';
import XImg from '../assets/x.png';
import ValidImg from '../assets/finished.png';
import { useEffect, useState } from 'react';
import { checkLogin, deleteKiosk, getKioskList, postKiosk } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import HeaderMenu from '../components/HeaderMenu';

const KioskManagementPage = () => {
  const [kioskList, setKioskList] = useState([]);
  const [department, setDepartment] = useState({});
  const [registerStep, setRegisterStep] = useState(-1);
  const navigate = useNavigate();

  // 키오스크 등록
  const onAddKioskHandler = () => {
    setRegisterStep(0);
    postKiosk(department.id, { kioskId: uuidv4() })
      .then((res) => {
        setKioskList(res.data.data);
        alert('성공적으로 등록했습니다!');
      })
      .catch((err) => console.log(err));
  };

  // 키오스크 등록 취소
  const onCancelAddKioskHandler = () => {
    setRegisterStep(-1);
  };

  // 키오스크 등록 절차 진행
  const onProgressModalHandler = () => {
    setRegisterStep(registerStep + 1);
  };

  // 키오스크 삭제
  const onDeleteKioskHandler = (e) => {
    const id = e.currentTarget.getAttribute('data');
    deleteKiosk(department.id, id)
      .then((res) => {
        setKioskList(res.data.data);
        alert('성공적으로 삭제했습니다!');
      })
      .catch((err) => alert('서버에 문제가 발생했습니다.'));
  };

  useEffect(() => {
    checkLogin()
      .then((res) => {
        if (res.data.errorResponse !== null) {
          alert('로그인이 필요합니다.');
          navigate('/');
        } else {
          setDepartment(res.data.data.department);
          getKioskList(res.data.data.department.id)
            .then((r) => {
              setKioskList(r.data.data);
            })
            .catch((err) => alert('서버에 문제가 발생했습니다.'));
        }
      })
      .catch((err) => alert('서버에 문제가 발생했습니다.'));
  }, []);
  return (
    <>
      <div className="modal-wrapper">
        {registerStep !== -1 ? (
          <div className="kiosk-modal center">
            <div className="modal-box center-v">
              <img src={XImg} className="modal-box-x" onClick={onCancelAddKioskHandler} />
              <h1>키오스크 등록하기</h1>
              {registerStep == 0 ? (
                <p>
                  등록하실 키오스크의 ID를 입력하시고
                  <br />
                  다음 버튼을 누르신 후, 화면에 뜨는 숫자를 <br />
                  키오스크에 입력해주세요.
                </p>
              ) : registerStep == 1 ? (
                <p className="center">
                  화면에 뜨는 숫자를 키오스크에 입력 후,
                  <br />
                  확인 버튼을 눌러주세요.
                </p>
              ) : (
                <p className="center">키오스크 등록이 완료되었습니다.</p>
              )}
              {registerStep == 0 ? (
                <>
                  <input placeholder="등록하실 키오스크의 ID를 입력하세요." />
                  <div className="button-s modal-btn" data="1" onClick={onProgressModalHandler}>
                    다음
                  </div>
                </>
              ) : registerStep == 1 ? (
                <p className="center" style={{ fontSize: '5vw' }} data="2" onClick={onProgressModalHandler}>
                  62
                </p>
              ) : (
                <img className="finished-img" src={ValidImg} style={{ width: '5vw' }} />
              )}
            </div>
          </div>
        ) : null}
        <Header />
        <main>
          <div className="kiosk-management-main-container">
            <HeaderMenu type={'kiosk'} add={'키오스크 등록'} />
            <div className="kiosk-main-container-b plain">
              <div className="menu-title">
                <p>등록된 키오스크</p>
              </div>
              <p className="menu-p">등록된 키오스크 : {kioskList.length}개</p>
              <div className="menu-item-box center">
                <div className="kiosk-item-box-tmp center">
                  {kioskList.length === 0 ? (
                    <>
                      <h2>등록된 키오스크가 없습니다.</h2>
                    </>
                  ) : (
                    <div className="kiosk-item-list">
                      {kioskList.length === 0
                        ? null
                        : kioskList.map((data, idx) => {
                            return (
                              <>
                                <div className="kiosk-items center">
                                  <div className="kiosk-items-box center">
                                    <img src={KioskFImg} />
                                    <p>등록 순서: {idx + 1}</p>
                                    <p>키오스크 ID: {data.id}</p>
                                    <p>등록된 날짜: {data.createdAt}</p>
                                    <div className="button-del" data={data.id} onClick={onDeleteKioskHandler}>
                                      연결 해제하기
                                    </div>
                                  </div>
                                </div>
                              </>
                            );
                          })}
                    </div>
                  )}

                  <div className="main-add-btn button-m" onClick={onAddKioskHandler}>
                    새 키오스크 등록하기
                    <img src={AddImg} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default KioskManagementPage;
