import dynamic from 'next/dynamic';

export const lazyLoad = (importFunc, options = {}) => {
  return dynamic(importFunc, {
    loading: () => <div>Loading...</div>,
    ssr: false,
    ...options,
  });
};

export const preloadComponent = (importFunc) => {
  if (typeof window !== 'undefined') {
    const componentImport = importFunc();
    if (componentImport && typeof componentImport.then === 'function') {
      componentImport.catch(() => {});
    }
  }
};