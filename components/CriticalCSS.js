import { useEffect } from 'react';

const CriticalCSS = () => {
  useEffect(() => {
    // Force load critical navigation styles
    const criticalStyles = `
      .search-header { position: relative !important; }
      .search-header.fixed { position: fixed !important; top: 0 !important; left: 0 !important; right: 0 !important; z-index: 30 !important; }
      .btn-primary { display: flex !important; align-items: center !important; justify-content: center !important; padding: 0.75rem 2.75rem !important; border-radius: 9999px !important; font-weight: 500 !important; font-size: 16px !important; background-color: rgb(33, 105, 124) !important; color: white !important; border: 2px solid rgb(33, 105, 124) !important; }
      .flex { display: flex !important; }
      .items-center { align-items: center !important; }
      .justify-between { justify-content: space-between !important; }
      .hidden { display: none !important; }
      @media (min-width: 1024px) { .lg\\:flex { display: flex !important; } .lg\\:hidden { display: none !important; } }
    `;
    
    const styleElement = document.createElement('style');
    styleElement.textContent = criticalStyles;
    styleElement.setAttribute('data-critical', 'true');
    document.head.appendChild(styleElement);
    
    return () => {
      const criticalStyleElements = document.querySelectorAll('style[data-critical="true"]');
      criticalStyleElements.forEach(el => el.remove());
    };
  }, []);

  return null;
};

export default CriticalCSS;