import { useEffect, useState } from 'react';
import Header from '../components/Header';
import HeaderMenu from '../components/HeaderMenu';
import '../css/TicketPage.css';
import { checkLogin, deleteLayout, deleteTicket, getTicketList, postTicket, updateMainTicket } from '../utils/api';
import EditImg from '../assets/edit.png';
import DeleteImg from '../assets/delete.png';
import AddImg from '../assets/add.png';
import { useNavigate } from 'react-router-dom';
import PreviewCanvas from '../components/PreviewCanvas';

const TicketPage = () => {
  const [presetList, setPresetList] = useState([]);
  const [mainPresetId, setMainPresetId] = useState(-1);
  const [mainPresetItemList, setMainPresetItemList] = useState([]);
  const [department, setDepartment] = useState({});
  const [mainPresetItem, setMainPresetItem] = useState({});
  const navigate = useNavigate();

  // 프리셋 추가
  const onAddPresetHandler = () => {
    postTicket(department.id, { title: null })
      .then((res) => {
        console.log(res.data.data);
        setPresetList(res.data.data);
        alert('성공적으로 프리셋을 등록했습니다!');
      })
      .catch((err) => alert('서버에 문제가 발생했습니다.'));
  };

  // 편집
  const onEditHandler = (e) => {
    const id = e.currentTarget.getAttribute('data');
    navigate(id);
  };

  // 대표 프리셋 적용
  const onSetPresetHandler = (e) => {
    const idx = e.currentTarget.getAttribute('data');
    updateMainTicket(department.id, presetList[idx].id)
      .then((res) => {
        alert('성공적으로 변경했습니다');
        setMainPresetId(presetList[idx].id);
        setMainPresetItemList(presetList[idx].ticketItemList);
      })
      .catch((err) => alert('서버에 문제가 발생했습니다.'));
  };

  // 프리셋 삭제
  const onDeleteHandler = (e) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      const id = e.currentTarget.getAttribute('data');
      if (id == mainPresetId) {
        alert('적용중인 프리셋은 삭제할 수 없습니다');
      } else {
        deleteTicket(department.id, id)
          .then((res) => {
            console.log(res);
            setPresetList(res.data.data);
            alert('성공적으로 삭제했습니다.');
          })
          .catch((err) => alert('서버에 문제가 발생했습니다.'));
      }
    }
  };

  useEffect(() => {
    checkLogin()
      .then((res) => {
        if (res.data.errorResponse !== null) {
          alert('로그인이 필요합니다.');
          navigate('/');
        } else {
          setDepartment(res.data.data.department);
          setMainPresetId(res.data.data.department.mainTicketId);
          let main = res.data.data.department.mainTicketId;
          getTicketList(res.data.data.department.id)
            .then((res) => {
              const list = res.data.data;
              list.forEach((data) => {
                if (data.id == main) {
                  setMainPresetId(data.id);
                  setMainPresetItemList(data.ticketItemList);
                  setMainPresetItem(data);
                }
              });
              setPresetList(res.data.data);
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
          <HeaderMenu type={'ticket'} />
          <div className="button-main-container-b">
            <div className="b-left-box plain">
              <div className="menu-title kiosk-title">
                <p>적용중인 프리셋 미리보기</p>
              </div>
              <div className="ticket-preview center-v" style={{ border: 'none' }}>
                {mainPresetId === null ? (
                  <p style={{ textAlign: 'center' }}>적용중인 프리셋이 없습니다.</p>
                ) : (
                  <>
                    <div className="preview-ticket">
                      <PreviewCanvas data={mainPresetItemList} />
                    </div>
                    <h2 style={{ margin: '2vh', fontSize: '1.5vw' }}>{mainPresetItem.title}</h2>
                    <p style={{ marginBottom: '1vh' }}>출력되는 번호표는 위와 같습니다.</p>
                    <p style={{ fontSize: '0.8vw', width: '70%' }}>
                      * 업무 종류에 맞춰서 업무명, 대기번호, 대기 인원이 출력됩니다.
                    </p>
                    <p style={{ fontSize: '0.8vw', width: '70%' }}>
                      * 그 외의 정보는 모든 업무에서 동일하게 출력됩니다.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="b-right-box plain">
              <div className="menu-title kiosk-title">
                <p>저장된 번호표 프리셋</p>
              </div>
              <p className="menu-p kiosk-cnt-p">등록된 프리셋 개수: {presetList.length}개</p>

              <div className="preset-list">
                {presetList.length !== 0
                  ? presetList.map((data, idx) => {
                      return (
                        <div className="preset-item plain center-v" key={data.id}>
                          <div className="preset-item-preview-ticket" style={{ position: 'relative' }}>
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
                            <PreviewCanvas data={data.ticketItemList} />
                          </div>
                          <p style={{ margin: '-3vh 0 6vh 0', fontSize: '2.5vh' }} className="preset-num-p">
                            {data.title ? data.title : '이름 없는 프리셋'}
                          </p>
                          {data.id == mainPresetId ? (
                            <div className="plain center selected-btn ticket-btn" disabled>
                              적용중인 프리셋 입니다
                            </div>
                          ) : (
                            <div
                              className="preset-select-btn plain center ticket-btn"
                              data={idx}
                              onClick={onSetPresetHandler}
                            >
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

export default TicketPage;
