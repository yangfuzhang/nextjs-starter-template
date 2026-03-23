"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { LoaderCircle, ChevronDown, RefreshCcw } from "lucide-react";
import { useDebounceFn } from "ahooks";
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { isEqual } from "@/lib/utils";
import { useApi } from "@/hooks/use-api";
import { TablePagination } from "@/components/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { columns } from "./columns";

export function UserTable() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const page = pagination.pageIndex + 1;
  const pageSize = pagination.pageSize;

  // 条件过滤
  const [filters, setFilters] = useState<Record<string, any>>({});
  const { run: handleFiltersChange } = useDebounceFn(
    (columnFilters: ColumnFiltersState) => {
      const newFilters = columnFilters
        .map(({ id, value }) => ({ [id]: value }))
        .reduce((acc, cur) => ({ ...acc, ...cur }), {});

      if (!isEqual(newFilters, filters)) {
        setPagination((prev) => ({ ...prev, pageIndex: 0 }));
        setFilters(newFilters);
      }
    },
    { wait: 600 },
  );
  useEffect(() => {
    handleFiltersChange(columnFilters);
  }, [columnFilters, handleFiltersChange]);

  const params = { page, pageSize, filters: { ...filters } };
  const { get, useQuery, useQueryClient } = useApi();
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ["users", params],
    queryFn: async () => {
      return get("users", params);
    },
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["users", params] });
  };

  const table = useReactTable({
    data: data?.items ?? [],
    pageCount: data ? Math.ceil(data.total / data.pageSize) : 0,
    columns,
    manualSorting: true,
    manualPagination: true,
    manualFiltering: true,
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    state: {
      pagination,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-medium">用户列表（{data?.total ?? 0}）</h1>
      </div>

      <div className="w-full">
        <div className="w-full flex items-center justify-between py-4 ">
          <Input
            placeholder="搜索用户..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <div className="flex items-center gap-4">
            <RefreshCcw
              size="16"
              className="cursor-pointer hover:text-primary"
              onClick={handleRefresh}
            />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  列设置 <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="relative rounded-md border">
          {isFetching && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LoaderCircle size="16" className="animate-spin" />
            </div>
          )}
          <Table style={{ minWidth: "800px" }}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    {isFetching ? "" : "暂无数据"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <TablePagination table={table} />
          </div>
        </div>
      </div>
    </div>
  );
}
