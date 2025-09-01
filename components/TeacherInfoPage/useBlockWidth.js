import { useCallback, useState, useEffect } from 'react';

const useBlockWidth = (contentRef, name) => {
  const [blockWidth, setBlockWidth] = useState(0);

  const updateWidth = useCallback(() => {
    if (contentRef?.current) {
      if (name === 'storybook') {
        setBlockWidth(contentRef.current?.offsetWidth);
      }
      if (name === 'swiper') {
        if (window.innerWidth < 1300) {
          setBlockWidth(window.innerWidth - (window.innerWidth < 1100 ? 60 : 470));
        } else {
          setBlockWidth(contentRef.current?.offsetWidth);
        }
      }
    }
  }, [contentRef, name]);

  useEffect(() => {
    window.addEventListener('resize', updateWidth);
    updateWidth();

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [updateWidth]);

  return { blockWidth };
};

export default useBlockWidth;
