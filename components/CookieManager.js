import { useEffect, useState } from 'react';

const CookieManager = () => {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie-consent');
    if (savedConsent) {
      const parsed = JSON.parse(savedConsent);
      setConsent(parsed);
      applyConsent(parsed);
    }
  }, []);

  const applyConsent = (consentData) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: consentData.analytics ? 'granted' : 'denied',
        ad_storage: 'denied',
        functionality_storage: consentData.functional ? 'granted' : 'denied',
        personalization_storage: 'denied',
      });
    }

    if (!consentData.functional && typeof document !== 'undefined') {
      document.querySelectorAll('.elfsight-app, iframe[src*="youtube"]').forEach(el => {
        el.style.display = "none";
      });
      document.querySelectorAll('script[src*="brevo"], script[src*="sendinblue"]').forEach(script => script.remove());
    }

    if (typeof document !== 'undefined') {
      const thirdPartyCookies = [
        'LOGIN_INFO', 'VISITOR_INFO1_LIVE', 'VISITOR_PRIVACY_METADATA',
        '__Secure-3PAPISID', '__Secure-3PSID', '__Secure-3PSIDTS', '__Secure-3PSIDCC',
        'elfsight_viewed_recently', 'AWSALBCORS'
      ];
      thirdPartyCookies.forEach(cookieName => {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
      });
    }
  };

  const handleConsent = (newConsent) => {
    setConsent(newConsent);
    localStorage.setItem('cookie-consent', JSON.stringify(newConsent));
    applyConsent(newConsent);
  };
  if (consent !== null) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      maxWidth: '320px',
      background: '#fff',
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 10000,
      border: '1px solid #e5e7eb',
      boxSizing: 'border-box',
      transition: 'opacity 0.3s ease-in-out'
    }}>
      <p style={{
        fontSize: '14px',
        margin: '0 0 12px 0',
        color: '#374151',
        lineHeight: '20px'
      }}>
        We use cookies to improve your experience.
      </p>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => handleConsent({ essential: true, analytics: false, functional: false, marketing: false })}
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            border: '1px solid #d1d5db',
            background: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
            flex: '1'
          }}
        >
          Essential Only
        </button>
        <button
          onClick={() =>
            handleConsent({ essential: true, analytics: true, functional: true, marketing: true })
          }
          style={{
            padding: '6px 12px',
            fontSize: '12px',
            border: 'none',
            background: '#3b82f6',
            color: '#fff',
            borderRadius: '4px',
            cursor: 'pointer',
            flex: '1'
          }}
        >
          Accept All
        </button>
      </div>
    </div>
  );
};

export default CookieManager;
