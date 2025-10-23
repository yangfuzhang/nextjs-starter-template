"use client";
import React, { useState, useEffect } from "react";
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

export function PostTable() {
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
  const searchParams = useSearchParams();
  const locale = searchParams.get("locale") ?? "en";
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
    { wait: 600 }
  );
  useEffect(() => {
    handleFiltersChange(columnFilters);
  }, [columnFilters, handleFiltersChange]);

  const params = { page, pageSize, filters: { ...filters, locale } };
  const { get, useQuery, useQueryClient } = useApi();
  const queryClient = useQueryClient();
  const { data, isFetching } = useQuery({
    queryKey: ["posts", params],
    queryFn: async () => {
      return get("posts", params);
    },
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["posts", params] });
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
    <div className="w-full">
      <div className="w-full flex items-center justify-between py-4 ">
        <Input
          placeholder="搜索文章..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex items-center gap-4">
          <RefreshCcw
            size="16"
            className="cursor-pointer hover:text-primary"
            onClick={handleRefresh}
          />
          {locale === "en" ? (
            <Link href={`/admin/posts/create?locale=${locale}`}>
              <Button>新建文章</Button>
            </Link>
          ) : (
            <Button disabled>新建文章</Button>
          )}
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
                            header.getContext()
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
                        cell.getContext()
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
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            上一页
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            下一页
          </Button>
        </div>
      </div>
    </div>
  );
}
