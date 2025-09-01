import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
    outerHeight: undefined,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      function handleResize() {
        const isTypeform = !!document.getElementsByClassName('teacher-typeform').length;

        if (!isTypeform) {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
            outerHeight: window.outerHeight,
          });
        }
      }

      window.addEventListener('resize', handleResize);
      handleResize();

      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return windowSize;
};

export default useWindowSize;
