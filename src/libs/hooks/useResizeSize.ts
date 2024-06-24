import { useEffect, useRef, useState } from 'react';

/**
 * 동적으로 조절되는 div의 넓이, 높이를 반환하는 훅
 * @returns \{ divRef, divWidth, divHeight }
 * @divRef HTMLDivElement; 높이를 반환하고 싶은 div의 ref에 등록
 * @divWidth number; divRef를 등록한 div의 넓이를 반환
 * @divHeight number; divRef를 등록한 div의 높이를 반환
 */
export default function useResizeSize() {
  const divRef = useRef<HTMLDivElement>(null);
  const [divWidth, setDivWidth] = useState(0);
  const [divHeight, setDivHeight] = useState(0);

  useEffect(() => {
    const updateSize = () => {
      if (divRef.current && divRef.current.clientWidth !== divWidth) {
        setDivWidth(divRef.current.clientWidth);
      }
      if (divRef.current && divRef.current.clientHeight !== divHeight) {
        setDivHeight(divRef.current.clientHeight);
      }
    };

    updateSize();

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [divHeight, divWidth]);

  return { divRef, divWidth, divHeight };
}
