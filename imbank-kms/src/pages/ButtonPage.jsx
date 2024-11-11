import { useEffect, useState } from 'react';
import Header from '../components/Header';
import '../css/ButtonPage.css';
import AddImg from '../assets/add.png';
import EditImg from '../assets/edit.png';
import DeleteImg from '../assets/delete.png';
import { checkLogin, deleteButton, getButtonList, postButton, updateMainButton } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import HeaderMenu from '../components/HeaderMenu';

const ButtonPage = () => {
  const [presetList, setPresetList] = useState([]);
  const [mainPrestId, setMainPresetId] = useState(0);
  const [mainPresetItemList, setMainPresetItemList] = useState([]);
  const [department, setDepartment] = useState({});
  const [activatedCntList, setActivatedCntList] = useState([]);
  const [mainPresetItemListCnt, setMainPresetItemListCnt] = useState(0);
  const navigate = useNavigate();

  // 프리셋 추가
  const onAddPresetHandler = () => {
    postButton(department.id, { title: null })
      .then((res) => {
        setPresetList(res.data.data);
        chackValidItemCnt(res.data.data);
        alert('성공적으로 프리셋을 등록했습니다!');
      })
      .catch((err) => (err) => console.log(err));
  };

  // 대표 프리셋 적용
  const onSetPresetHandler = (e) => {
    const idx = e.currentTarget.getAttribute('data');
    updateMainButton(department.id, presetList[idx].id)
      .then((res) => {
        alert('성공적으로 변경했습니다');
        setMainPresetId(presetList[idx].id);
        setMainPresetItemList(presetList[idx].buttonItemId);
        checkMainValidItemCnt(presetList[idx]);
      })
      .catch((err) => alert('서버에 문제가 발생했습니다.'));
  };

  // 프리셋 삭제
  const onDeleteHandler = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const id = e.currentTarget.getAttribute('data');
      if (id == mainPrestId) {
        alert('적용중인 프리셋은 삭제할 수 없습니다');
      } else {
        deleteButton(department.id, id)
          .then((res) => {
            setPresetList(res.data.data);
            chackValidItemCnt(res.data.data);
            alert('성공적으로 삭제했습니다.');
          })
          .catch((err) => alert('서버에 문제가 발생했습니다.'));
      }
    }
  };

  // 프리셋 수정 페이지 이동
  const onEditHandler = (e) => {
    const id = e.currentTarget.getAttribute('data');
    navigate(id);
  };

  // 활성화 아이템 수 체크
  const chackValidItemCnt = (data) => {
    let tmp = [];
    data.forEach((data) => {
      let cnt = 0;
      data.buttonItemId.forEach((d) => {
        if (d.active) {
          cnt += 1;
        }
      });
      tmp.push(cnt);
    });
    setActivatedCntList(tmp);
  };

  // 메인 활성화 아이템 수 체크
  const checkMainValidItemCnt = (data) => {
    let cnt = 0;
    data.buttonItemId.forEach((d) => {
      if (d.active) {
        cnt += 1;
      }
    });
    setMainPresetItemListCnt(cnt);
  };

  useEffect(() => {
    checkLogin()
      .then((res) => {
        if (res.data.errorResponse !== null) {
          alert('로그인이 필요합니다.');
          navigate('/');
        } else {
          setDepartment(res.data.data.department);
          setMainPresetId(res.data.data.department.mainBtnId);
          let main = res.data.data.department.mainBtnId;
          getButtonList(res.data.data.department.id)
            .then((res) => {
              const list = res.data.data;
              list.forEach((data) => {
                if (data.id == main) {
                  setMainPresetId(data.id);
                  setMainPresetItemList(data.buttonItemId);
                  let cnt = 0;
                  data.buttonItemId.forEach((d) => {
                    if (d.active) {
                      cnt += 1;
                    }
                  });
                  setMainPresetItemListCnt(cnt);
                }
              });
              setPresetList(res.data.data);
              chackValidItemCnt(list);
              console.log(list);
            })
            .catch((err) => alert('서버에 문제가 발생했습니다.'));
        }
      })
      .catch((err) => alert('서버에 문제가 발생했습니다.'));
  }, []);
  return (
    <>
      <Header />
      <main>
        <div className="button-main-container">
          <HeaderMenu type={'button'} />
          <div className="button-main-container-b">
            <div className="b-left-box plain">
              <div className="menu-title kiosk-title">
                <p>적용중인 프리셋 미리보기</p>
              </div>
              <div className="kiosk-preview">
                <div></div>
                <div className="preview-layout">
                  {mainPresetItemList.length !== 0 ? (
                    <div className={`grid-container layout-${mainPresetItemListCnt}`}>
                      {mainPresetItemList.map(
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
            </div>
            <div className="b-right-box plain">
              <div className="menu-title kiosk-title">
                <p>저장된 키오스크 버튼 프리셋</p>
              </div>
              <p className="menu-p kiosk-cnt-p">등록된 프리셋 개수: {presetList.length}개</p>

              <div className="preset-list">
                {presetList.length !== 0
                  ? presetList.map((data, idx) => {
                      return (
                        <div className="preset-item plain center-v" key={data.id}>
                          <div className="preset-item-preview" style={{ position: 'relative' }}>
                            <div className="preset-item-preview-hover center-v">
                              <div className="preview-hover-edit center" data={data.id} onClick={onEditHandler}>
                                <img src={EditImg} />
                                <p>편집하기</p>
                              </div>
                              <div className="preview-hover-delete center" data={data.id} onClick={onDeleteHandler}>
                                <img src={DeleteImg} />
                                <p>삭제하기</p>
                              </div>
                            </div>
                            {data.buttonItemId && data.buttonItemId.length !== 0 ? (
                              <div className={`grid-container layout-${activatedCntList[idx]}`}>
                                {data.buttonItemId.map(
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
                            ) : null}
                          </div>
                          <p className="preset-num-p">{data.title}</p>
                          {data.id == mainPrestId ? (
                            <div className="plain center selected-btn" disabled>
                              적용중인 프리셋 입니다
                            </div>
                          ) : (
                            <div className="preset-select-btn plain center" data={idx} onClick={onSetPresetHandler}>
                              해당 프리셋 적용하기
                            </div>
                          )}
                        </div>
                      );
                    })
                  : null}

                <div className="preset-item plain center add-preset" onClick={onAddPresetHandler}>
                  <div className="center add-preset-box">
                    <p>
                      <strong>새 프리셋 등록하기</strong>
                    </p>
                    <img src={AddImg} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default ButtonPage;
