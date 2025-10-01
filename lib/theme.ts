import type React from 'react';

export type Theme = 'system' | 'dark' | 'light';
export type ThemesProps = {
  id: Theme;
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, 'ref'> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
};

const STORAGE_KEY = 'theme';

const setDocumentTheme = (theme: 'dark' | 'light') => {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  root.dataset.theme = theme;
};

const resolveTheme = (theme: Theme | null): 'dark' | 'light' => {
  if (theme === 'dark' || theme === 'light') {
    return theme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

export const applyTheme = (theme: Theme | null) => {
  if (typeof window === 'undefined') {
    return;
  }

  const stored = theme || (localStorage.getItem(STORAGE_KEY) as Theme | null);
  const effectiveTheme = resolveTheme(stored);

  setDocumentTheme(effectiveTheme);

  if (!stored || stored === 'system') {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, stored);
  }
};

export const watchSystemTheme = (callback: (theme: 'dark' | 'light') => void) => {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const handler = (event: MediaQueryListEvent) => {
    callback(event.matches ? 'dark' : 'light');
  };

  media.addEventListener('change', handler);

  return () => media.removeEventListener('change', handler);
};

export const getActiveTheme = (): Theme => {
  if (typeof window === 'undefined') {
    return 'system';
  }

  return (localStorage.getItem(STORAGE_KEY) as Theme | null) || 'system';
};
