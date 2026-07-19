// Thin wrapper around the Telegram WebApp SDK so the rest of the app never
// touches window.Telegram directly and stays safe when running outside Telegram
// (local browser dev, or the Netlify site opened in a normal browser).

const ACCENT = '#2e8fff';
const ACCENT_TEXT = '#04080f';

export const tg = typeof window !== 'undefined' ? window.Telegram?.WebApp : undefined;

export const isInsideTelegram = Boolean(tg?.initData);

const MOCK_TELEGRAM_USER = {
  id: 1000000001,
  first_name: 'Dev',
  last_name: 'Foydalanuvchi',
  username: 'dev_user',
  language_code: 'uz',
};

export const getInitData = () => (isInsideTelegram ? tg.initData : null);
export const getMockUser = () => (isInsideTelegram ? null : MOCK_TELEGRAM_USER);

// Prepare the viewport once at startup.
export const initTelegram = () => {
  if (!tg) return;
  tg.ready();
  tg.expand();
  tg.setHeaderColor?.('#0b0f14');
  tg.setBackgroundColor?.('#0b0f14');
};

// --- Haptics -------------------------------------------------------------
export const haptic = {
  impact(style = 'light') {
    tg?.HapticFeedback?.impactOccurred?.(style); // light | medium | heavy | rigid | soft
  },
  notify(type = 'success') {
    tg?.HapticFeedback?.notificationOccurred?.(type); // success | error | warning
  },
  select() {
    tg?.HapticFeedback?.selectionChanged?.();
  },
};

// --- MainButton ----------------------------------------------------------
export const mainButton = {
  show({ text, onClick, enabled = true, loading = false }) {
    const mb = tg?.MainButton;
    if (!mb) return () => {};
    mb.setParams({ text, color: ACCENT, text_color: ACCENT_TEXT, is_active: enabled, is_visible: true });
    if (loading) mb.showProgress?.();
    else mb.hideProgress?.();
    mb.onClick(onClick);
    mb.show();
    // Return a cleanup that detaches this handler and hides the button.
    return () => {
      mb.offClick(onClick);
      mb.hideProgress?.();
      mb.hide();
    };
  },
};

// --- BackButton ----------------------------------------------------------
export const backButton = {
  show(onClick) {
    const bb = tg?.BackButton;
    if (!bb) return () => {};
    bb.onClick(onClick);
    bb.show();
    return () => {
      bb.offClick(onClick);
      bb.hide();
    };
  },
};
