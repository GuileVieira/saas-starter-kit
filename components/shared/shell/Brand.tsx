import Image from 'next/image';

import app from '@/lib/app';
import useTheme from 'hooks/useTheme';

const Brand = () => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center gap-3 text-lg font-semibold text-foreground">
      <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-3xl bg-white/60 shadow-glow backdrop-blur-xl dark:bg-white/10">
        <Image
          src={theme === 'dark' ? '/logowhite.png' : app.logoUrl}
          alt={app.name}
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-base font-semibold uppercase tracking-[0.2rem] text-muted-foreground">
          crafted experiences
        </span>
        <span className="text-2xl font-bold leading-none text-foreground">
          {app.name}
        </span>
      </div>
    </div>
  );
};

export default Brand;
