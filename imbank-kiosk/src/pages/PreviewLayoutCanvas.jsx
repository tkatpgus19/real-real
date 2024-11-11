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

  const scale = dimensions.width / 600;
  const sizeFactor = 0.45;
  const textElementSizeFactor = 0.55;
  // fontSizeFactor를 매우 작게 설정
  const fontSizeFactor = 0.08;
  const positionFactor = 0.55;
  const leftOffset = 15;

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
        border: '1px solid gray',
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
          data.map((item) => {
            const currentSizeFactor = item.type === 'text' ? textElementSizeFactor : sizeFactor;

            return (
              <div
                key={item.id}
                style={{
                  position: 'absolute',
                  left: `${item.left * scale * positionFactor + leftOffset}px`,
                  top: `${item.top * scale * positionFactor}px`,
                  // fontSize를 직접적인 픽셀값으로도 제한
                  fontSize: Math.min(item.fontSize * scale * fontSizeFactor, 12) + 'px',
                  fontWeight: item.fontWeight,
                  padding: `${2 * scale}px`,
                  borderRadius: `${2 * scale}px`,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: item.height ? `${item.height * scale * currentSizeFactor}px` : 'auto',
                  width: item.width
                    ? `${item.width * scale * currentSizeFactor}px`
                    : `${(item.type === 'text' ? 180 : 130) * scale}px`,
                  textAlign: 'center',
                  background: item.type !== 'text' ? `url(/${item.type}.png) center/contain no-repeat` : item.color,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  // 최소 높이 설정으로 텍스트가 잘리지 않도록
                  minHeight: '20px',
                  lineHeight: '1',
                }}
              >
                {item.content}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default PreviewLayoutCanvas;
