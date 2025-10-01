import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import TeamDropdown from '../TeamDropdown';
import Brand from './Brand';
import Navigation from './Navigation';
import cn from '@/lib/cn';
import { Button } from '@/components/ui/button';

interface DrawerProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const Drawer = ({ sidebarOpen, setSidebarOpen }: DrawerProps) => {
  const handleClose = () => setSidebarOpen(false);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          sidebarOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        )}
        aria-hidden="true"
        onClick={handleClose}
      />

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[19rem] max-w-full flex-col gap-8 px-6 py-8 transition-transform duration-500 ease-soft-in-out lg:hidden',
          'glass-panel rounded-none shadow-none border border-border/70 dark:border-white/10',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between">
          <Brand />
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full border-transparent text-muted-foreground hover:text-foreground"
            onClick={handleClose}
            aria-label="Close sidebar"
            icon={<XMarkIcon className="h-5 w-5" />}
          >
            Close
          </Button>
        </div>
        <TeamDropdown />
        <Navigation />
      </aside>

      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-30 lg:flex lg:w-[20rem] xl:w-[22rem]">
        <div className="glass-panel flex h-full w-full flex-col gap-10 overflow-hidden rounded-none border-r border-border/70 p-8 shadow-none backdrop-blur-md dark:border-white/10">
          <Brand />
          <TeamDropdown />
          <Navigation />
          <div className="mt-auto rounded-[var(--radius-lg)] bg-brand/10 px-4 py-5 text-sm text-brand-foreground/80 dark:text-brand-subtle">
            <p className="font-medium">Dica</p>
            <p className="text-muted-foreground mt-1 leading-relaxed">
              Personalize a experiência da sua equipe ajustando as features no menu e explore novos fluxos com o tema claro/escuro.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Drawer;
