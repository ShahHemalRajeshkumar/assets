// Performance optimization utilities for third-party scripts and widgets
export const lazyLoadWidget = (selector, scriptSrc, callback) => {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadScript(scriptSrc, callback);
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '50px' }
  );

  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => observer.observe(el));
};

export const loadScript = (src, callback) => {
  if (document.querySelector(`script[src="${src}"]`)) {
    if (callback) callback();
    return;
  }

  const script = document.createElement('script');
  script.src = src;
  script.async = true;
  script.defer = true;

  script.onload = () => {
    if (callback) callback();
  };

  script.onerror = () => {
    console.warn(`Failed to load script: ${src}`);
  };

  document.head.appendChild(script);
};

export const optimizeElfsightWidget = () => {
  const widgets = document.querySelectorAll('.elfsight-app');
  widgets.forEach((widget) => {
    widget.style.minHeight = '200px';
    widget.style.backgroundColor = '#f5f5f5';
    widget.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:200px;color:#666;">Loading...</div>';

    const observer = new MutationObserver(() => {
      if (widget.children.length > 1) {
        widget.classList.add('loaded');
        widget.style.backgroundColor = '';
        observer.disconnect();
      }
    });

    observer.observe(widget, { childList: true, subtree: true });
  });
};

export const deferNonCriticalCSS = (href) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.onload = function () {
    this.onload = null;
    this.rel = 'stylesheet';
  };
  document.head.appendChild(link);
};

export const preloadCriticalResources = () => {
  const criticalResources = [
    'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
    'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2',
  ];

  criticalResources.forEach((resource) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('.woff2') ? 'font' : 'style';
    if (resource.includes('.woff2')) {
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
    }
    document.head.appendChild(link);
  });
};

export const initPerformanceOptimizations = () => {
  if (typeof window === 'undefined') return;

  
  preloadCriticalResources();

  
  if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[data-src], img:not([loading])');
    images.forEach((img) => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      img.loading = 'lazy';
    });
  }

 
  setTimeout(() => {
    deferNonCriticalCSS('https://justreview.co/widget/justreview.css');
  }, 2000);


  setTimeout(() => {
    optimizeElfsightWidget();
  }, 1000);
};

export const performanceOptimizer = {
  loadScriptOnIdle: (src) => {
    return new Promise((resolve, reject) => {
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(() => {
          loadScript(src, resolve);
        });
      } else {
        setTimeout(() => {
          loadScript(src, resolve);
        }, 0);
      }
    }).catch((error) => {
      console.warn(`Failed to load script: ${src}`, error);
      reject(error);
    });
  },
};