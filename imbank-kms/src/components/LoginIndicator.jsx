const LoginIndicator = ({ currentStep }) => {
  return (
    <div className="login-indicator">
      <div className="center-v indicator-box">
        <div className={`indicator-step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
        <p>회원정보</p>
      </div>
      <div className="indicator-line"></div>
      <div className="center-v indicator-box">
        <div className={`indicator-step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
        <p>부서정보</p>
      </div>
      <div className="indicator-line"></div>
      <div className="center-v indicator-box">
        <div className={`indicator-step ${currentStep >= 3 ? 'active' : ''}`}>3</div>
        <p>완료</p>
      </div>
    </div>
  );
};

export default LoginIndicator;
