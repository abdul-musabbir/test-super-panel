import { router } from '@inertiajs/react';
import { Table } from '@tanstack/react-table';
import {
    ChevronFirstIcon,
    ChevronLastIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from 'lucide-react';
import { useId } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import {
    Pagination,
    PaginationContent,
    PaginationItem,
} from '../ui/pagination';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select';

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

interface DataTablePaginationProps<TData> {
    table: Table<TData>;
    meta: PaginationMeta;
    onPageSizeChange?: (pageSize: number) => void;
    preserveState?: boolean;
    preserveScroll?: boolean;
}

export function DataTablePagination<TData>({
    table,
    meta,
    onPageSizeChange,
    preserveState = true,
    preserveScroll = true,
}: DataTablePaginationProps<TData>) {
    const id = useId();

    const totalPages = Math.ceil(meta.total / meta.per_page);
    const currentPage = meta.current_page;

    // Find specific links from the Laravel pagination
    const previousLink = meta.links.find(
        (link) => link.label === '&laquo; Previous',
    );
    const nextLink = meta.links.find((link) => link.label === 'Next &raquo;');

    // Build first and last page URLs based on existing pagination URLs
    const buildPageUrl = (page: number): string | null => {
        // Find any numbered link to use as a template
        const numberedLink = meta.links.find(
            (link) =>
                link.url &&
                link.label !== '&laquo; Previous' &&
                link.label !== 'Next &raquo;',
        );

        if (!numberedLink?.url) return null;

        // Replace the page parameter in the URL
        const url = new URL(numberedLink.url);
        url.searchParams.set('page', page.toString());
        return url.toString();
    };

    const firstPageUrl = currentPage > 1 ? buildPageUrl(1) : null;
    const lastPageUrl =
        currentPage < totalPages ? buildPageUrl(totalPages) : null;

    const handlePageSizeChange = (value: string) => {
        const newPageSize = Number(value);

        if (onPageSizeChange) {
            // Use provided callback
            onPageSizeChange(newPageSize);
        } else {
            // Use Inertia router to handle page size change
            const currentUrl = window.location.href;
            const url = new URL(currentUrl);

            // Update the per_page parameter and reset to page 1
            url.searchParams.set('per_page', newPageSize.toString());
            url.searchParams.set('page', '1');

            // Navigate using Inertia router
            router.get(
                url.pathname + url.search,
                {},
                {
                    preserveState,
                    preserveScroll,
                    replace: true, // Replace current history entry
                },
            );
        }
    };

    return (
        <div className="flex items-center justify-between gap-8">
            {/* Results per page */}
            <div className="flex items-center gap-3">
                <Label className="max-sm:sr-only" htmlFor={id}>
                    Rows per page
                </Label>
                <Select
                    value={`${meta.per_page}`}
                    onValueChange={handlePageSizeChange}
                >
                    <SelectTrigger className="w-fit whitespace-nowrap" id={id}>
                        <SelectValue placeholder={meta.per_page} />
                    </SelectTrigger>
                    <SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:end-2">
                        {[5, 10, 25, 50].map((pageSize) => (
                            <SelectItem key={pageSize} value={`${pageSize}`}>
                                {pageSize}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Page number information */}
            <div className="flex grow justify-end text-sm whitespace-nowrap text-muted-foreground">
                <p
                    aria-live="polite"
                    className="text-sm whitespace-nowrap text-muted-foreground"
                >
                    <span className="text-foreground">
                        {currentPage}-
                        {Math.min(
                            Math.max(
                                table.getState().pagination.pageIndex *
                                    table.getState().pagination.pageSize +
                                    table.getState().pagination.pageSize,
                                0,
                            ),
                            table.getRowCount(),
                        )}
                    </span>{' '}
                    of <span className="text-foreground">{totalPages}</span>
                </p>
            </div>

            {/* Pagination buttons */}
            <div>
                <Pagination>
                    <PaginationContent>
                        {/* First page button */}
                        <PaginationItem>
                            <Button
                                aria-label="Go to first page"
                                className="disabled:pointer-events-none disabled:opacity-50"
                                disabled={!firstPageUrl}
                                size="icon"
                                variant="outline"
                                onClick={() => {
                                    if (!firstPageUrl) return;
                                    router.get(
                                        firstPageUrl,
                                        {},
                                        {
                                            preserveState,
                                            preserveScroll,
                                            replace: true,
                                        },
                                    );
                                }}
                            >
                                <ChevronFirstIcon
                                    aria-hidden="true"
                                    size={16}
                                />
                            </Button>
                        </PaginationItem>

                        {/* Previous page button */}
                        <PaginationItem>
                            <Button
                                aria-label="Go to previous page"
                                className="disabled:pointer-events-none disabled:opacity-50"
                                disabled={!previousLink?.url}
                                size="icon"
                                variant="outline"
                                onClick={() => {
                                    if (!previousLink?.url) return;
                                    router.get(
                                        previousLink.url,
                                        {},
                                        {
                                            preserveState,
                                            preserveScroll,
                                            replace: true,
                                        },
                                    );
                                }}
                            >
                                <ChevronLeftIcon aria-hidden="true" size={16} />
                            </Button>
                        </PaginationItem>

                        {/* Next page button */}
                        <PaginationItem>
                            <Button
                                aria-label="Go to next page"
                                className="disabled:pointer-events-none disabled:opacity-50"
                                disabled={!nextLink?.url}
                                size="icon"
                                variant="outline"
                                onClick={() => {
                                    if (!nextLink?.url) return;
                                    router.get(
                                        nextLink.url,
                                        {},
                                        {
                                            preserveState,
                                            preserveScroll,
                                            replace: true,
                                        },
                                    );
                                }}
                            >
                                <ChevronRightIcon
                                    aria-hidden="true"
                                    size={16}
                                />
                            </Button>
                        </PaginationItem>

                        {/* Last page button */}
                        <PaginationItem>
                            <Button
                                aria-label="Go to last page"
                                className="disabled:pointer-events-none disabled:opacity-50"
                                disabled={!lastPageUrl}
                                size="icon"
                                variant="outline"
                                onClick={() => {
                                    if (!lastPageUrl) return;
                                    router.get(
                                        lastPageUrl,
                                        {},
                                        {
                                            preserveState,
                                            preserveScroll,
                                            replace: true,
                                        },
                                    );
                                }}
                            >
                                <ChevronLastIcon aria-hidden="true" size={16} />
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
