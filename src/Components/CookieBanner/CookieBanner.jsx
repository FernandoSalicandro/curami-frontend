import { useEffect, useState } from 'react';
import './CookieBanner.css';

const COOKIE_KEY = 'cookieConsentGiven';

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
  };

  const rejectCookies = () => {
    localStorage.setItem(COOKIE_KEY, 'false');
    setVisible(false);
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

    fbq('init', 'YOUR_PIXEL_ID'); // ⬅️ Sostituisci con il tuo ID Pixel
    fbq('track', 'PageView');
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Utilizziamo cookie tecnici e di terze parti (Pixel Meta) per offrirti una migliore esperienza. Cliccando “Accetta” ci autorizzi al loro utilizzo. <br />
        <a href="/privacypolicy">Privacy Policy </a>
      </p>
      <div className="cookie-actions">
        <button className="btn accept" onClick={acceptCookies}>Accetta</button>
        <button className="btn reject" onClick={rejectCookies}>Rifiuta</button>
      </div>
    </div>
  );
}
