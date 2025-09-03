import { useState, useEffect, useCallback } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    outerHeight: undefined,
  });

  const handleResize = useCallback(() => {
    // Use requestAnimationFrame to batch DOM reads
    requestAnimationFrame(() => {
      const isTypeform = !!document.getElementsByClassName('teacher-typeform').length;

      if (!isTypeform) {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
          outerHeight: window.outerHeight,
        });
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Throttle resize events
      let timeoutId;
      const throttledResize = () => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(handleResize, 16); // ~60fps
      };

      window.addEventListener('resize', throttledResize, { passive: true });
      handleResize(); // Initial call

      return () => {
        window.removeEventListener('resize', throttledResize);
        clearTimeout(timeoutId);
      };
    }
  }, [handleResize]);

  return windowSize;
};

export default useWindowSize;
