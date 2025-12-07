import DataTable from '@/components/table/data-table';
import { Button } from '@/components/ui/button';
import { usePage } from '@inertiajs/react';
import { PlusIcon } from 'lucide-react';
import { columns } from '../columns/columns';

export default function RecentBookingTable() {
    const {
        recentBookings: {
            paginatedResults: { data, links, total, current_page, per_page },
            filters,
        },
    } = usePage().props;

    return (
        <DataTable
            columns={columns}
            data={data}
            initialFilters={filters}
            meta={{
                links,
                total,
                current_page,
                per_page,
            }}
            facetedFilter={{
                filterInput: {
                    column: 'name',
                    title: 'Search by name',
                    placeholder: 'Search by name...',
                },
                filter: [],
            }}
            tableHeaderActionButtons={
                <div className="flex gap-2">
                    {/* <AddStudentDialog /> */}
                    <Button disabled>
                        <PlusIcon />
                        Add Recent Booking
                    </Button>
                </div>
            }
        />
    );
}
