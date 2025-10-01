import cn from '@/lib/cn';

const LetterAvatar = ({ name }: { name: string }) => {
  const initials = name?.trim()?.charAt(0).toUpperCase() || 'U';

  return (
    <div
      className={cn(
        'flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-brand shadow-glow ring-1 ring-brand/30 dark:bg-brand/20 dark:text-brand-foreground'
      )}
    >
      <span className="text-sm font-semibold">{initials}</span>
    </div>
  );
};

export default LetterAvatar;
