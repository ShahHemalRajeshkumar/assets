import { useEffect, useState } from 'react';
import { performanceOptimizer } from '../utils/performance-optimizer';

export const useThirdPartyScripts = () => {
  const [scriptsLoaded, setScriptsLoaded] = useState({
    elfsight: false,
    brevo: false,
    mapbox: false,
  });

  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    let interactionTimer;

    const handleUserInteraction = () => {
      setUserInteracted(true);
   
      ['click', 'scroll', 'keydown', 'touchstart'].forEach((event) =>
        document.removeEventListener(event, handleUserInteraction)
      );
    };

    
    ['click', 'scroll', 'keydown', 'touchstart'].forEach((event) =>
      document.addEventListener(event, handleUserInteraction, { passive: true })
    );

  
    interactionTimer = setTimeout(() => {
      setUserInteracted(true);
    }, 3000);

    return () => {
      clearTimeout(interactionTimer);
      ['click', 'scroll', 'keydown', 'touchstart'].forEach((event) =>
        document.removeEventListener(event, handleUserInteraction)
      );
    };
  }, []);

  const loadScript = async (src, key) => {
    if (!scriptsLoaded[key] && userInteracted) {
      try {
       
        const consent = localStorage.getItem('cookie-consent')
          ? JSON.parse(localStorage.getItem('cookie-consent')).functional
          : true; 
        if (consent) {
          await performanceOptimizer.loadScriptOnIdle(src);
          setScriptsLoaded((prev) => ({ ...prev, [key]: true }));
        }
      } catch (error) {
        console.warn(`Failed to load ${key} script:`, error);
      }
    }
  };

  const loadElfsight = () => loadScript('https://static.elfsight.com/platform/platform.js', 'elfsight');
  const loadBrevo = () => loadScript('https://conversations-widget.brevo.com/sib-conversations.js', 'brevo');
  const loadMapbox = () => loadScript('https://api.mapbox.com/mapbox-gl-js/v2.10.0/mapbox-gl-csp.js', 'mapbox');

  return {
    scriptsLoaded,
    userInteracted,
    loadElfsight,
    loadBrevo,
    loadMapbox,
  };
};