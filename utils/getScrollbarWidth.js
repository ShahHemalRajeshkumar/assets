let cachedScrollbarWidth = null;

export const getScrollbarWidth = () => {
  // Return cached value to avoid repeated DOM measurements
  if (cachedScrollbarWidth !== null) {
    return cachedScrollbarWidth;
  }

  // Use CSS custom property if available (modern browsers)
  if (typeof window !== 'undefined' && CSS.supports('width', '100dvw')) {
    const vw = window.innerWidth;
    const dvw = document.documentElement.clientWidth;
    cachedScrollbarWidth = Math.max(vw - dvw, 12);
    return cachedScrollbarWidth;
  }

  // Fallback: batch DOM operations to minimize reflows
  const outer = document.createElement('div');
  const inner = document.createElement('div');
  
  // Set all styles before DOM insertion
  outer.style.cssText = 'visibility:hidden;overflow:scroll;position:absolute;top:-9999px;width:100px;height:100px';
  inner.style.cssText = 'width:100%;height:100%';
  
  // Single DOM insertion
  outer.appendChild(inner);
  document.body.appendChild(outer);
  
  // Single measurement
  cachedScrollbarWidth = Math.max(outer.offsetWidth - inner.offsetWidth, 12);
  
  // Cleanup
  document.body.removeChild(outer);
  
  return cachedScrollbarWidth;
};
