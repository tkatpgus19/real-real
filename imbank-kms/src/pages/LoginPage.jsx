import '../css/LoginPage.css';
import LogoImg from '../assets/logo.png';
import LoginImg1 from '../assets/loginImg1.png';
import LoginImg2 from '../assets/loginImg2.png';
import LoginImg3 from '../assets/loginImg3.png';
import ValidImg from '../assets/valid.png';
import InvalidImg from '../assets/invalid.png';
import { useEffect, useState } from 'react';
import LoginIndicator from '../components/LoginIndicator';
import { checkLogin, getDuplication, postLoginInfo, postRegisterInfo } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentStep, setCurrentStep] = useState(-1);
  const [registerInfo, setRegisterInfo] = useState({
    id: '',
    password: '',
    userDVCD: '',
    username: '',
    deptId: 0,
  });
  const [loginInfo, setLoginInfo] = useState({
    id: '',
    password: '',
  });
  const [isValid, setIsValid] = useState(false);
  const [tmpPasswd, setTmpPasswd] = useState('');
  const navigate = useNavigate();
  const images = [LoginImg1, LoginImg2, LoginImg3];

  const onRegisterBtnClickHandler = () => {
    setCurrentStep(1);
  };

  // input 값 저장
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    console.log(registerInfo);
    setRegisterInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
    if (name == 'password') {
      setIsValid(registerInfo.password === tmpPasswd);
    }
  };

  // 비밀번호 체크
  const onCheckHandler = (e) => {
    const passwd = e.target.value;
    setTmpPasswd(passwd);
    setIsValid(registerInfo.password === passwd);
  };

  // 로그인 단계 변경
  const onNextBtnHandler = (e) => {
    const step = Number(e.currentTarget.getAttribute('data'));
    if (step === 2 && checkValidation()) {
      getDuplication(registerInfo.id)
        .then((res) => {
          if (res.data.errorResponse === null) {
            setCurrentStep(step);
          } else {
            alert('중복되는 아이디입니다.');
          }
        })
        .catch(() => alert('서버에 문제가 발생했습니다.'));
    } else if (step === 3) {
      postRegisterInfo(registerInfo)
        .then((res) => {
          if (res.data.errorResponse === null) {
            setCurrentStep(step);
          } else {
            alert('존재하지 않는 소속 코드 혹은 부서 코드입니다. 담당 부서로 문의 바랍니다.');
          }
        })
        .catch((err) => alert('서버에 문제가 발생했습니다.'));
    } else if (step === -1) {
      setCurrentStep(-1);
    }
  };

  // 입력값 검증
  const checkValidation = () => {
    if (!/^[가-힣]+$/.test(registerInfo.username)) {
      alert('이름은 한글만 입력 가능합니다.');
      return false;
    } else if (registerInfo.id.length < 6 || registerInfo.id.length > 12) {
      alert('아이디는 최소 6자리부터 최대 12자까지 입력 해야합니다.');
      return false;
    } else if (!/[a-zA-Z]/.test(registerInfo.id)) {
      alert('아이디는 최소 1개의 알파벳을 포함해야 합니다.');
      return false;
    } else if (registerInfo.password.length < 6 || registerInfo.password.length > 12) {
      alert('비밀번호는 최소 6자리부터 최대 12자까지 입력 해야합니다.');
      return false;
    } else if (!isValid) {
      alert('비밀번호를 다시 확인해주세요.');
      return false;
    }
    return true;
  };

  // 엔터 감지
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 폼 제출 방지
      login(); // 로그인 함수 호출
    }
  };

  // 로그인
  const login = () => {
    if (!loginInfo.id || !loginInfo.password) {
      alert('아이디, 비밀번호를 입력하세요.');
    } else {
      postLoginInfo(loginInfo)
        .then((res) => {
          if (res.data.errorResponse) {
            alert('아이디 혹은 비밀번호를 확인해주세요.');
          } else {
            navigate('/main');
          }
        })
        .catch(() => alert('서버에 문제가 발생했습니다.'));
    }
  };

  // 로그인 정보 수정
  const onLoginInputChangeHandler = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  useEffect(() => {
    // 변하는 이미지 출력
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 쿠키 및 토큰이 유효하면 서비스로 이동
    checkLogin()
      .then((res) => {
        if (res.data.errorResponse === null) {
          navigate('/main');
        }
      })
      .catch(() => alert('서버에 문제가 발생했습니다.'));
  }, []);

  return (
    <div className="login-main-container">
      <div className="center login-main-container-l">
        {images.map((image, index) => (
          <div key={index} className={`image-container ${index === currentIndex ? 'active' : 'inactive'}`}>
            <img src={image} alt={`Slide ${index}`} />
          </div>
        ))}
        <div className="login-main-container-l-hover">
          <img src={LogoImg} alt="Logo" />
        </div>
      </div>
      <div className="center login-main-container-r">
        <div className="center login-input-box">
          <h1>Sign in</h1>
          {currentStep === -1 ? (
            <>
              <input
                className="center login-input"
                placeholder="아이디"
                name="id"
                onChange={onLoginInputChangeHandler}
              />
              <input
                className="center login-input"
                placeholder="비밀번호"
                type="password"
                name="password"
                onChange={onLoginInputChangeHandler}
                onKeyPress={handleKeyPress}
              />
              <div className="button login-btn" onClick={login}>
                로그인
              </div>
              <p onClick={onRegisterBtnClickHandler}>
                관리자로 등록되어 있지 않으신가요? <strong>등록하러 가기</strong>
              </p>
            </>
          ) : currentStep === 1 ? (
            <>
              <LoginIndicator currentStep={currentStep} />
              <input
                className="center login-input register-input"
                name="username"
                placeholder="이름을 입력해주세요"
                onChange={onChangeHandler}
              />
              <input
                className="center login-input register-input"
                name="id"
                placeholder="아이디를 입력해주세요"
                onChange={onChangeHandler}
              />
              <input
                className="center login-input register-input"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                onChange={onChangeHandler}
              />
              <div className="login-input-wrapper">
                <input
                  className="center login-input register-input"
                  type="password"
                  placeholder="비밀번호를 다시 한번 입력해주세요"
                  onChange={onCheckHandler}
                />
                <img src={isValid ? ValidImg : InvalidImg} alt="icon" className="input-icon" />
              </div>
              <div className="button login-btn" data={2} onClick={onNextBtnHandler}>
                다음
              </div>
            </>
          ) : currentStep === 2 ? (
            <>
              <LoginIndicator currentStep={currentStep} />
              <input
                className="center login-input register-input"
                name="deptId"
                type="number"
                placeholder="소속 코드를 입력해주세요"
                onChange={onChangeHandler}
              />
              <input
                className="center login-input register-input"
                name="userDVCD"
                type="number"
                placeholder="업무 구분코드를 입력해주세요"
                onChange={onChangeHandler}
              />
              <input className="center login-input register-input hidden" />
              <input className="center login-input register-input hidden" />
              <div className="button login-btn" data={3} onClick={onNextBtnHandler}>
                다음
              </div>
            </>
          ) : (
            <>
              <LoginIndicator currentStep={currentStep} />
              <div className="center-v register-finish-box">
                <img src={ValidImg} alt="icon" />
                <h2>
                  회원가입 요청이
                  <br />
                  성공적으로 완료되었습니다.
                </h2>
                <p>
                  새로운 iM뱅크 관리자님 환영합니다!
                  <br />
                  회원가입 승인이 날때까지 잠시만 기다려주세요!
                  <br />
                  회원가입 승인이 난 후, 로그인 할 수 있습니다.
                </p>
              </div>
              <div className="button login-btn" data={-1} onClick={onNextBtnHandler}>
                로그인 하러가기
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
