import { Main } from '@/components/layout/main';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import RecentBookingTable from './components/recent-booking-table';

export default function ManageRecentBookingPage() {
    // useEchoModel('App', 1, ['.AppCreated']);
    return (
        <AppLayout>
            <Head title="Recent Bookings" />
            <Main className="flex flex-1 flex-col gap-4 sm:gap-6">
                <div className="flex flex-wrap items-end justify-between gap-2">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">
                            Recent Bookings
                        </h2>
                        <p className="text-muted-foreground">
                            Here&apos;s a list of your tasks for this month!
                        </p>
                    </div>

                    {/* <Button>Add Task</Button> */}
                </div>

                {/* <TasksTable data={tasks} /> */}

                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="pending">Pending</TabsTrigger>
                        <TabsTrigger value="approved">Approved</TabsTrigger>
                        <TabsTrigger value="cancel">Cancel</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <RecentBookingTable />
                    </TabsContent>
                    <TabsContent value="pending">
                        Change your password here.
                    </TabsContent>
                    <TabsContent value="approved">
                        Change your password here.
                    </TabsContent>
                    <TabsContent value="cancel">
                        Change your password here.
                    </TabsContent>
                </Tabs>
            </Main>
        </AppLayout>
    );
}
