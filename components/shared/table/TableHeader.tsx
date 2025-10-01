const theadClass = 'bg-card/60 text-foreground';
const trHeadClass = '';
const thClass = 'px-6 py-3 font-semibold text-xs tracking-wide text-muted-foreground';

export const TableHeader = ({ cols }: { cols: string[] }) => {
  return (
    <thead className={theadClass}>
      <tr className={trHeadClass}>
        {cols.map((col, index) => (
          <th key={index} scope="col" className={thClass}>
            {col}
          </th>
        ))}
      </tr>
    </thead>
  );
};
