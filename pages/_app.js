import '../styles/tailwind.css';
import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const CookieManager = dynamic(() => import('../components/CookieManager'), { ssr: false });

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();

  useEffect(() => {
    // Load non-critical styles after initial render
    const loadStyles = async () => {
      await Promise.all([
        import('../styles/globals.scss'),
        import('../styles/NewDesigns/styles.scss'),
        import('../styles/TeacherInfo/styles.scss'),
        import('../styles/TeacherSearch/styles.scss'),
        import('../components/InstrumentComponents/styles.scss'),
        import('../components/evta/styles.scss'),
        import('../styles/NewDesigns/langToggle.scss'),
      ]);
    };
    
    // Defer style loading
    const timeoutId = setTimeout(loadStyles, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <CookieManager />
    </>
  );
};

export default MyApp;