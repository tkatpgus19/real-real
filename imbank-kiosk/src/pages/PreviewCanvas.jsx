import { useEffect, useRef, useState } from 'react';

const PreviewCanvas = ({ data, title }) => {
  const CANVAS_WIDTH = 300;
  const CANVAS_HEIGHT = 400;
  const ORIGINAL_WIDTH = 380;

  const containerRef = useRef(null);
  const scale = CANVAS_WIDTH / ORIGINAL_WIDTH;

  // 중앙보다 약간 왼쪽으로 이동 (중앙값에서 20% 정도 왼쪽으로)
  const centerX = CANVAS_WIDTH / 2 - 30;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          background: '#f0f0f0',
          border: '1px solid #000',
          boxSizing: 'border-box',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >
          {data &&
            data.map((item) => {
              const itemWidth = 200 * scale;
              const adjustedLeft = centerX + item.left * scale - itemWidth / 2;

              return (
                <div
                  key={item.id}
                  style={{
                    position: 'absolute',
                    left: `${adjustedLeft - 50}px`,
                    top: `${item.top * scale + 25}px`,
                    fontSize: `${item.fontSize * scale}px`,
                    fontWeight: item.fontWeight,
                    padding: '2px',
                    borderRadius: '2px',
                    width: `${itemWidth + 50}px`,
                    visibility: item.visible ? 'visible' : 'hidden',
                    textAlign: 'center',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.content == 'OO업무'
                    ? title
                    : item.content == 'OOOO년 OO월 OO일'
                    ? '2024년 11월 12일'
                    : item.content}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default PreviewCanvas;
