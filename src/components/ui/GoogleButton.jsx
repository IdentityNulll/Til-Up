import { useEffect, useRef, useState } from 'react';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

// Initialize Google Identity Services exactly once for the whole app.
let gsiInitialized = false;
const latestCallback = { current: null };

const ensureInitialized = (google) => {
  if (gsiInitialized) return;
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: (resp) => latestCallback.current?.(resp.credential),
    use_fedcm_for_prompt: true,
  });
  gsiInitialized = true;
};

/**
 * Renders the official Google Identity Services sign-in button. On success it
 * calls `onCredential` with the Google ID token, which the backend verifies.
 * Degrades to a disabled note when VITE_GOOGLE_CLIENT_ID isn't configured.
 */
const GoogleButton = ({ onCredential }) => {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  // Keep the newest callback without re-initializing GSI.
  latestCallback.current = onCredential;

  useEffect(() => {
    if (!CLIENT_ID) return undefined;

    let cancelled = false;
    const render = () => {
      if (cancelled) return;
      const google = window.google;
      if (!google?.accounts?.id || !ref.current) {
        setTimeout(render, 200); // GSI script still loading
        return;
      }
      ensureInitialized(google);
      ref.current.innerHTML = '';
      google.accounts.id.renderButton(ref.current, {
        theme: 'outline',
        size: 'large',
        width: 320,
        text: 'continue_with',
        shape: 'pill',
        logo_alignment: 'center',
      });
      setReady(true);
    };
    render();
    return () => {
      cancelled = true;
    };
  }, []);

  if (!CLIENT_ID) {
    return (
      <div className="rounded-xl2 border border-dashed border-ink-700 bg-ink-850 px-4 py-3 text-center text-[13px] text-content-faint">
        Google kirish sozlanmagan (VITE_GOOGLE_CLIENT_ID)
      </div>
    );
  }

  return (
    <div className="flex min-h-[44px] justify-center">
      <div ref={ref} />
      {!ready && <span className="text-[13px] text-content-faint">Google yuklanmoqda…</span>}
    </div>
  );
};

export default GoogleButton;
