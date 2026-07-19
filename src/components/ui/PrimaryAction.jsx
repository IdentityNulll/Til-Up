import { useEffect, useRef } from 'react';
import { isInsideTelegram, mainButton, haptic } from '../../lib/telegram.js';

/**
 * Primary call-to-action. Inside Telegram it drives the native MainButton
 * (docked, safe-area aware). Outside Telegram (browser dev / Netlify direct)
 * it renders an equivalent docked in-app button so the flow still works.
 */
const PrimaryAction = ({ label, onClick, disabled = false, loading = false, visible = true }) => {
  // Keep the latest onClick without re-subscribing the native handler each render.
  const onClickRef = useRef(onClick);
  onClickRef.current = onClick;

  useEffect(() => {
    if (!isInsideTelegram || !visible) return undefined;
    const handler = () => {
      if (disabled || loading) return;
      haptic.impact('medium');
      onClickRef.current?.();
    };
    return mainButton.show({ text: label, onClick: handler, enabled: !disabled, loading });
  }, [label, disabled, loading, visible]);

  if (isInsideTelegram || !visible) return null;

  return (
    <>
      {/* spacer so page content isn't hidden behind the docked button */}
      <div className="h-20" aria-hidden />
      <div className="safe-bottom fixed inset-x-0 bottom-0 z-30 px-4 pb-3 pt-2">
        <div className="mx-auto max-w-md">
          <button
            type="button"
            disabled={disabled || loading}
            onClick={() => {
              haptic.impact('medium');
              onClick?.();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl2 bg-accent-grad px-6 py-3.5 text-base font-bold text-ink-base shadow-glow-sm transition-all duration-200 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-ink-base/40 border-t-ink-base" />
            )}
            {label}
          </button>
        </div>
      </div>
    </>
  );
};

export default PrimaryAction;
