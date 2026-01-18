
import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { TableData, ColumnDefinition } from '../types';

interface DataTableProps {
  data: TableData[];
  columnsDef: ColumnDefinition[];
}

const DataTable: React.FC<DataTableProps> = ({ data, columnsDef }) => {
  const columnHelper = createColumnHelper<TableData>();

  const columns = columnsDef.map(col => 
    columnHelper.accessor(col.id as any, {
      header: col.label,
      cell: info => {
        const val = info.getValue();
        if (typeof val === 'boolean') {
          return (
            <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 ${val ? 'border-transparent bg-emerald-100 text-emerald-800' : 'border-transparent bg-slate-100 text-slate-800'}`}>
              {val ? 'True' : 'False'}
            </div>
          );
        }
        if (col.type === 'number') {
          return <span className="font-mono tabular-nums">{new Intl.NumberFormat('en-US').format(Number(val))}</span>;
        }
        return val;
      },
    })
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full overflow-auto rounded-md border border-slate-200 h-full">
      <table className="w-full caption-bottom text-sm">
        <thead className="[&_tr]:border-b bg-slate-50 sticky top-0">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id} className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100">
              {headerGroup.headers.map(header => (
                <th key={header.id} className="h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          {table.getRowModel().rows.length === 0 && (
            <tr className="h-24 text-center">
              <td colSpan={columns.length} className="p-4 align-middle text-slate-500">
                <div className="flex flex-col items-center justify-center py-10">
                  <p className="text-lg font-semibold text-slate-400">No results found.</p>
                  <p className="text-sm">Try broadening your search criteria.</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
