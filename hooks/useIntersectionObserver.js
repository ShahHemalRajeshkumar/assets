import { useState, useEffect } from 'react';

const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [enteredViewport, setEnteredViewport] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      entry.isIntersecting && setEnteredViewport(true);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return {
    isIntersecting,
    enteredViewport,
  };
};

export default useIntersectionObserver;
