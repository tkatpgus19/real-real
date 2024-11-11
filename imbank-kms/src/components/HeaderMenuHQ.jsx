import { useNavigate } from 'react-router-dom';
import HomeImg from '../assets/home.png';
import ArrowImg from '../assets/arrow.png';
import { useEffect, useState } from 'react';
import { checkLogin, getDepartmentList } from '../utils/api';

const HeaderMenuHQ = ({ type }) => {
  const status = type;
  const [department, setDepartment] = useState({ userId: [] });
  const [isHQ, setIsHQ] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [departmentList, setDepartmentList] = useState([]);
  const [defaultDName, setDefaultDName] = useState('');
  const navigate = useNavigate();

  // 홈으로
  const goToMainHandler = () => {
    navigate('/main');
  };

  const onDepartmentClickHandler = (e) => {
    const id = e.currentTarget.getAttribute('data');
    setDepartment(departmentList[id]);
    navigate('/dashboard/' + departmentList[id].id);
  };

  useEffect(() => {
    checkLogin()
      .then((res) => {
        if (res.data.errorResponse !== null) {
          navigate('/');
        } else {
          setDefaultDName(res.data.data.department.deptName);
          if (res.data.data.department.id == 11) {
            setIsHQ(true);
            getDepartmentList().then((res) => {
              setDepartmentList(res.data.data);
              setDepartment(res.data.data[0]);
            });
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
          <p>{defaultDName}</p>
          <div className="center" style={{ height: '100%', borderRight: '1px solid darkgray' }}>
            <div className="center hovable" style={{ width: '12vw', height: '100%', position: 'relative' }}>
              {department.deptName}
              <img src={ArrowImg} />
              <div
                className="branch-menu"
                style={{ height: 'fit-content', display: 'grid', gridTemplateRows: '1fr 1fr 1fr', fontSize: '1.5vw' }}
              >
                <div></div>
                {departmentList.map((data, idx) => {
                  return (
                    data.deptName != '본부' && (
                      <div
                        className="branch-menu-item center ticket-menu hovable"
                        style={{ height: '5vh' }}
                        data={data.id - 1}
                        key={idx}
                        onClick={onDepartmentClickHandler}
                      >
                        {data.deptName}
                      </div>
                    )
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMenuHQ;
