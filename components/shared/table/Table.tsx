import { TableHeader } from './TableHeader';
import { TableBody, TableBodyType } from './TableBody';

const tableWrapperClass =
  'surface-panel relative overflow-x-auto scrollbar border border-border/30 rounded-[var(--radius-lg)]';
const tableClass =
  'w-full text-left text-sm text-muted-foreground [&_thead]:text-xs [&_thead]:uppercase';

export const Table = ({
  cols,
  body,
  noMoreResults,
}: {
  cols: string[];
  body: TableBodyType[];
  noMoreResults?: boolean;
}) => {
  return (
    <div className={tableWrapperClass}>
      <table className={tableClass}>
        <TableHeader cols={cols} />
        <TableBody cols={cols} body={body} noMoreResults={noMoreResults} />
      </table>
    </div>
  );
};
