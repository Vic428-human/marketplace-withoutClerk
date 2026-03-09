import { useEffect, useState } from 'react';

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    // 在 useEffect 外同步讀取，避免警告
    return typeof window !== 'undefined' ? window.matchMedia(query).matches : false;
  });

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // 只監聽變化，不同步 setState
    const listener = (e) => setMatches(e.matches);
    media.addEventListener('change', listener);
    
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
};
