import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const InitialPage = () => {
  const [nextStage, setNextStage] = useState(0);
  const navigate = useNavigate();
  const client = useRef();
  const ROOM_ID = 'imbank12345';

  const connectRoom = () => {
    const socket = new SockJS('http://localhost:8081/ws-stomp');
    client.current = Stomp.over(socket);

    client.current.connect(
      {},
      // 연결 성공 콜백
      () => {
        console.log('WebSocket Connected!');
        // 연결된 후에 메시지 전송
        client.current.send(
          '/pub/enter',
          {},
          JSON.stringify({
            roomId: ROOM_ID,
            message: '연결 요청',
          })
        );

        // 구독 설정
        client.current.subscribe('/sub/event/' + ROOM_ID, onChatReceived);
        client.current.subscribe('/sub/' + ROOM_ID, onRoomReceived);

        setNextStage(1);
      },
      // 에러 콜백
      (error) => {
        console.error('WebSocket Error:', error);
      }
    );
  };

  const onChatReceived = (payload) => {
    const message = JSON.parse(payload.body);
    console.log('Received message:', message);
  };

  const onRoomReceived = (payload) => {
    const message = JSON.parse(payload.body);
    console.log('Received room message:', message);
  };

  const sendRequest = () => {
    if (client.current && client.current.connected) {
      client.current.send(
        '/pub/request',
        {},
        JSON.stringify({
          roomId: ROOM_ID,
          message: '요청 메시지',
        })
      );
    }
  };
  return (
    <div className="kiosk-container">
      <div className="kiosk-modal">
        <div className="modal-box">
          {nextStage === 0 ? (
            <div>
              <h1>관리자 시스템에 등록이 필요합니다.</h1>
              <div className="modal-send-btn" onClick={connectRoom}>
                등록 요청하기
              </div>
            </div>
          ) : nextStage === 1 ? (
            <>
              <h1>시스템으로 요청을 전송했습니다.</h1>
              <div className="modal-send-btn" onClick={sendRequest}>
                추가 요청 보내기
              </div>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default InitialPage;
