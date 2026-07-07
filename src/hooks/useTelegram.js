const MOCK_TELEGRAM_USER = {
  id: 1000000001,
  first_name: 'Dev',
  last_name: 'Foydalanuvchi',
  username: 'dev_user',
  language_code: 'uz',
};

export const useTelegram = () => {
  const webApp = window.Telegram?.WebApp;
  const initData = webApp?.initData;

  if (webApp) {
    webApp.ready();
    webApp.expand();
  }

  const isInsideTelegram = Boolean(initData);

  return {
    webApp,
    initData: isInsideTelegram ? initData : null,
    mockUser: isInsideTelegram ? null : MOCK_TELEGRAM_USER,
    isInsideTelegram,
  };
};
