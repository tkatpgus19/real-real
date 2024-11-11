import React, { useEffect, useState, useRef } from 'react';
import '../css/MainPage.css';
import AIImg from '../assets/ai.png';
import PreviewCanvas from './PreviewCanvas';
import { getMainTicket, getMainButton, getLayoutList } from '../utils/api';
import PreviewLayoutCanvas from './PreviewLayoutCanvas';
import XImg from '../assets/x.png';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const MainPage = () => {
  const [time, setTime] = useState(new Date());
  const [ticketFlag, setTicketFlag] = useState(false);
  const [ticketItemList, setTicketItemList] = useState([]);
  const [buttonItemList, setButtonItemList] = useState([]);
  const [mainCnt, setMainCnt] = useState(0);
  const [layoutFlag, setLayoutFlag] = useState(false);
  const [layoutList, setLayoutList] = useState([]);
  const [title, setTitle] = useState('');

  const stompClientRef = useRef(null);

  // 메인 활성화 아이템 수 체크
  const checkCnt = (data) => {
    let cnt = 0;
    data.forEach((d) => {
      if (d.active) {
        cnt += 1;
      }
    });
    setMainCnt(cnt);
  };

  // 시간 포맷팅 함수들
  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    return `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
  };

  // 시간 업데이트를 위한 useEffect
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      getMainTicket().then((res) => {
        setTicketItemList(res.data.data.ticketItemList);
      });

      getMainButton().then((res) => {
        setButtonItemList(res.data.data.buttonItemId);
        checkCnt(res.data.data.buttonItemId);
      });

      getLayoutList().then((res) => {
        console.log(res.data.data);
        setLayoutList(res.data.data);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // WebSocket 연결을 위한 useEffect
  useEffect(() => {
    const socket = new SockJS('http://localhost:8081/ws-stomp');
    const stomp = Stomp.over(socket);

    stomp.connect(
      {},
      () => {
        console.log('WebSocket Connected');

        stomp.subscribe('/sub/update/2', (res) => {
          try {
            const receivedData = JSON.parse(res.body);
            console.log('Received WebSocket data:', receivedData);

            if (receivedData.buttonItemId) {
              setButtonItemList(receivedData.buttonItemId);
              checkCnt(receivedData.buttonItemId);
            }
          } catch (error) {
            console.error('Error processing WebSocket message:', error);
          }
        });
      },
      (error) => {
        console.error('WebSocket connection error:', error);
      }
    );

    stompClientRef.current = stomp;

    return () => {
      if (stompClientRef.current) {
        stompClientRef.current.disconnect();
      }
    };
  }, []);

  // 초기 데이터 로드를 위한 useEffect
  useEffect(() => {
    getMainTicket().then((res) => {
      setTicketItemList(res.data.data.ticketItemList);
    });

    getMainButton().then((res) => {
      setButtonItemList(res.data.data.buttonItemId);
      checkCnt(res.data.data.buttonItemId);
    });

    getLayoutList().then((res) => {
      console.log(res.data.data);
      setLayoutList(res.data.data);
    });
  }, []);

  return (
    <div className="kiosk-container">
      {ticketFlag ? (
        <div className="kiosk-modal">
          <img
            style={{ position: 'absolute', width: '30px', bottom: '1100px', right: '400px', zIndex: '5' }}
            onClick={() => setTicketFlag(false)}
            src={XImg}
          />
          <PreviewCanvas data={ticketItemList} title={title} />
        </div>
      ) : null}
      {layoutFlag ? (
        <div className="kiosk-modal">
          <div className="modal-box">
            <h1 style={{ fontSize: '50px', marginTop: '30px' }}>배치도 안내</h1>
            <img
              style={{ position: 'absolute', width: '40px', bottom: '1350px', right: '170px', zIndex: '5' }}
              onClick={() => setLayoutFlag(false)}
              src={XImg}
            />
            <div className="layout-list">
              {layoutList.map((data) => {
                return (
                  <div key={data.id}>
                    <div style={{ height: '500px', marginTop: '50px', marginBottom: '-50px' }}>
                      <PreviewLayoutCanvas data={data.layoutItemId} />
                    </div>
                    <h1
                      style={{
                        marginBottom: '50px',
                        background: '#00c7a9',
                        color: 'white',
                        height: '70px',
                        display: 'flex',
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '20px',
                        margin: 'auto 20px 20px 20px',
                      }}
                    >
                      {data.layoutName}
                    </h1>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}

      <div className="header">
        <img src={AIImg} alt="assistant" className="assistant-image" />
        <div className="header-r">
          <p className="header-date">{formatDate(time)}</p>
          <h1 className="header-time">{formatTime(time)}</h1>
          <div className="current-consulting">
            <p className="consulting-title">현재 상담 진행중인 번호</p>
            <div className="consulting-numbers">
              <div className="consulting-item">
                <p>카드 업무</p>
                <h2>132</h2>
              </div>
              <div className="consulting-item">
                <p>대출 업무</p>
                <h2>122</h2>
              </div>
              <div className="consulting-item">
                <p>일반 업무</p>
                <h2>131</h2>
              </div>
              <div className="consulting-item">
                <p>기타 업무</p>
                <h2>112</h2>
              </div>
            </div>
          </div>
          <button
            className="check-window-button"
            onClick={() => {
              setLayoutFlag(true);
            }}
          >
            창구 배치도 확인하기
          </button>
        </div>
        <p className="help-text">무엇을 도와드릴까요?</p>
      </div>

      <div className={`grid-container task-buttons layout-${mainCnt}`}>
        {buttonItemList.map(
          (data, idx) =>
            data.active && (
              <div
                key={idx}
                onClick={() => {
                  setTicketFlag(true);
                  setTitle(data.title);
                }}
                className="task-button grid-button"
                style={{
                  backgroundColor: data.color === null ? '#00C7A9' : data.color,
                  color: data.textColor,
                }}
              >
                <p className="grid-button-title">{data.title}</p>
                <div className="button-wait">
                  <p style={{ color: 'white' }}>대기 0명</p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default MainPage;
