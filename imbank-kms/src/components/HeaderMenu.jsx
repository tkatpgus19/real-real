import { useNavigate } from 'react-router-dom';
import HomeImg from '../assets/home.png';
import ArrowImg from '../assets/arrow.png';
import { useEffect, useState } from 'react';
import { checkLogin } from '../utils/api';

const HeaderMenu = ({ type, add }) => {
  const status = type;
  const plus = add;
  const [department, setDepartment] = useState({ userId: [] });
  const [isHQ, setIsHQ] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();
  // 홈으로
  const goToMainHandler = () => {
    navigate('/main');
  };

  // 버튼
  const goToButtonHandler = () => {
    navigate('/kiosk/button');
  };

  // 번호표
  const goToTicketHandler = () => {
    navigate('/ticket');
  };

  // 배치도
  const goToLayoutHandler = () => {
    navigate('/layout');
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
      <div className="branch-name-f plain center">
        <div className="branch-left">
          <p className="img-p hovable">
            <img src={HomeImg} onClick={goToMainHandler} />
          </p>
          <p>{department.deptName}</p>
          {!isHQ ? (
            <div style={{ height: '100%' }}>
              <div
                className="kiosk hovable center"
                style={{
                  position: 'relative',
                  height: '100%',
                  fontSize: '1vw',
                  paddingLeft: '1vw',
                  borderRight: '1px solid darkgray',
                }}
              >
                {type == 'kiosk' || type == 'button'
                  ? '키오스크 관리'
                  : type == 'ticket'
                  ? '번호표 관리'
                  : '배치도 관리'}
                <img src={ArrowImg} />
                <div
                  className="branch-menu"
                  style={{ height: '300%', display: 'grid', gridTemplateRows: '1fr 1fr 1fr' }}
                >
                  <div></div>
                  {type == 'kiosk' || type == 'button' ? (
                    <>
                      <div className="branch-menu-item center ticket-menu hovable" onClick={goToTicketHandler}>
                        번호표 관리
                      </div>
                      <div className="branch-menu-item center layout-menu hovable" onClick={goToLayoutHandler}>
                        배치도 관리
                      </div>
                    </>
                  ) : type == 'ticket' ? (
                    <>
                      <div className="branch-menu-item center ticket-menu hovable" onClick={goToButtonHandler}>
                        버튼 관리
                      </div>
                      <div className="branch-menu-item center layout-menu hovable" onClick={goToLayoutHandler}>
                        배치도 관리
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="branch-menu-item center ticket-menu hovable" onClick={goToButtonHandler}>
                        버튼 관리
                      </div>
                      <div className="branch-menu-item center layout-menu hovable" onClick={goToTicketHandler}>
                        번호표 관리
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ) : null}
          {plus && <p>{plus}</p>}
        </div>
      </div>
    </>
  );
};

export default HeaderMenu;
