import React, { useState, useEffect } from 'react';
import { updateConsentMode, cleanupThirdPartyCookies } from '../utils/cookie-utils';

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);
      loadScripts(savedPreferences);
    }
  }, []);

  const loadScripts = (prefs) => {
    if (prefs.analytics) {
      // Load Google Analytics
      if (typeof window !== 'undefined' && !window.gtag) {
        const script = document.createElement('script');
        script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`;
        script.async = true;
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', process.env.GOOGLE_ANALYTICS_ID);
      }
    }

    if (prefs.marketing) {
      // Load marketing scripts (Elfsight, Brevo, etc.)
      loadThirdPartyScripts();
    }
  };

  const loadThirdPartyScripts = () => {
    // Elfsight
    if (!document.querySelector('[src*="elfsight"]')) {
      const elfsightScript = document.createElement('script');
      elfsightScript.src = 'https://static.elfsight.com/platform/platform.js';
      elfsightScript.async = true;
      document.head.appendChild(elfsightScript);
    }

    // Brevo conversations
    if (!document.querySelector('[src*="brevo"]')) {
      const brevoScript = document.createElement('script');
      brevoScript.src = 'https://conversations-widget.brevo.com/brevo-conversations.js';
      brevoScript.async = true;
      document.head.appendChild(brevoScript);
    }
  };

  const acceptAll = () => {
    const newPreferences = {
      necessary: true,
      analytics: true,
      marketing: true
    };
    setPreferences(newPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    updateConsentMode(newPreferences);
    loadScripts(newPreferences);
    setShowBanner(false);
  };

  const acceptNecessary = () => {
    const newPreferences = {
      necessary: true,
      analytics: false,
      marketing: false
    };
    setPreferences(newPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(newPreferences));
    updateConsentMode(newPreferences);
    cleanupThirdPartyCookies();
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white border border-gray-200 p-4 shadow-lg z-50 rounded-lg">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Cookie Settings</h3>
          <p className="text-xs text-gray-600">
            We use cookies to enhance your experience.
          </p>
          <div className="flex gap-2">
            <button
              onClick={acceptNecessary}
              className="px-3 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50"
            >
              Essential Only
            </button>
            <button
              onClick={acceptAll}
              className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Accept All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;