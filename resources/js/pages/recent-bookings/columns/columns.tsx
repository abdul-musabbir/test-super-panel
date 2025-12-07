import DeleteDialog from '@/components/delete-dialog';
import { RowActions } from '@/components/table/data-table-row-actions';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenuItem,
    DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import recentBooking from '@/routes/recentBooking';
import { Form } from '@inertiajs/react';
import { ColumnDef, FilterFn } from '@tanstack/react-table';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

interface PayloadData {
    [key: string]: string | number | boolean | null;
}

interface WebhookUser {
    id: number;
    name: string;
    email: string;
    avatar: string | null;
}

interface Webhook {
    id: number;
    name: string;
    webhook_url: string;
    user: WebhookUser;
}

type RecentBooking = {
    id: number;
    webhook: Webhook;
    source: string;
    event_type: string;
    payload: PayloadData;
    status: 'Active' | 'Inactive' | 'Pending';
    flag?: string;
};

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<RecentBooking> = (
    row,
    _columnId,
    filterValue,
) => {
    const searchableRowContent =
        `${row.original.webhook.name} ${row.original.webhook.user.name} ${row.original.source}`.toLowerCase();
    const searchTerm = (filterValue ?? '').toLowerCase();
    return searchableRowContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<RecentBooking> = (
    row,
    columnId,
    filterValue: string[],
) => {
    if (!filterValue?.length) return true;
    const status = row.getValue(columnId) as string;
    return filterValue.includes(status);
};

export const columns: ColumnDef<RecentBooking>[] = [
    {
        id: 'select',
        size: 28,
        enableHiding: false,
        enableSorting: false,
        header: ({ table }) => (
            <Checkbox
                aria-label="Select all"
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && 'indeterminate')
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                aria-label="Select row"
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
        ),
    },
    {
        id: 'restaurantInfo',
        accessorKey: 'restaurantInfo',
        header: 'Restaurant Name',
        size: 180,
        enableHiding: false,
        filterFn: multiColumnFilterFn,
        cell: ({ row }) => {
            const restaurantInfo = row.getValue('restaurantInfo') as Webhook;

            return (
                <div className="flex items-center gap-2">
                    {restaurantInfo.avatar && (
                        <img
                            src={restaurantInfo.avatar}
                            alt={restaurantInfo.name}
                            className="h-6 w-6 rounded-full object-cover"
                        />
                    )}
                    <span className="font-medium">{restaurantInfo.name}</span>
                </div>
            );
        },
    },
    {
        accessorKey: 'bookingInfo',
        header: 'Booking Info',
        size: 180,
        enableHiding: false,
        filterFn: multiColumnFilterFn,
        cell: ({ row }) => {
            const bookingInfo = row.getValue('bookingInfo');
            return (
                <div className="font-medium">
                    <div>Date: {bookingInfo.date}</div>
                    <div>Time: {bookingInfo.time}</div>
                    <div>Guest: {bookingInfo.guest}</div>
                    <div>Booking: {bookingInfo.bookingDate}</div>
                </div>
            );
        },
    },
    {
        accessorKey: 'contactInfo',
        header: 'Contact',
        size: 220,
        cell: ({ row }) => {
            const contactInfo = row.getValue('contactInfo');
            return (
                <div>
                    <div>Name: {contactInfo.name}</div>
                    <div>Email: {contactInfo.email}</div>
                    <div>Phone: {contactInfo.phone}</div>
                </div>
            );
        },
    },
    {
        accessorKey: 'message',
        header: 'message',
        size: 200,
    },
    {
        accessorKey: 'status',
        header: 'Status',
        size: 100,
        filterFn: statusFilterFn,
        cell: ({ row }) => {
            const status = row.getValue('status') as string;
            return (
                <Badge
                    variant={
                        status === 'Active'
                            ? 'default'
                            : status === 'Pending'
                              ? 'secondary'
                              : 'destructive'
                    }
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        id: 'actions',
        header: 'Action',
        size: 60,
        enableHiding: false,
        cell: ({ row }) => {
            return (
                <Form {...recentBooking.approved.booking.form(row.original)}>
                    {({ processing }) => (
                        <>
                            <Button
                                type="submit"
                                variant={
                                    row.original.status === 'approved'
                                        ? 'secondary'
                                        : 'default'
                                }
                                disabled={
                                    processing ||
                                    row.original.status === 'approved'
                                }
                            >
                                {processing ? <Spinner /> : <Check />}{' '}
                                {row.original.status === 'approved'
                                    ? 'Unapproved'
                                    : 'Approved'}
                            </Button>
                        </>
                    )}
                </Form>
            );
        },
    },
    {
        id: 'actions',
        size: 60,
        enableHiding: false,
        header: () => <span className="sr-only">Actions</span>,
        cell: ({ row }) => {
            return (
                <RowActions
                    row={row}
                    customButton={() => (
                        <DropdownMenuItem>
                            <span>Approved / Unapproved</span>
                            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    )}
                    render={({ open, setIsOpen }) => (
                        <DeleteDialog
                            open={open}
                            setOpen={setIsOpen}
                            subjectLabel="Recent Booking"
                            confirmText={row.original.name}
                            action={login()}
                            onSuccess={() => {
                                toast.success(
                                    'Recent Booking deleted successfully',
                                );
                                setIsOpen(false);
                            }}
                            onError={(error) => {
                                console.error('Delete error:', error);
                                toast.error('Failed to delete booking');
                            }}
                        />
                    )}
                />
            );
        },
    },
];
