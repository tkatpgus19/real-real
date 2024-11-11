import { useEffect, useRef, useState } from 'react';

const PreviewCanvas = ({ data }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  // 컨테이너 크기에 따라 캔버스 크기 조정
  const updateDimensions = () => {
    if (containerRef.current) {
      const container = containerRef.current.parentElement;
      const width = container.clientWidth;
      const height = container.clientHeight;
      setDimensions({ width, height });
    }
  };

  useEffect(() => {
    updateDimensions();
    // 윈도우 리사이즈 이벤트에 대응
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 스케일 계산 (380은 원본 기준 너비)
  const scale = dimensions.width / 380;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: '#f0f0f0',
        border: '2px solid #000',
        boxSizing: 'border-box',
        overflow: 'hidden', // 내용이 넘치지 않도록 설정
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                left: `${item.left}px`,
                top: `${item.top}px`,
                fontSize: `${item.fontSize}px`,
                fontWeight: item.fontWeight,
                padding: '5px',
                borderRadius: '4px',
                width: '250px',
                visibility: item.visible ? 'visible' : 'hidden',
                textAlign: 'center',
              }}
            >
              {item.content}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PreviewCanvas;
