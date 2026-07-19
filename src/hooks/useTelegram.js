import { tg, isInsideTelegram, getInitData, getMockUser, haptic } from '../lib/telegram.js';

export const useTelegram = () => ({
  webApp: tg,
  isInsideTelegram,
  initData: getInitData(),
  mockUser: getMockUser(),
  haptic,
});
