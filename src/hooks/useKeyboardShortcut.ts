import { useEffect, useCallback } from 'react';

type KeyHandler = (event: KeyboardEvent) => void;

interface ShortcutConfig {
  code: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
}

export const useKeyboardShortcut = (
  shortcut: ShortcutConfig | ShortcutConfig[],
  handler: KeyHandler,
  options: { preventDefault?: boolean; stopPropagation?: boolean } = {}
) => {
  const { preventDefault = true, stopPropagation = true } = options;

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      const shortcuts = Array.isArray(shortcut) ? shortcut : [shortcut];

      const matchesShortcut = shortcuts.some(
        (s) =>
          event.code === s.code &&
          !!s.ctrlKey === event.ctrlKey &&
          !!s.altKey === event.altKey &&
          !!s.shiftKey === event.shiftKey &&
          !!s.metaKey === event.metaKey
      );

      if (matchesShortcut) {
        if (preventDefault) {
          event.preventDefault();
        }
        if (stopPropagation) {
          event.stopPropagation();
        }
        handler(event);
      }
    },
    [shortcut, handler, preventDefault, stopPropagation]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
};
