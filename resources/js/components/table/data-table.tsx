import {
    ColumnDef,
    type ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    type PaginationState,
    type SortingState,
    useReactTable,
    type VisibilityState,
} from '@tanstack/react-table';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import React, { useState } from 'react';

import { SearchParams } from '@/components/types/types';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import useDebouncedSearch from '@/hooks/useDebouncedSearch';
import { cn } from '@/lib/utils';
import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';

interface PaginationMeta {
    current_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface FacetedFilterConfig {
    filterInput?: {
        column: string;
        title: string;
        placeholder: string;
    };
    filter: Array<{
        column: string;
        title: string;
        options: Array<{
            label: string;
            value: string;
            icon?: React.ComponentType<{ className?: string }>;
        }>;
    }>;
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    meta: PaginationMeta;
    facetedFilter: FacetedFilterConfig;
    initialFilters?: SearchParams;
    tableHeaderActionButtons?: React.ReactNode;
}

export default function DataTable<TData, TValue>({
    columns,
    data,
    meta,
    facetedFilter,
    initialFilters = {},
    tableHeaderActionButtons,
}: DataTableProps<TData, TValue>) {
    // Use your existing debounced search hook for URL-based filtering
    const { params, setParams, setTimeDebounce } = useDebouncedSearch(
        window.location.pathname, // or route(route().current())
        initialFilters,
    );

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        columns,
        data,
        initialState: {
            pagination: {
                pageSize: meta.per_page,
            },
        },
        enableSortingRemoval: false,
        getCoreRowModel: getCoreRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        state: {
            columnFilters,
            columnVisibility,
            pagination,
            sorting,
        },
    });

    return (
        <div className="space-y-4">
            {/* Filters */}
            <DataTableToolbar
                table={table}
                facetedFilter={facetedFilter}
                params={params}
                setParams={setParams}
                setTimeDebounce={setTimeDebounce}
                tableHeaderActionButtons={tableHeaderActionButtons}
            />

            {/* Table */}
            <div className="overflow-hidden rounded-md border bg-background">
                <Table className="table-fixed">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                className="hover:bg-transparent"
                                key={headerGroup.id}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className="h-11"
                                            key={header.id}
                                            style={{
                                                width: `${header.getSize()}px`,
                                            }}
                                        >
                                            {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                <div
                                                    className={cn(
                                                        header.column.getCanSort() &&
                                                            'flex h-full cursor-pointer items-center justify-between gap-2 select-none',
                                                    )}
                                                    onClick={header.column.getToggleSortingHandler()}
                                                    onKeyDown={(e) => {
                                                        // Enhanced keyboard handling for sorting
                                                        if (
                                                            header.column.getCanSort() &&
                                                            (e.key ===
                                                                'Enter' ||
                                                                e.key === ' ')
                                                        ) {
                                                            e.preventDefault();
                                                            header.column.getToggleSortingHandler()?.(
                                                                e,
                                                            );
                                                        }
                                                    }}
                                                    tabIndex={
                                                        header.column.getCanSort()
                                                            ? 0
                                                            : undefined
                                                    }
                                                >
                                                    {flexRender(
                                                        header.column.columnDef
                                                            .header,
                                                        header.getContext(),
                                                    )}
                                                    {{
                                                        asc: (
                                                            <ChevronUpIcon
                                                                aria-hidden="true"
                                                                className="shrink-0 opacity-60"
                                                                size={16}
                                                            />
                                                        ),
                                                        desc: (
                                                            <ChevronDownIcon
                                                                aria-hidden="true"
                                                                className="shrink-0 opacity-60"
                                                                size={16}
                                                            />
                                                        ),
                                                    }[
                                                        header.column.getIsSorted() as string
                                                    ] ?? null}
                                                </div>
                                            ) : (
                                                flexRender(
                                                    header.column.columnDef
                                                        .header,
                                                    header.getContext(),
                                                )
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
                                    data-state={
                                        row.getIsSelected() && 'selected'
                                    }
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            className="last:py-0"
                                            key={cell.id}
                                        >
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
                                    className="h-24 text-center"
                                    colSpan={columns.length}
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <DataTablePagination table={table} meta={meta} />
        </div>
    );
}
