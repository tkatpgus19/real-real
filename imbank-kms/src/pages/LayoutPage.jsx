import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';
import HeaderMenu from '../components/HeaderMenu';
import EditImg from '../assets/edit.png';
import DeleteImg from '../assets/delete.png';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PreviewLayoutCanvas from '../components/PreviewLayoutCanvas';
import '../css/LayoutPage.css';
import {
  checkLogin,
  deleteLayout,
  getLayoutItemList,
  getLayoutList,
  postLayout,
  putLayoutItemList,
} from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LayoutPage = () => {
  const bgPalette = [
    '#FFECEC',
    '#FFF3E2',
    '#FFFFE0',
    '#EEFFDD',
    '#EBFFF5',
    '#E1FDFF',
    '#E1EEFD',
    '#DFE3FF',
    '#EAE5FF',
    '#F8EAFF',
    '#FFE7FB',
    '#EEEEEE',
    '#FFFFFF',
  ];
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(-1);
  const [selectedItemContent, setSelectedItemContent] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('');
  const [resizeMode, setResizeMode] = useState(false); // 리사이즈 모드 상태 추가
  const [layoutList, setLayoutList] = useState([]);
  const [deptId, setDeptId] = useState(-1);
  const [layoutId, setLayoutId] = useState(-1);
  const [selectedLayoutName, setSelectedLayoutName] = useState('');
  const [focusFlag, setFocusFlag] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkLogin()
      .then((info) => {
        const dId = info.data.data.department.id;
        setDeptId(dId);
        getLayoutList(dId).then((response) => {
          setLayoutList(response.data.data);
          const tmp = response.data.data;
          let lId = -1;
          console.log(tmp);
          if (tmp.length > 0) {
            lId = tmp[0].id;
            getLayoutItemList(lId)
              .then((res) => {
                setItems(res.data.data);
              })
              .catch((err) => console.log(err));
          }
        });
      })
      .catch((err) => console.log(err));
  }, []);

  const addItem = (type, color = '#ffffff') => {
    const newItem = {
      id: Date.now(),
      type,
      left: 100,
      top: 100,
      width: 100,
      height: 80,
      content: type === 'text' ? '텍스트 요소' : '',
      background: type != 'text' && `url(/${type}.png)`,
      color,
      isEditing: false,
      showDeleteButton: false,
    };
    items ? setItems((prevItems) => [...prevItems, newItem]) : setItems([newItem]);
  };

  const onInputChange = (e) => {
    setSelectedLayoutName(e.target.value);
  };

  const saveHandler = (e) => {
    const tmp = [...items];
    tmp.forEach((data) => {
      data.layoutId = null;
    });
    tmp.layoutName = selectedLayoutName;
    if (tmp.layoutName == '') {
      alert('배치도 이름을 입력하세요');
    } else {
      putLayoutItemList(layoutId, { layoutName: tmp.layoutName, layoutItemList: tmp })
        .then((res) => {
          console.log(res);
          getLayoutList(deptId).then((response) => {
            alert('성공적으로 저장했습니다.');
            setLayoutList(response.data.data);
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const makeLayoutHandler = () => {
    postLayout(deptId, { layoutName: '배치도' })
      .then((res) => {
        alert('배치도를 성공적으로 추가했습니다!');
        setLayoutList(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const resetLayoutHandler = () => {
    setItems([]);
    setSelectedItemContent('');
    setSelectedItemId(-1);
  };

  const deleteSelectedItem = () => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== selectedItemId));
    setSelectedItemId(null);
  };

  const moveItem = (id, left, top) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, left, top } : item)));
  };

  const updateItemContent = (id, newContent) => {
    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, content: newContent } : item)));
  };
  const DraggableItem = ({ item }) => {
    const [editedContent, setEditedContent] = useState(item.content);
    const [clickTimeout, setClickTimeout] = useState(null);
    const resizeStartPos = useRef({ x: 0, y: 0 });
    const itemStartSize = useRef({ width: 0, height: 0 });

    const [{ isDragging }, drag] = useDrag({
      type: 'item',
      item: () => ({
        id: item.id,
        left: item.left,
        top: item.top,
      }),
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      canDrag: () => !resizeMode, // 리사이즈 모드일 때는 드래그 불가능
    });

    const handleClick = () => {
      if (clickTimeout) {
        clearTimeout(clickTimeout);
      }
      setSelectedItemId(item.id);
      setSelectedItemContent(item.content);
      setSelectedItemType(item.type);
      const newTimeout = setTimeout(() => {
        setItems((prevItems) =>
          prevItems.map((i) =>
            i.id === item.id ? { ...i, showDeleteButton: true } : { ...i, showDeleteButton: false }
          )
        );
      }, 200);

      setClickTimeout(newTimeout);
    };

    const handleDoubleClick = () => {
      setResizeMode(true); // 더블클릭 시 리사이즈 모드 활성화
    };

    const handleChange = (e) => {
      setEditedContent(e.target.value);
    };

    const handleBlur = () => {
      updateItemContent(item.id, editedContent);
      setItems((prevItems) =>
        prevItems.map((i) => (i.id === item.id ? { ...i, isEditing: false, showDeleteButton: false } : i))
      );
    };

    const startResize = (e, direction) => {
      if (!resizeMode) return; // 리사이즈 모드가 아니면 리사이즈 불가능

      e.preventDefault();
      e.stopPropagation();
      resizeStartPos.current = { x: e.clientX, y: e.clientY };
      itemStartSize.current = { width: item.width, height: item.height };

      const handleMouseMove = (moveEvent) => {
        const deltaX = moveEvent.clientX - resizeStartPos.current.x;
        const deltaY = moveEvent.clientY - resizeStartPos.current.y;
        const gridSize = 20;

        let newWidth = itemStartSize.current.width;
        let newHeight = itemStartSize.current.height;

        if (direction.includes('right')) {
          newWidth = Math.max(50, Math.round((itemStartSize.current.width + deltaX) / gridSize) * gridSize);
        }
        if (direction.includes('bottom')) {
          newHeight = Math.max(50, Math.round((itemStartSize.current.height + deltaY) / gridSize) * gridSize);
        }

        setItems((prevItems) =>
          prevItems.map((i) => (i.id === item.id ? { ...i, width: newWidth, height: newHeight } : i))
        );
      };

      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const resizeHandleStyle = resizeMode
      ? {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          border: '2px solid #666',
        }
      : {
          display: 'none',
        };

    return (
      <div
        ref={drag}
        style={{
          position: 'absolute',
          left: item.left,
          top: item.top,
          width: item.width,
          height: item.height,
          opacity: isDragging ? 0.5 : 1,
          cursor: resizeMode ? 'default' : 'move',
        }}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: item.type !== 'text' ? `url(/${item.type}.png) center/contain no-repeat` : item.color,
            border: resizeMode ? '2px solid #666' : item.type === 'text' && '1px solid #ccc',
            borderRadius: '4px',
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            boxSizing: 'border-box',
            textAlign: 'center',
          }}
        >
          {item.isEditing ? (
            <input
              type="text"
              value={editedContent}
              onChange={handleChange}
              onBlur={handleBlur}
              autoFocus
              textAlign="center"
              style={{ width: '100%' }}
            />
          ) : (
            <div style={{ width: '100%', overflow: 'hidden' }}>
              {item.content}
              {resizeMode && (
                <div style={{ position: 'absolute', top: 5, right: 5, fontSize: '12px', color: '#666' }}>
                  리사이즈 모드
                </div>
              )}
            </div>
          )}

          {/* Resize handles */}
          <div
            className="resize-handle right"
            onMouseDown={(e) => startResize(e, 'right')}
            style={{
              position: 'absolute',
              right: -5,
              top: 0,
              width: 10,
              height: '100%',
              cursor: resizeMode ? 'e-resize' : 'default',
              ...resizeHandleStyle,
            }}
          />
          <div
            className="resize-handle bottom"
            onMouseDown={(e) => startResize(e, 'bottom')}
            style={{
              position: 'absolute',
              bottom: -5,
              left: 0,
              width: '100%',
              height: 10,
              cursor: resizeMode ? 'n-resize' : 'default',
              ...resizeHandleStyle,
            }}
          />
          <div
            className="resize-handle corner"
            onMouseDown={(e) => startResize(e, 'right bottom')}
            style={{
              position: 'absolute',
              right: -5,
              bottom: -5,
              width: 10,
              height: 10,
              cursor: resizeMode ? 'se-resize' : 'default',
              backgroundColor: resizeMode ? 'white' : 'transparent',
              border: resizeMode ? '2px solid #666' : 'none',
              borderRadius: '0 0 4px 0',
              ...resizeHandleStyle,
            }}
          />
        </div>
      </div>
    );
  };

  const Canvas = () => {
    const [, drop] = useDrop({
      accept: 'item',
      drop: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);

        moveItem(item.id, left, top); // 격자 단위가 아닌, 자유롭게 이동
      },
    });

    const handleCanvasClick = (e) => {
      if (e.target === e.currentTarget) {
        setResizeMode(false);
      }
    };

    return (
      <div
        ref={drop}
        onClick={handleCanvasClick}
        style={{
          width: '90%',
          height: '80%',
          position: 'relative',
          border: '1px solid #ddd',
          backgroundSize: '20px 20px',
          margin: 'auto',
          backgroundImage:
            'linear-gradient(to right, #ccc 1px, transparent 1px), linear-gradient(to bottom, #ccc 1px, transparent 1px)',
          overflow: 'hidden',
        }}
      >
        {items && items.map((item) => <DraggableItem key={item.id} item={item} />)}
      </div>
    );
  };
  const onChange = (e) => {
    setSelectedItemContent(e.target.value);
    let tmp = [...items];
    tmp.forEach((data) => {
      if (data.id === selectedItemId) {
        data.content = e.target.value;
      }
    });
    setItems(tmp);
  };

  const onSaveHandler = () => {
    const tmp = [...items];
    tmp.forEach((data) => {
      data.layoutId = null;
    });
    tmp.layoutName = selectedLayoutName;
    if (tmp.layoutName == '') {
      alert('배치도 이름을 입력하세요');
    } else {
      putLayoutItemList(layoutId, { layoutName: tmp.layoutName, layoutItemList: tmp })
        .then((res) => {
          console.log(res);
          getLayoutList(deptId).then((response) => {
            alert('성공적으로 저장했습니다.');
            setLayoutList(response.data.data);
            navigate('/main');
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteLayoutHandler = (e) => {
    if (confirm('해당 배치도를 삭제하시겠습니까??')) {
      const lId = e.currentTarget.getAttribute('data');
      deleteLayout(lId)
        .then((res) => {
          console.log(res);
          alert('배치도를 성공적으로 삭제했습니다..');
          setSelectedItemType(null);
          setLayoutId(-1);
          setLayoutList(res.data.data);
          setSelectedLayoutName('');
        })
        .catch((err) => console.log(err));
    }
  };

  const onDeleteHandler = () => {
    if (confirm('해당 배치도를 삭제하시겠습니까??')) {
      const lId = layoutId ? layoutId : e.currentTarget.getAttribute('data');
      deleteLayout(lId)
        .then((res) => {
          console.log(res);
          alert('배치도를 성공적으로 삭제했습니다..');
          setSelectedItemType(null);
          setLayoutId(-1);
          setLayoutList(res.data.data);
          setSelectedLayoutName('');
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      <Header />
      <main>
        <div className="button-main-container">
          <HeaderMenu type={'layout'} add={'배치도 커스텀'} />
          <div className="layout-edit-main-container-b">
            <div className="b-left-box plain">
              <div className="menu-title kiosk-title">
                <p>배치도 편집 도구</p>
              </div>
              <div className="edit-layout-menu-grid">
                {layoutId < 0 ? (
                  <p>배치도를 우측에서 선택해주세요.</p>
                ) : (
                  <>
                    <div>
                      <p style={{ fontWeight: 'normal', fontSize: '1.2vw' }} className="edit-p">
                        배치도 이름 변경
                      </p>
                      <input
                        className="title-input"
                        placeholder="배치도의 이름을 변경하세요"
                        onChange={onInputChange}
                        value={selectedLayoutName}
                        disabled={focusFlag}
                      />
                    </div>
                    <div>
                      <p style={{ fontWeight: 'normal', fontSize: '1.2vw' }} className="edit-p">
                        배치 요소 추가
                      </p>
                      <div className="layout-palette">
                        {bgPalette.map((data) => {
                          return (
                            <div
                              className="layout-palette-item"
                              style={{ background: data }}
                              onClick={() => addItem('text', data)}
                              key={data}
                            ></div>
                          );
                        })}
                        <div
                          className="layout-palette-item"
                          onClick={() => addItem('kiosk')}
                          style={{ background: 'url(/kiosk.png) center/contain no-repeat' }}
                        ></div>
                        <div
                          className="layout-palette-item"
                          onClick={() => addItem('window')}
                          style={{ background: 'url(/window.png) center/contain no-repeat' }}
                        ></div>
                        <div
                          className="layout-palette-item"
                          onClick={() => addItem('my')}
                          style={{ background: 'url(/my.png) center/contain no-repeat' }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <p
                        style={{
                          visibility: selectedItemId > 0 ? 'visible' : 'hidden',
                          fontWeight: 'normal',
                          fontSize: '1.2vw',
                        }}
                        className="edit-p"
                      >
                        배치 요소 내용 변경
                      </p>
                      <input
                        className="title-input"
                        placeholder="변경할 요소 내용을 적어주세요."
                        style={{
                          visibility:
                            selectedItemId > 0 ? (selectedItemType == 'text' ? 'visible' : 'hidden') : 'hidden',
                        }}
                        onChange={onChange}
                        value={selectedItemContent}
                      />
                      <div
                        className="save-exit-btn center"
                        style={{ background: '#FFBCBC', visibility: selectedItemId > 0 ? 'visible' : 'hidden' }}
                        onClick={deleteSelectedItem}
                        disabled={!selectedItemId}
                      >
                        요소 삭제하기
                      </div>
                      <div className="save-exit-btn center" data={selectedItemId} onClick={onSaveHandler}>
                        저장하고 메인으로 가기
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="button-edit-box-m plain">
              <div className="button-edit-box-m-header">
                <div className="menu-title kiosk-title">
                  <p>배치도명: {selectedLayoutName}</p>
                </div>
                <div className="edit-btn-box">
                  <div className="edit-btn-add" onClick={makeLayoutHandler}>
                    새 배치도 만들기
                  </div>
                  {layoutId > 0 && (
                    <>
                      <div className="edit-btn-save" onClick={saveHandler}>
                        저장
                      </div>
                      <div className="edit-btn-reset" style={{ marginRight: '0.5vw' }} onClick={resetLayoutHandler}>
                        초기화
                      </div>
                      <div className="edit-btn-delete" onClick={onDeleteHandler}>
                        삭제
                      </div>
                    </>
                  )}
                </div>
              </div>
              {/* 2x2버튼 */}
              {layoutId > 0 ? (
                <DndProvider backend={HTML5Backend}>
                  <Canvas />
                </DndProvider>
              ) : (
                <h1 style={{ textAlign: 'center', marginTop: '15vh' }}>배치도를 선택해주세요.</h1>
              )}
              {/* 2x2버튼 */}
            </div>
            <div className="layout-list-container plain">
              <div className="menu-title kiosk-title">
                <p>배치도 목록</p>
              </div>
              <div className="layout-list-box">
                {layoutList.length == 0 ? (
                  <p style={{ textAlign: 'center' }}>배치도가 없습니다.</p>
                ) : (
                  layoutList.map((data, idx) => {
                    return (
                      <div style={{ textAlign: 'center' }} key={idx}>
                        <div className="layout-list-item plain" style={{ position: 'relative' }}>
                          <PreviewLayoutCanvas data={data.layoutItemId} />
                          <div className="preset-item-hover center-v">
                            <div
                              className="preview-hover-edit center edit"
                              data={data}
                              onClick={() => {
                                setItems(data.layoutItemId);
                                setLayoutId(data.id);
                                setSelectedLayoutName(data.layoutName);
                                setFocusFlag(false);
                              }}
                            >
                              <img src={EditImg} />
                              <p className="grid-edit-btn">편집하기</p>
                            </div>
                            <div
                              className="preview-hover-delete center delete"
                              data={data.id}
                              onClick={deleteLayoutHandler}
                            >
                              <img src={DeleteImg} />
                              <p>삭제하기</p>
                            </div>
                          </div>
                        </div>
                        <div className="layout-item-title plain">{data.layoutName}</div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LayoutPage;
