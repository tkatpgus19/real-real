import '../css/ButtonEditPage.css';
import Header from '../components/Header';
import PlusImg from '../assets/plus.png';
import EditImg from '../assets/edit.png';
import DeleteImg from '../assets/delete.png';
import XImg from '../assets/x.png';
import { useEffect, useState } from 'react';
import { checkLogin, getButtonItemList, putButton, putButtonItemList } from '../utils/api';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderMenu from '../components/HeaderMenu';

const ButtonEditPage = () => {
  const [buttonItemList, setButtonItemList] = useState([]);
  const [targetItemIdx, setTargetItemIdx] = useState(-1);
  const [department, setDepartment] = useState({});
  const [activatedCnt, setActivatedCnt] = useState(0);
  const [modalFlag, setModalFlag] = useState(false);
  const [presetTitle, setPresetTitle] = useState('');
  const navigate = useNavigate();
  const { buttonId } = useParams();
  const bgColor = [
    '#E2F15E',
    '#D3EE63',
    '#BFEB6A',
    '#ACE770',
    '#9FE474',
    '#82DF7D',
    '#62D988',
    '#51D68E',
    '#39D196',
    '#00C7A9',
  ];
  const txtColor = ['#FFFFFF', '#DFDFDF', '#BFBFBF', '#9F9F9F', '#7F7F7F', '#5F5F5F', '#1F1F1F', '#000000'];

  // 버튼 추가
  const onAddButtonHandler = (e) => {
    const tmp = [...buttonItemList];
    const idx = e.currentTarget.getAttribute('data');
    tmp[idx].active = true;
    setTargetItemIdx(idx);
    setButtonItemList(tmp);
    setActivatedCnt(activatedCnt + 1);
  };

  // 버튼 편집
  const setTargetItemHandler = (e) => {
    const tmp = [...buttonItemList];
    const idx = e.currentTarget.getAttribute('data');
    tmp[idx].active = true;
    setTargetItemIdx(idx);
    setButtonItemList(tmp);
  };

  // 버튼 삭제
  const deleteTargetItemHandler = (e) => {
    const tmp = [...buttonItemList];
    const idx = e.currentTarget.getAttribute('data');
    tmp[idx].active = false;
    setTargetItemIdx(-1);
    setButtonItemList(tmp);
    setActivatedCnt(activatedCnt - 1);
  };

  // 버튼 배경색 변경
  const onSetBgColorHandler = (e) => {
    const tmp = [...buttonItemList];
    const color = e.currentTarget.getAttribute('data');
    tmp[targetItemIdx].color = color;
    setButtonItemList(tmp);
  };

  // 버튼 글자색 변경
  const onSetTextColorHandler = (e) => {
    const tmp = [...buttonItemList];
    const textColor = e.currentTarget.getAttribute('data');
    tmp[targetItemIdx].textColor = textColor;
    setButtonItemList(tmp);
  };

  // 버튼 이름 변경
  const onButtonTitleChangeHandler = (e) => {
    const text = e.target.value;
    const tmp = [...buttonItemList];
    tmp[targetItemIdx].title = text;
    setButtonItemList(tmp);
  };

  // 더미 함수
  const dummyHandler = () => {};

  // 버튼 상태 초기화
  const onResetClickHandler = () => {
    const tmp = [...buttonItemList];
    tmp.forEach((data) => {
      data.active = false;
      data.title = null;
      data.color = null;
      data.textColor = null;
    });
    setTargetItemIdx(-1);
    setButtonItemList(tmp);
    setActivatedCnt(0);
  };

  // 프리셋 저장
  const onSavePresetHandler = () => {
    const buttonItemDtoList = buttonItemList.map((button) => ({
      isActive: button.active,
      title: button.title,
      color: button.color,
      textColor: button.textColor,
    }));

    putButtonItemList(buttonId, { buttonItemDtoList: buttonItemDtoList })
      .then((res) => {
        alert('성공적으로 저장했습니다.');
      })
      .catch((err) => alert('서버에 문제가 발생했습니다.'));
  };

  // 저장 모달 출력
  const onSaveAndExitHandler = () => {
    setModalFlag(true);
  };

  // 저장하고 나가기
  const saveNexit = () => {
    if (presetTitle === '') {
      alert('최소 한글자를 입력하세요.');
    } else {
      putButton(buttonId, { btnTitle: presetTitle })
        .then((res) => {
          const buttonItemDtoList = buttonItemList.map((button) => ({
            isActive: button.active,
            title: button.title,
            color: button.color,
            textColor: button.textColor,
          }));

          putButtonItemList(buttonId, { buttonItemDtoList: buttonItemDtoList })
            .then((res) => {
              alert('성공적으로 저장했습니다.');
              navigate('/kiosk/button');
            })
            .catch((err) => alert('서버에 문제가 발생했습니다.'));
        })
        .catch((err) => alert('서버에 문제가 발생했습니다.'));
    }
  };

  // 모달 닫기
  const onCancelAddKioskHandler = () => {
    setModalFlag(false);
  };

  // 프리셋 이름 변경
  const onPresetNameChangeHandler = (e) => {
    const name = e.target.value;
    setPresetTitle(name);
  };

  useEffect(() => {
    checkLogin()
      .then((res) => {
        if (res.data.errorResponse !== null) {
          alert('로그인이 필요합니다.');
          navigate('/');
        } else {
          setDepartment(res.data.data.department);
          getButtonItemList(buttonId)
            .then((r) => {
              let cnt = 0;
              r.data.data.buttonItemDtoList.forEach((data) => {
                if (data.active) {
                  cnt += 1;
                }
              });
              setActivatedCnt(cnt);
              setButtonItemList(r.data.data.buttonItemDtoList);
            })
            .catch((err) => alert('서버에 문제가 발생했습니다.'));
        }
      })
      .catch((err) => alert('서버에 문제가 발생했습니다.'));
  }, []);
  return (
    <>
      <div className="modal-wrapper">
        {modalFlag && (
          <div className="kiosk-modal center">
            <div className="modal-box center-v">
              <img src={XImg} className="modal-box-x" onClick={onCancelAddKioskHandler} />
              <h1 style={{ marginBottom: '2vh' }}>프리셋 이름 지정</h1>
              <p>등록하실 프리셋의 이름을 입력해주세요.</p>
              <input
                placeholder="프리셋 이름을 입력해주세요."
                onChange={onPresetNameChangeHandler}
                style={{ height: '3vw', borderRadius: '10px', marginBottom: '2vh', fontSize: '1vw' }}
              />
              <div className="button-s" style={{ padding: '1.5vw 2vw', width: '8vw' }} onClick={saveNexit}>
                저장
              </div>
            </div>
          </div>
        )}
        <Header />
        <main>
          <div className="button-main-container">
            <HeaderMenu type={'button'} add={'버튼 커스텀'} />
            <div className="button-edit-main-container-b">
              <div className="b-left-box plain">
                <div className="menu-title kiosk-title">
                  <p>프리셋 미리보기</p>
                </div>
                <div className="kiosk-preview">
                  <div></div>
                  <div className="preview-layout">
                    {buttonItemList.length !== 0 ? (
                      <div className={`grid-container layout-${activatedCnt}`}>
                        {buttonItemList.map(
                          (data, idx) =>
                            data.active && (
                              <div
                                key={idx}
                                className="grid-button"
                                style={{
                                  backgroundColor: data.color === null ? '#00C7A9' : data.color,
                                  color: data.textColor,
                                }}
                              >
                                <p className="grid-button-title">{data.title}</p>
                              </div>
                            )
                        )}
                      </div>
                    ) : (
                      <p>프리셋 초기 설정이 필요합니다.</p>
                    )}
                  </div>
                </div>
                <div className="save-exit-btn center" onClick={onSaveAndExitHandler}>
                  저장하고 나가기
                </div>
              </div>
              <div className="button-edit-box-m plain">
                <div className="button-edit-box-m-header">
                  <div className="menu-title kiosk-title">
                    <p>프리셋 버튼 배치</p>
                  </div>
                  <div className="edit-btn-box">
                    <div className="edit-btn-reset" onClick={onResetClickHandler}>
                      초기화
                    </div>
                    <div className="edit-btn-save" onClick={onSavePresetHandler}>
                      저장
                    </div>
                  </div>
                </div>
                {/* 2x2버튼 */}
                <div className="button-edit-area">
                  {buttonItemList.map((data, idx) => {
                    return (
                      <div
                        className="button-box"
                        onClick={!data.active ? onAddButtonHandler : dummyHandler}
                        data={idx}
                        key={idx}
                        style={{
                          background: data.active
                            ? data.color
                              ? data.color
                              : '#00C7A9'
                            : `url(${PlusImg}) no-repeat center/auto, #9C9C9C`,
                          color: data.textColor ? data.textColor : '#fff',
                        }}
                      >
                        {data.active && data.title}
                        {data.active ? (
                          <div className="button-box-activated-hover center">
                            <div className="activated-hover-item">
                              <div className="a-hover-edit" data={idx} onClick={setTargetItemHandler}>
                                <img src={EditImg} />
                                <p>편집하기</p>
                              </div>
                              <div className="a-hover-delete" data={idx} onClick={deleteTargetItemHandler}>
                                <img src={DeleteImg} />
                                <p>삭제하기</p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="button-box-hover"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
                {/* 2x2버튼 */}
              </div>
              <div className="button-edit-box-r plain">
                {targetItemIdx >= 0 ? (
                  <>
                    <div className="menu-title kiosk-title">
                      <p>{Number(targetItemIdx) + 1}번 버튼 편집</p>
                    </div>
                    <div className="edit-menu-grid">
                      <div className="edit-menu-grid-item">
                        <p>버튼 색상 편집</p>
                        <div className="color-palette">
                          {bgColor.map((data, idx) => {
                            return (
                              <div
                                className="color-item"
                                style={{ background: data }}
                                data={data}
                                onClick={onSetBgColorHandler}
                                key={idx}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="edit-menu-grid-item">
                        <p>버튼 글씨 색상 편집</p>
                        <div className="color-palette">
                          {txtColor.map((data, idx) => {
                            return (
                              <div
                                className="color-item"
                                style={{ background: data }}
                                data={data}
                                onClick={onSetTextColorHandler}
                                key={idx}
                              ></div>
                            );
                          })}
                        </div>
                      </div>
                      <div className="edit-menu-grid-item">
                        <p>버튼 내용 편집</p>
                        <input
                          placeholder="버튼에 들어갈 내용을 입력해주세요."
                          onChange={onButtonTitleChangeHandler}
                          value={targetItemIdx !== -1 ? buttonItemList[targetItemIdx].title || '' : ''} // title이 null이면 빈 문자열 사용
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <h3 className="edit-btn-guide">편집할 버튼을 선택해주세요</h3>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ButtonEditPage;
