import { useEffect, useRef, useState } from 'react';

/**
 * 동적으로 조절되는 div의 높이를 반환하는 훅
 * @returns \{ divRef, divHeight }
 * @divRef HTMLDivElement; 높이를 반환하고 싶은 div의 ref에 등록
 * @divHeight number; divRef를 등록한 div의 높이를 반환
 */
export default function useResizeHeight() {
  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (divRef.current && divRef.current.clientHeight !== divHeight) {
        setDivHeight(divRef.current.clientHeight);
      }
    };

    updateHeight();

    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, [divHeight]);

  return { divRef, divHeight };
}
