import { useEffect } from 'react';

const LazyStyleLoader = ({ styles = [] }) => {
  useEffect(() => {
    const loadStyles = async () => {
      for (const style of styles) {
        try {
          await import(style);
        } catch (error) {
          console.warn(`Failed to load style: ${style}`, error);
        }
      }
    };

    // Load styles after initial render
    const timer = setTimeout(loadStyles, 0);
    return () => clearTimeout(timer);
  }, [styles]);

  return null;
};

export default LazyStyleLoader;