import { useEffect, useRef } from 'react';
import { backButton, isInsideTelegram } from '../lib/telegram.js';

/**
 * Shows Telegram's native BackButton while the component is mounted and calls
 * `onBack` when tapped. No-op outside Telegram (screens provide their own nav).
 */
export const useBackButton = (onBack, active = true) => {
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    if (!isInsideTelegram || !active) return undefined;
    return backButton.show(() => onBackRef.current?.());
  }, [active]);
};
