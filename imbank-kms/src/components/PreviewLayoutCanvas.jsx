import { useEffect, useRef, useState } from 'react';

const PreviewLayoutCanvas = ({ data }) => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

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
    const handleResize = () => {
      updateDimensions();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 원본 크기를 기준으로 스케일 계산 (600이 원본 너비라고 가정)
  const scale = dimensions.width / 450;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '95%',
        height: '85%',
        margin: 'auto',
        boxSizing: 'border-box',
        overflow: 'hidden',
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
                left: `${item.left * scale}px`,
                top: `${item.top * scale}px`,
                fontSize: `${item.fontSize * scale}px`,
                fontWeight: item.fontWeight,
                padding: `${5 * scale}px`,
                borderRadius: `${4 * scale}px`,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: item.height ? `${item.height * scale}px` : 'auto',
                width: item.width ? `${item.width * scale}px` : `${250 * scale}px`,
                textAlign: 'center',
                background: item.type !== 'text' ? `url(/${item.type}.png) center/contain no-repeat` : item.color,
              }}
            >
              {item.content}
            </div>
          ))}
      </div>
    </div>
  );
};

export default PreviewLayoutCanvas;
