// Cookie utility functions for managing third-party cookies and consent

export const blockThirdPartyCookies = () => {
  if (typeof window === 'undefined') return;

  // Block third-party cookies by intercepting document.cookie
  const originalCookieDescriptor = Object.getOwnPropertyDescriptor(Document.prototype, 'cookie') || 
                                   Object.getOwnPropertyDescriptor(HTMLDocument.prototype, 'cookie');

  if (originalCookieDescriptor && originalCookieDescriptor.configurable) {
    Object.defineProperty(document, 'cookie', {
      get() {
        return originalCookieDescriptor.get.call(this);
      },
      set(value) {
        // Check if user has given consent
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
          // Block all non-essential cookies
          if (isEssentialCookie(value)) {
            return originalCookieDescriptor.set.call(this, value);
          }
          return;
        }

        const preferences = JSON.parse(consent);
        
        // Allow based on user preferences
        if (isAnalyticsCookie(value) && !preferences.analytics) {
          return;
        }
        if (isMarketingCookie(value) && !preferences.marketing) {
          return;
        }

        return originalCookieDescriptor.set.call(this, value);
      },
      configurable: true
    });
  }
};

const isEssentialCookie = (cookieString) => {
  const essentialCookies = [
    'JSESSIONID',
    'PHPSESSID',
    'ASP.NET_SessionId',
    'cookieConsent',
    'ms_user_id',
    '_csrf'
  ];
  
  return essentialCookies.some(name => cookieString.includes(name));
};

const isAnalyticsCookie = (cookieString) => {
  const analyticsCookies = [
    '_ga',
    '_gid',
    '_gat',
    '_gtag',
    '__utma',
    '__utmb',
    '__utmc',
    '__utmz'
  ];
  
  return analyticsCookies.some(name => cookieString.includes(name));
};

const isMarketingCookie = (cookieString) => {
  const marketingCookies = [
    'LOGIN_INFO',
    'VISITOR_INFO1_LIVE',
    'VISITOR_PRIVACY_METADATA',
    '__Secure-3PAPISID',
    '__Secure-3PSID',
    '__Secure-3PSIDTS',
    '__Secure-3PSIDCC',
    'elfsight_viewed_recently',
    'AWSALBCORS'
  ];
  
  return marketingCookies.some(name => cookieString.includes(name));
};

export const updateConsentMode = (preferences) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'update', {
      analytics_storage: preferences.analytics ? 'granted' : 'denied',
      ad_storage: preferences.marketing ? 'granted' : 'denied',
      functionality_storage: preferences.marketing ? 'granted' : 'denied',
      personalization_storage: preferences.marketing ? 'granted' : 'denied'
    });
  }
};

export const cleanupThirdPartyCookies = () => {
  if (typeof document === 'undefined') return;

  const thirdPartyCookies = [
    'LOGIN_INFO',
    'VISITOR_INFO1_LIVE', 
    'VISITOR_PRIVACY_METADATA',
    '__Secure-3PAPISID',
    '__Secure-3PSID',
    '__Secure-3PSIDTS',
    '__Secure-3PSIDCC',
    'elfsight_viewed_recently',
    'AWSALBCORS'
  ];

  thirdPartyCookies.forEach(cookieName => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.youtube.com;`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.elfsight.com;`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.brevo.com;`;
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  });
};