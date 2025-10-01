import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'next-i18next';

import env from '@/lib/env';
import cn from '@/lib/cn';
import useTheme from 'hooks/useTheme';
import { useCustomSignOut } from 'hooks/useCustomSignout';
import LetterAvatar from '@/components/shared/LetterAvatar';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setSidebarOpen }: HeaderProps) => {
  const { data, status } = useSession();
  const { t } = useTranslation('common');
  const { toggleTheme, selectedTheme, themes, setTheme } = useTheme();
  const signOut = useCustomSignOut();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickAway);
    return () => document.removeEventListener('mousedown', handleClickAway);
  }, []);

  if (status !== 'authenticated' || !data?.user) {
    return null;
  }

  const { user } = data;

  const ThemeIcon = selectedTheme.id === 'dark' ? MoonIcon : SunIcon;
  const themeLabel =
    themes.find((item) => item.id === selectedTheme.id)?.name || 'Tema';

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="glass-panel relative flex min-h-[4.25rem] items-center justify-between rounded-none border-0 border-b border-border/70 px-4 py-3 shadow-none backdrop-blur-md dark:border-white/10 sm:px-6 md:px-8 lg:px-10">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 rounded-full border-transparent text-muted-foreground hover:text-foreground lg:hidden"
            onClick={() => setSidebarOpen(true)}
            icon={<Bars3Icon className="h-6 w-6" />}
            aria-label={t('open-sidebar') ?? 'Abrir menu'}
          >
            {t('menu')}
          </Button>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {env.darkModeEnabled ? (
            <button
              type="button"
              onClick={toggleTheme}
              className="relative flex h-9 w-16 items-center rounded-full border border-border/70 bg-card px-1 text-muted-foreground transition-colors hover:text-foreground"
              aria-label={t('switch-theme') ?? 'Switch theme'}
            >
              <span className="flex h-7 w-7 items-center justify-center">
                <SunIcon className="h-4 w-4" />
              </span>
              <span className="flex h-7 w-7 items-center justify-center">
                <MoonIcon className="h-4 w-4" />
              </span>
              <span
                className={cn(
                  'absolute inset-y-1 flex w-7 items-center justify-center rounded-full bg-brand text-brand-foreground transition-all',
                  selectedTheme.id === 'dark' ? 'left-[calc(50%+0.125rem)]' : 'left-1'
                )}
              >
                <ThemeIcon className="h-4 w-4" />
              </span>
            </button>
          ) : null}

          <div ref={menuRef} className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full border-transparent px-2 text-foreground"
              onClick={() => setMenuOpen((open) => !open)}
              icon={
                <div className="flex items-center gap-2">
                  <LetterAvatar name={user.name || user.email || 'User'} />
                  <div className="hidden flex-col text-left sm:flex">
                    <span className="text-xs uppercase tracking-wide text-muted-foreground">
                      {t('account')}
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {user.name || user.email}
                    </span>
                  </div>
                </div>
              }
              trailingIcon={<ChevronDownIcon className="h-4 w-4 text-muted-foreground" />}
            >
              <span className="sr-only">{t('account')}</span>
            </Button>

            <div
              className={cn(
                'absolute right-0 top-[calc(100%+0.75rem)] w-64 overflow-hidden rounded-[var(--radius-md)] border border-white/30 bg-white/90 p-1 shadow-elevated backdrop-blur-2xl transition-all duration-200 dark:border-white/10 dark:bg-[#121620]/90',
                menuOpen
                  ? 'pointer-events-auto translate-y-0 opacity-100'
                  : 'pointer-events-none -translate-y-2 opacity-0'
              )}
            >
              <div className="px-3 py-3">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
              <div className="h-px bg-border/60" />
              <div className="flex flex-col gap-1 p-2">
                <Link
                  href="/settings/account"
                  className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-muted-foreground hover:bg-brand/10 hover:text-foreground"
                  onClick={() => setMenuOpen(false)}
                >
                  <UserCircleIcon className="h-5 w-5" />
                  {t('account')}
                </Link>

                {env.darkModeEnabled ? (
                  <div className="flex flex-col gap-1">
                    {themes.map((themeOption) => (
                      <button
                        key={themeOption.id}
                        type="button"
                        onClick={() => {
                          setTheme(themeOption.id);
                          setMenuOpen(false);
                        }}
                        className={cn(
                          'flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-brand/10 hover:text-foreground',
                          themeOption.id === selectedTheme.id && 'bg-brand/15 text-foreground'
                        )}
                      >
                        <themeOption.icon className="h-4 w-4" />
                        {themeOption.name}
                      </button>
                    ))}
                  </div>
                ) : null}

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="flex items-center gap-2 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5" />
                  {t('logout')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
