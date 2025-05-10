
import * as React from "react";
import { Check, ChevronDown, ChevronUp, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataTableProps<T> {
  data: T[];
  columns: {
    id: string;
    header: React.ReactNode;
    cell: (item: T) => React.ReactNode;
    sortable?: boolean;
  }[];
  onRowClick?: (item: T) => void;
  selectedItems?: T[];
  onSelectItem?: (item: T) => void;
  showCheckboxes?: boolean;
}

export function DataTable<T extends { id?: string | number }>({
  data,
  columns,
  onRowClick,
  selectedItems = [],
  onSelectItem,
  showCheckboxes = false,
}: DataTableProps<T>) {
  const [sortConfig, setSortConfig] = React.useState<{
    key: string;
    direction: 'asc' | 'desc' | null;
  }>({ key: '', direction: null });

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
  };

  const isSelected = (item: T) => {
    return selectedItems.some(selectedItem => 
      (selectedItem as any).id === (item as any).id
    );
  };

  return (
    <div className="w-full overflow-auto">
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b">
          <tr className="text-left">
            {showCheckboxes && (
              <th className="h-10 px-4 py-3">
                <div className="w-4"></div>
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.id}
                className="h-10 px-4 text-left align-middle font-medium text-muted-foreground"
              >
                {column.sortable ? (
                  <button
                    className="inline-flex items-center gap-1 hover:text-foreground"
                    onClick={() => handleSort(column.id)}
                  >
                    {column.header}
                    <span className="ml-1">
                      {sortConfig.key === column.id && sortConfig.direction === 'asc' && <ChevronUp className="h-4 w-4" />}
                      {sortConfig.key === column.id && sortConfig.direction === 'desc' && <ChevronDown className="h-4 w-4" />}
                      {(sortConfig.key !== column.id || !sortConfig.direction) && <ChevronsUpDown className="h-4 w-4 opacity-50" />}
                    </span>
                  </button>
                ) : (
                  column.header
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                "border-b transition-colors hover:bg-muted/50",
                onRowClick && "cursor-pointer",
                isSelected(item) && "bg-secondary"
              )}
              onClick={() => onRowClick?.(item)}
            >
              {showCheckboxes && (
                <td className="p-4 align-middle">
                  <div className="flex items-center justify-center">
                    <div
                      className={cn(
                        "h-4 w-4 rounded border border-primary flex items-center justify-center",
                        isSelected(item) ? "bg-primary text-primary-foreground" : "bg-background"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem?.(item);
                      }}
                    >
                      {isSelected(item) && <Check className="h-3 w-3" />}
                    </div>
                  </div>
                </td>
              )}
              {columns.map((column) => (
                <td key={column.id} className="px-4 py-3">
                  {column.cell(item)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
