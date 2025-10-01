import {
  ChevronUpDownIcon,
  FolderIcon,
  FolderPlusIcon,
  RectangleStackIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { maxLengthPolicies } from '@/lib/common';
import useTeams from 'hooks/useTeams';
import cn from '@/lib/cn';
import { Button } from '@/components/ui/button';

const TeamDropdown = () => {
  const router = useRouter();
  const { teams } = useTeams();
  const { data } = useSession();
  const { t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const currentTeam = (teams || []).find(
    (team) => team.slug === router.query.slug
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menus = [
    {
      id: 2,
      name: t('teams'),
      items: (teams || []).map((team) => ({
        id: team.id,
        name: team.name,
        href: `/teams/${team.slug}/settings`,
        icon: FolderIcon,
      })),
    },
    {
      id: 1,
      name: t('profile'),
      items: [
        {
          id: data?.user.id,
          name: data?.user?.name,
          href: '/settings/account',
          icon: UserCircleIcon,
        },
      ],
    },
    {
      id: 3,
      name: '',
      items: [
        {
          id: 'all-teams',
          name: t('all-teams'),
          href: '/teams',
          icon: RectangleStackIcon,
        },
        {
          id: 'new-team',
          name: t('new-team'),
          href: '/teams?newTeam=true',
          icon: FolderPlusIcon,
        },
      ],
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="secondary"
        size="md"
        className="w-full justify-between rounded-[var(--radius-md)] px-4"
        onClick={() => setOpen((state) => !state)}
        trailingIcon={<ChevronUpDownIcon className="h-4 w-4 text-muted-foreground" />}
      >
        <span className="truncate text-left text-base font-semibold">
          {currentTeam?.name ||
            data?.user?.name?.substring(
              0,
              maxLengthPolicies.nameShortDisplay
            ) ||
            t('teams')}
        </span>
      </Button>

      <div
        className={cn(
          'absolute left-0 right-0 top-[calc(100%+0.75rem)] z-20 overflow-hidden rounded-[var(--radius-md)] border border-white/40 bg-white/90 shadow-elevated backdrop-blur-2xl transition-all duration-200 dark:border-white/10 dark:bg-[#121620]/90',
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-2 opacity-0'
        )}
      >
        <div className="flex flex-col gap-3 p-3">
          {menus.map(({ id, name, items }) => (
            <div key={id} className="flex flex-col gap-2">
              {name ? (
                <span className="px-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {name}
                </span>
              ) : null}
              <div className="flex flex-col gap-1">
                {items.map((item) => (
                  <Link
                    key={`${id}-${item.id}`}
                    href={item.href}
                    className="flex items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-brand/10 hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="truncate">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamDropdown;
