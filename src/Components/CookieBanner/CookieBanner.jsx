import { useEffect, useState } from 'react';
import './CookieBanner.css';

const COOKIE_KEY = 'cookieConsentGiven';
const PIXEL_ID = '746295361557837'; // pixel id di facebook

//funzione di tracking come utility esportabile
export const trackEvent = (eventName, params = {}) => {
  const hasConsented = localStorage.getItem(COOKIE_KEY) === 'true';
  if (hasConsented && window.fbq) {
    console.log('📊 Tracking event:', eventName, params); // per debug
    fbq('track', eventName, params);
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hasConsented = localStorage.getItem(COOKIE_KEY);
    if (!hasConsented) {
      setVisible(true);
    } else if (hasConsented === 'true') {
      loadMetaPixel();
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem(COOKIE_KEY, 'true');
    loadMetaPixel();
    setVisible(false);
    trackEvent('CookieConsent', {
      action : 'accept',
      timestamp : new Date().toISOString()
    });
  };

  const rejectCookies = () => {
    localStorage.setItem(COOKIE_KEY, 'false');
    setVisible(false);
    console.log('🍪 Cookie rejected');
  };

  const loadMetaPixel = () => {
    if (window.fbq) return; // già caricato

    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = 'https://connect.facebook.net/en_US/fbevents.js';
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script');

    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Utilizziamo cookie tecnici e di terze parti (Meta Pixel) per analizzare l'utilizzo del sito e migliorare i nostri servizi. 
        Cliccando "Accetta" ci autorizzi al loro utilizzo. <br />
        <a href="/privacypolicy">Privacy Policy</a>
      </p>
      <div className="cookie-actions">
        <button className="btn accept" onClick={acceptCookies}>Accetta</button>
        <button className="btn reject" onClick={rejectCookies}>Rifiuta</button>
      </div>
    </div>
  );
}