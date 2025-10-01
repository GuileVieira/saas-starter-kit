import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';

import { copyToClipboard } from '@/lib/common';
import { Button } from '@/components/ui/button';

interface CopyToClipboardProps {
  value: string;
}

const CopyToClipboardButton = ({ value }: CopyToClipboardProps) => {
  const { t } = useTranslation('common');

  const handleCopy = () => {
    copyToClipboard(value);
    toast.success(t('copied-to-clipboard'));
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="xs"
      className="rounded-full border-transparent text-muted-foreground hover:text-brand"
      onClick={handleCopy}
      icon={<ClipboardDocumentIcon className="h-4 w-4" />}
    >
      <span className="sr-only">{t('copy-to-clipboard')}</span>
    </Button>
  );
};

export default CopyToClipboardButton;
