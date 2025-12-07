import { SearchParams } from '@/components/types/types';
import { cn } from '@/lib/utils';
import { Table } from '@tanstack/react-table';
import {
    CircleAlertIcon,
    CircleXIcon,
    Columns3Icon,
    FilterIcon,
    ListFilterIcon,
    TrashIcon,
} from 'lucide-react';
import React, { useId, useRef } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

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

interface DataTableToolbarProps<TData> {
    table: Table<TData>;
    facetedFilter: FacetedFilterConfig;
    params: SearchParams;
    setParams: (params: SearchParams) => void;
    setTimeDebounce?: (time: number) => void;
    tableHeaderActionButtons?: React.ReactNode;
}

export function DataTableToolbar<TData>({
    table,
    facetedFilter,
    params,
    setParams,
    tableHeaderActionButtons,
}: DataTableToolbarProps<TData>) {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearchChange = (value: string) => {
        setParams({ ...params, search: value });
    };

    return (
        <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
                {/* Filter by name or email */}
                {facetedFilter.filterInput && (
                    <div className="relative">
                        <Input
                            aria-label="Filter by name"
                            className={cn(
                                'peer min-w-60 ps-9',
                                Boolean(
                                    table
                                        .getColumn(
                                            facetedFilter.filterInput.column,
                                        )
                                        ?.getFilterValue(),
                                ) && 'pe-9',
                            )}
                            id={`${id}-input`}
                            placeholder={facetedFilter.filterInput.placeholder}
                            value={params.search || ''}
                            onChange={(event) =>
                                handleSearchChange(event.target.value)
                            }
                            ref={inputRef}
                            type="text"
                        />
                        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                            <ListFilterIcon aria-hidden="true" size={16} />
                        </div>

                        {Boolean(
                            table
                                .getColumn(facetedFilter.filterInput.column)
                                ?.getFilterValue(),
                        ) && (
                            <button
                                aria-label="Clear filter"
                                className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                onClick={() => {
                                    table
                                        .getColumn(
                                            facetedFilter.filterInput?.column ||
                                                '',
                                        )
                                        ?.setFilterValue('');
                                    if (inputRef.current) {
                                        inputRef.current.focus();
                                    }
                                }}
                                type="button"
                            >
                                <CircleXIcon aria-hidden="true" size={16} />
                            </button>
                        )}
                    </div>
                )}
                {/* Filter by status */}
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline">
                            <FilterIcon
                                aria-hidden="true"
                                className="-ms-1 opacity-60"
                                size={16}
                            />
                            Status
                            {/* {selectedStatuses.length > 0 && (
                                <span className="-me-1 inline-flex h-5 max-h-full items-center rounded border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                                    {selectedStatuses.length}
                                </span>
                            )} */}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent
                        align="start"
                        className="w-auto min-w-36 p-3"
                    >
                        <div className="space-y-3">
                            <div className="text-xs font-medium text-muted-foreground">
                                Filters
                            </div>
                            <div className="space-y-3">
                                {/* {uniqueStatusValues.map((value, i) => (
                                    <div
                                        className="flex items-center gap-2"
                                        key={value}
                                    >
                                        <Checkbox
                                            checked={selectedStatuses.includes(
                                                value,
                                            )}
                                            id={`${id}-${i}`}
                                            onCheckedChange={(
                                                checked: boolean,
                                            ) =>
                                                handleStatusChange(
                                                    checked,
                                                    value,
                                                )
                                            }
                                        />
                                        <Label
                                            className="flex grow justify-between gap-2 font-normal"
                                            htmlFor={`${id}-${i}`}
                                        >
                                            {value}{' '}
                                            <span className="ms-2 text-xs text-muted-foreground">
                                                {statusCounts.get(value)}
                                            </span>
                                        </Label>
                                    </div>
                                ))} */}
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
                {/* Toggle columns visibility */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            <Columns3Icon
                                aria-hidden="true"
                                className="-ms-1 opacity-60"
                                size={16}
                            />
                            View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        checked={column.getIsVisible()}
                                        className="capitalize"
                                        key={column.id}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                        onSelect={(event) =>
                                            event.preventDefault()
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex items-center gap-3">
                {/* Delete button */}
                {table.getSelectedRowModel().rows.length > 0 && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button className="ml-auto" variant="outline">
                                <TrashIcon
                                    aria-hidden="true"
                                    className="-ms-1 opacity-60"
                                    size={16}
                                />
                                Delete
                                <span className="-me-1 inline-flex h-5 max-h-full items-center rounded border bg-background px-1 font-[inherit] text-[0.625rem] font-medium text-muted-foreground/70">
                                    {table.getSelectedRowModel().rows.length}
                                </span>
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                                <div
                                    aria-hidden="true"
                                    className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                                >
                                    <CircleAlertIcon
                                        className="opacity-80"
                                        size={16}
                                    />
                                </div>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete{' '}
                                        {
                                            table.getSelectedRowModel().rows
                                                .length
                                        }{' '}
                                        selected{' '}
                                        {table.getSelectedRowModel().rows
                                            .length === 1
                                            ? 'row'
                                            : 'rows'}
                                        .
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}
                {/* Add user button */}
                {tableHeaderActionButtons && tableHeaderActionButtons}
            </div>
        </div>
    );
}
