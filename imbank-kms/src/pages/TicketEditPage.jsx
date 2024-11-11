import { useEffect, useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import XImg from '../assets/x.png';
import Header from '../components/Header';
import HeaderMenu from '../components/HeaderMenu';
import PreviewCanvas from '../components/PreviewCanvas';
import '../css/TicketEditPage.css';
import { useNavigate, useParams } from 'react-router-dom';
import { getTicketItemList, postTicketItemList, putTicket } from '../utils/api';

const DraggableText = ({
  text,
  left,
  top,
  onMove,
  id,
  type,
  onTextUpdate,
  onDelete,
  canvasWidth,
  fontSize,
  fontWeight,
  isEditing,
  onEditingChange,
}) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'TEXT',
      item: { id, left, top, fontSize, fontWeight },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [left, top, fontSize, fontWeight]
  );

  const handleDoubleClick = () => {
    onEditingChange(id, true); // 수정 모드로 변경
  };

  const handleConfirm = (newText) => {
    onTextUpdate(id, newText, fontSize, fontWeight, left); // 텍스트 업데이트
    onEditingChange(id, false); // 수정 모드 종료
  };

  const handleBoldToggle = () => {
    const newFontWeight = fontWeight === 'normal' ? 'bold' : 'normal';
    onTextUpdate(id, text, fontSize, newFontWeight, left); // 개별적으로 fontWeight 변경
  };

  const handleCenterAlign = () => {
    const centeredLeft = canvasWidth / 2 - 110; // 캔버스 가로 중앙으로 정렬 (요소 너비가 250px이므로 절반을 뺌)
    onTextUpdate(id, text, fontSize, fontWeight, centeredLeft);
  };

  return (
    <div
      ref={drag}
      onDoubleClick={handleDoubleClick}
      style={{
        position: 'absolute',
        left: Math.max(0, left), // left가 0보다 작으면 0으로 설정
        top,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight,
        width: '220px',
        textAlign: 'center',
        zIndex: isEditing ? 101 : 100,
        backgroundColor: 'white',
        borderRadius: '5px',
        padding: '5px',
        boxShadow: '0 0 5px rgba(0,0,0,0.2)',
      }}
    >
      {isEditing ? (
        <div
          contentEditable={type == 'TEXT' ? true : false}
          suppressContentEditableWarning
          onBlur={(e) => handleConfirm(e.target.innerText)} // 입력 후 포커스를 잃을 때 확인
          style={{
            width: '100%',
            border: '1px dashed #ccc', // 테두리 추가
            padding: '5px',
            borderRadius: '5px',
            textAlign: 'center',
          }}
        >
          {text} {/* 기존 텍스트 표시 */}
        </div>
      ) : (
        <span>{text}</span> // 수정 모드가 아닐 때 텍스트 보여주기
      )}
      {isEditing && (
        <div style={{ marginTop: '5px' }}>
          <div className="custom-btn" onClick={() => onTextUpdate(id, text, fontSize + 1, fontWeight, left)}>
            +
          </div>
          <div
            className="custom-btn"
            onClick={() => onTextUpdate(id, text, Math.max(fontSize - 1, 1), fontWeight, left)}
          >
            -
          </div>
          <div className="custom-btn" onClick={handleBoldToggle}>
            {fontWeight === 'normal' ? '더 굵게' : '보통 굵게'}
          </div>
          <div className="custom-btn" onClick={handleCenterAlign}>
            가운데 정렬하기
          </div>
          <div className="custom-btn confirm-btn" onClick={() => handleConfirm(text)}>
            메뉴닫기
          </div>
          {id > 5 && (
            <div className="custom-btn delete-btn" onClick={() => onDelete(id)}>
              삭제하기
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const Canvas = ({ items, moveItem, updateText, deleteItem, toggleItem, editingChange }) => {
  const [, drop] = useDrop(
    () => ({
      accept: ['TEXT', 'IMAGE'],
      drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        let newLeft = Math.round(item.left + delta.x);
        let newTop = Math.round(item.top + delta.y);

        // left가 0보다 작으면 0으로 설정
        if (newLeft < 0) newLeft = 0;

        moveItem(item.id, newLeft, newTop);
      },
    }),
    [moveItem]
  );

  const canvasWidth = 350; // 캔버스 너비
  const canvasHeight = 440; // 캔버스 높이를 늘림

  return (
    <div
      ref={drop}
      style={{
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        position: 'relative',
        border: '1px solid black',
        marginTop: '16px',
        backgroundImage:
          'linear-gradient(90deg, #e0e0e0 1px, transparent 1px), linear-gradient(#e0e0e0 1px, transparent 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      {items.map((item) => (
        <DraggableText
          key={item.id}
          id={item.id}
          type={item.type}
          text={item.content}
          left={item.left}
          top={item.top}
          onMove={moveItem}
          onTextUpdate={updateText}
          onDelete={deleteItem}
          canvasWidth={canvasWidth}
          fontSize={item.fontSize}
          fontWeight={item.fontWeight}
          isEditing={item.isEditing}
          onEditingChange={editingChange}
        />
      ))}
    </div>
  );
};

const TicketEditPage = () => {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const onSaveAndExitHandler = () => {
    setModalFlag(true);
  };
  const onCancelAddKioskHandler = () => {
    setModalFlag(false);
  };

  const onPresetNameChangeHandler = (e) => {
    setPresetName(e.target.value);
  };
  const [presetName, setPresetName] = useState('');
  const saveNexit = () => {
    if (presetName == '') {
      alert('최소한 한 글자 이상을 입력해주세요.');
    } else {
      putTicket(ticketId, { ticketTitle: presetName })
        .then((res) => {
          console.log(res);
          postTicketItemList(ticketId, { ticketItemDtoList: items })
            .then((res) => {
              alert('성공적으로 저장헀습니다.');
              navigate('/ticket');
            })
            .catch((err) => alert('서버에 문제가 발생했습니다.'));
        })
        .catch((err) => alert('서버에 문제가 발생했습니다.'));
    }
  };
  const onResetClickHandler = () => {
    if (ticketId !== -1) {
      getTicketItemList(ticketId)
        .then((res) => {
          console.log(res);
          const tmp = res.data.data.ticketItemList; // 서버에서 받은 아이템 목록
          const tmp2 = [...initialItems]; // 초기 아이템 목록을 복사하여 작업

          tmp.forEach((data) => {
            const matchingItemIndex = tmp2.findIndex((d) => d.type != 'TEXT' && d.type === data.type); // 일치하는 타입이 있는지 확인

            if (matchingItemIndex !== -1) {
              // 타입이 일치하는 항목이 있으면 해당 항목의 속성 업데이트
              tmp2[matchingItemIndex] = {
                ...tmp2[matchingItemIndex], // 기존 항목의 값을 유지
                visible: data.visible, // 서버에서 받아온 visible 값으로 업데이트
                left: data.left, // left 값 업데이트
                top: data.top, // top 값 업데이트
                fontWeight: data.fontWeight, // fontWeight 값 업데이트
                fontSize: data.fontSize, // fontSize 값 업데이트
              };
            } else {
              // 타입이 일치하는 항목이 없으면 새로운 항목 추가
              tmp2.push({
                id: tmp2.length + 1, // 새로운 아이템의 id는 기존 아이템 개수 + 1
                type: data.type,
                content: data.content || '새 텍스트', // content가 없으면 기본값 설정
                left: data.left,
                top: data.top,
                fontSize: data.fontSize,
                fontWeight: data.fontWeight,
                visible: data.visible,
                isEditing: false, // 새로 추가되는 아이템은 기본적으로 편집 모드 아님
                name: data.name || '기본이름', // name이 없으면 기본값 설정
              });
            }
          });

          // 최종적으로 업데이트된 tmp2를 items 상태에 설정
          setItems(tmp2);
        })
        .catch((err) => console.log(err));
    }
  };
  const onSavePresetHandler = () => {
    postTicketItemList(ticketId, { ticketItemDtoList: items })
      .then((res) => {
        alert('성공적으로 저장헀습니다.');
      })
      .catch((err) => alert('서버에 문제가 발생했습니다.'));
  };
  useEffect(() => {
    onResetClickHandler();
  }, []);

  const initialItems = [
    {
      id: 1,
      type: 'ES_TYPE',
      content: 'OO업무',
      left: 66,
      top: 50,
      fontSize: 30,
      fontWeight: 'normal',
      visible: false,
      isEditing: false,
      name: '창구종류',
    },
    {
      id: 2,
      type: 'ES_NUM',
      content: 'OO번',
      left: 66,
      top: 100,
      fontSize: 70,
      fontWeight: 'bold',
      visible: false,
      isEditing: false,
      name: '대기번호',
    },
    {
      id: 3,
      type: 'ES_DATE',
      content: 'OOOO년 OO월 OO일',
      left: 66,
      top: 200,
      fontSize: 20,
      fontWeight: 'normal',
      visible: false,
      isEditing: false,
      name: '날짜',
    },
    {
      id: 4,
      type: 'ES_WAITING',
      content: '대기인수 : O명',
      left: 66,
      top: 250,
      fontSize: 16,
      fontWeight: 'normal',
      visible: false,
      isEditing: false,
      name: '대기인원수',
    },
    {
      id: 5,
      type: 'ES_NAME',
      content: 'iM뱅크',
      left: 66,
      top: 300,
      fontSize: 30,
      fontWeight: 'normal',
      visible: false,
      isEditing: false,
      name: '마크',
    },
  ];
  const [items, setItems] = useState(initialItems);
  const [modalFlag, setModalFlag] = useState(false);

  const moveItem = (id, left, top) => {
    const gridSize = 20; // 격자 크기 설정
    const canvasWidth = 390; // 캔버스 너비
    const canvasHeight = 430; // 캔버스 높이

    // left와 top을 격자에 맞게 조정하여 스냅
    const snappedLeft = Math.round(left / gridSize) * gridSize;
    const snappedTop = Math.round(top / gridSize) * gridSize;

    // left, top을 캔버스 영역 내로 제한하고 격자에 맞춘 값 사용
    const limitedLeft = Math.max(0, Math.min(snappedLeft, canvasWidth - 260)); // 요소 너비(250px)를 고려하여 오른쪽 경계를 설정
    const limitedTop = Math.max(0, Math.min(snappedTop, canvasHeight - 50)); // 요소 높이(50px)를 고려하여 아래쪽 경계를 설정

    setItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, left: limitedLeft, top: limitedTop } : item))
    );
  };

  const updateText = (id, newText, fontSize, fontWeight, newLeft) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, content: newText, fontSize, fontWeight, left: newLeft } : item
      )
    );
  };

  const deleteItem = (id) => {
    if (id > 5) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  };

  const toggleVisibility = (id) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, visible: !item.visible } : item)));
  };

  const handleAddText = () => {
    const newId = Math.max(...items.map((item) => item.id)) + 1; // 기존 최대 ID + 1로 설정
    setItems((prevItems) => [
      ...prevItems,
      {
        id: newId,
        type: 'TEXT',
        content: '새 텍스트',
        left: 50,
        top: 300,
        fontSize: 16,
        fontWeight: 'normal',
        visible: true,
        isEditing: false,
      },
    ]);
  };

  const editingChange = (id, isEditing) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, isEditing } : item)));
  };
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
            <HeaderMenu type={'ticket'} add={'번호표 커스텀'} />
            <div className="button-edit-main-container-b">
              <div className="b-left-box plain">
                <div className="menu-title kiosk-title">
                  <p>번호표 미리보기</p>
                </div>
                <div className="preview-ticket">
                  <PreviewCanvas data={items} />
                </div>
                <div className="save-exit-btn center" onClick={onSaveAndExitHandler}>
                  저장하고 나가기
                </div>
              </div>
              <div className="button-edit-box-m plain">
                <div className="button-edit-box-m-header">
                  <div className="menu-title kiosk-title">
                    <p>번호표 요소 배치</p>
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
                <DndProvider backend={HTML5Backend}>
                  <div
                    style={{
                      padding: '16px',
                      width: '420px', // 모달 너비 조정
                      backgroundColor: 'white',
                      position: 'relative',
                      zIndex: 100,
                      margin: 'auto',
                    }}
                  >
                    <Canvas
                      items={items.filter((item) => item.visible)} // visible이 true인 요소만 표시
                      moveItem={moveItem}
                      updateText={updateText}
                      deleteItem={deleteItem}
                      toggleItem={toggleVisibility}
                      editingChange={editingChange}
                    />
                  </div>
                </DndProvider>
              </div>
              <div className="button-edit-box-r plain">
                <div className="menu-title kiosk-title">
                  <p>번호표 프리셋 편집</p>
                </div>
                <div className="edit-ticket-menu-grid">
                  <div>
                    <p style={{ marginBottom: '2vh' }} className="edit-p">
                      번호표에 들어갈 정보
                    </p>
                    <div className="toggle-button-list">
                      {items.map((item) =>
                        item.type !== 'TEXT' ? (
                          <div
                            key={item.id} // 각 아이템에 고유한 key 추가
                            className={`default-btn center plain ${item.visible ? 'enabled' : 'disabled'}`}
                            onClick={() => toggleVisibility(item.id)}
                          >
                            {item.name}
                          </div>
                        ) : (
                          <></>
                        )
                      )}
                    </div>
                  </div>
                  <div className="edit-info">
                    <p className="edit-info-p">
                      * 넣을 정보에 대한 버튼을 선택할 시, 좌측의 번호표 캔버스에 자동으로 정렬돼서 작성 칸이
                      들어갑니다.
                    </p>
                    <p className="edit-info-p">* 작성칸은 캔버스에서 자유롭게 이동할 수 있습니다.</p>
                    <p className="edit-info-p">
                      * 작성칸을 더블 클릭하면 글씨 크기, 글씨 굵기, 내용 수정, 가운데 정렬 여부, 작성칸 삭제를 선택할
                      수 있습니다.
                    </p>
                  </div>
                  <div>
                    <p style={{ marginBottom: '2vh' }} className="edit-p">
                      번호표에 텍스트 추가하기
                    </p>
                    <button className="button-add-text-box plain" onClick={handleAddText}>
                      텍스트 박스 추가
                    </button>
                    <p className="edit-info-p">* 텍스트 박스의 속성 또한 위의 정보 박스 속성과 같습니다.</p>
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

export default TicketEditPage;
