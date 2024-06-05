import { useState, useEffect } from 'react';

/**
 * 미디어 쿼리를 반환하는 훅
 * @param query string; ex) 'min-width: 768px'
 * @returns boolean; query를 만족하는지 여부
 */
export default function useMediaQuery(query: string) {
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const documentChangeHandler = () => setIsMatch(mediaQueryList.matches);

    // Initial check
    setIsMatch(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', documentChangeHandler);
    return () => mediaQueryList.removeEventListener('change', documentChangeHandler);
  }, [query]);

  return isMatch;
}
