import {
  ComputerDesktopIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

import {
  Theme,
  ThemesProps,
  applyTheme,
  getActiveTheme,
  watchSystemTheme,
} from '@/lib/theme';

const useTheme = () => {
  const { t } = useTranslation('common');
  const [theme, setTheme] = useState<Theme>('system');
  const themeRef = useRef<Theme>('system');

  useEffect(() => {
    const stored = getActiveTheme();
    setTheme(stored);
    applyTheme(stored);

    const unsubscribe = watchSystemTheme(() => {
      if (themeRef.current === 'system') {
        applyTheme('system');
      }
    });

    return () => {
      unsubscribe?.();
    };
  }, []);

  useEffect(() => {
    themeRef.current = theme;
    applyTheme(theme);
  }, [theme]);

  const themes: ThemesProps[] = useMemo(
    () => [
      {
        id: 'system',
        name: t('system'),
        icon: ComputerDesktopIcon,
      },
      {
        id: 'light',
        name: t('light'),
        icon: SunIcon,
      },
      {
        id: 'dark',
        name: t('dark'),
        icon: MoonIcon,
      },
    ],
    [t]
  );

  const selectedTheme =
    themes.find((definedTheme) => definedTheme.id === theme) || themes[0];

  const toggleTheme = () => {
    const systemPrefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;

    const resolved = theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme;

    const nextTheme: Theme = resolved === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
  };

  const applyAndSetTheme = (nextTheme: Theme) => {
    themeRef.current = nextTheme;
    setTheme(nextTheme);
  };

  return {
    theme,
    setTheme: applyAndSetTheme,
    selectedTheme,
    toggleTheme,
    themes,
    applyTheme,
  };
};

export default useTheme;
