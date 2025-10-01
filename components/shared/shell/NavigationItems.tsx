import type React from 'react';
import Link from 'next/link';

import cn from '@/lib/cn';

export interface MenuItem {
  name: string;
  href: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  active?: boolean;
  items?: Omit<MenuItem, 'icon' | 'items'>[];
  className?: string;
}

export interface NavigationProps {
  activePathname: string | null;
}

interface NavigationItemsProps {
  menus: MenuItem[];
}

interface NavigationItemProps {
  menu: MenuItem;
  className?: string;
}

const NavigationItems = ({ menus }: NavigationItemsProps) => {
  return (
    <ul role="list" className="flex flex-1 flex-col gap-1">
      {menus.map((menu) => (
        <li key={menu.name}>
          <NavigationItem menu={menu} />
          {menu.items && menu.items.length > 0 ? (
            <ul className="mt-1 flex flex-col gap-1 pl-5">
              {menu.items.map((subitem) => (
                <li key={subitem.name}>
                  <NavigationItem menu={subitem} className="text-sm" />
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

const NavigationItem = ({ menu, className }: NavigationItemProps) => {
  const Icon = menu.icon;

  return (
    <Link
      href={menu.href}
      className={cn(
        'group flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors duration-200 ease-soft-in-out',
        menu.active
          ? 'bg-brand/15 text-foreground shadow-glow'
          : 'text-muted-foreground hover:bg-foreground/5 hover:text-foreground',
        className
      )}
    >
      {Icon ? (
        <Icon
          className={cn(
            'h-5 w-5 transition-colors',
            menu.active
              ? 'text-brand'
              : 'text-muted-foreground group-hover:text-brand'
          )}
          aria-hidden="true"
        />
      ) : null}
      <span>{menu.name}</span>
    </Link>
  );
};

export default NavigationItems;
