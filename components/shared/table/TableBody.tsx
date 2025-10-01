import { useTranslation } from 'next-i18next';

import Badge from '@/components/shared/Badge';
import { Button, buttonClassName } from '@/components/ui/button';

const trClass =
  'border-b border-border/40 bg-card/90 last:border-b-0 transition-colors hover:bg-foreground/5';
const tdClassBase = 'px-6 py-3 text-sm text-muted-foreground';
const tdClass = `whitespace-nowrap ${tdClassBase}`;
const tdClassWrap = `break-all ${tdClassBase}`;

interface TableBodyCell {
  wrap?: boolean;
  text?: string;
  minWidth?: number;
  buttons?: {
    text: string;
    color?: string;
    onClick: () => void;
  }[];
  badge?: {
    text: string;
    color: string;
  };
  element?: React.JSX.Element;
  actions?: {
    text: string;
    icon: React.JSX.Element;
    onClick: () => void;
    destructive?: boolean;
  }[];
}

export interface TableBodyType {
  id: string;
  cells: TableBodyCell[];
}

export const TableBody = ({
  cols,
  body,
  noMoreResults,
}: {
  cols: string[];
  body: TableBodyType[];
  noMoreResults?: boolean;
}) => {
  const { t } = useTranslation('common');

  if (noMoreResults) {
    return (
      <tbody>
        <tr>
          <td
            colSpan={cols.length}
            className="px-6 py-3 text-center text-sm text-gray-500"
          >
            {t('no-more-results')}
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {body.map((row) => {
        return (
          <tr key={row.id} className={trClass}>
            {row.cells?.map((cell: any, index: number) => {
              return (
                <td
                  key={row.id + '-td-' + index}
                  className={`${cell.wrap ? tdClassWrap : tdClass}`}
                  style={
                    cell.minWidth ? { minWidth: `${cell.minWidth}px` } : {}
                  }
                >
                  {!cell.buttons || cell.buttons?.length === 0 ? null : (
                    <div className="flex flex-wrap gap-2">
                      {cell.buttons?.map((button: any, index: number) => (
                        <Button
                          key={row.id + '-button-' + index}
                          size="xs"
                          variant={button.color === 'error' ? 'destructive' : 'secondary'}
                          onClick={button.onClick}
                        >
                          {button.text}
                        </Button>
                      ))}
                    </div>
                  )}
                  {!cell.actions || cell.actions?.length === 0 ? null : (
                    <span className="flex gap-3">
                      {cell.actions?.map((action: any, index: number) => {
                        return (
                          <button
                            key={row.id + '-action-' + index}
                            className={buttonClassName({
                              variant: action.destructive ? 'destructive' : 'ghost',
                              size: 'xs',
                              className: 'h-8 w-8 rounded-full p-0 text-sm',
                            })}
                            onClick={action.onClick}
                            aria-label={action.text}
                          >
                            {action.icon}
                          </button>
                        );
                      })}
                    </span>
                  )}
                  {cell.badge ? (
                    <Badge
                      variant={
                        cell.badge.color === 'success'
                          ? 'success'
                          : cell.badge.color === 'warning'
                          ? 'warning'
                          : cell.badge.color === 'error'
                          ? 'neutral'
                          : 'default'
                      }
                    >
                      {cell.badge.text}
                    </Badge>
                  ) : null}
                  {cell.text ? cell.text : null}
                  {cell.element ? cell.element : null}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};
