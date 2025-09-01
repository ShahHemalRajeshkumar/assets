// Critical CSS extraction utility
export const extractCriticalCSS = () => {
  if (typeof window === 'undefined') return '';
  
  const criticalStyles = `
    body { font-family: 'Roboto', sans-serif; margin: 0; }
    .header { background: #fff; }
    .loading { opacity: 0; }
    .loaded { opacity: 1; transition: opacity 0.3s; }
  `;
  
  return criticalStyles;
};

export const loadNonCriticalCSS = (href) => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  link.media = 'print';
  link.onload = () => { link.media = 'all'; };
  document.head.appendChild(link);
};