import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { IconFolderCode } from '@tabler/icons-react';

import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { manage } from '@/routes/clients';
import { Head, router } from '@inertiajs/react';
import { LoaderCircleIcon, MicIcon, SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ClientCard } from './components/client-card';
import CreateClientDialog from './components/create-client-dialog';

export default function ManageClientPage({ clients, filters }) {
    const [inputValue, setInputValue] = useState(filters?.search || '');
    const [isLoading, setIsLoading] = useState(false);

    // Debounce search
    useEffect(() => {
        const delay = setTimeout(() => {
            router.get(
                manage(),
                { search: inputValue },
                {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    onStart: () => setIsLoading(true),
                    onFinish: () => setIsLoading(false),
                },
            );
        }, 400);

        return () => clearTimeout(delay);
    }, [inputValue]);

    return (
        <AppLayout>
            <Head title="Clients" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex w-full items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">Client Directory</h2>
                        <p>Manage client accounts and access.</p>
                    </div>

                    <div className="flex items-center gap-2">
                        <div className="*:not-first:mt-2">
                            <div className="relative">
                                <Input
                                    className="peer ps-9 pe-9"
                                    placeholder="Search..."
                                    type="search"
                                    value={inputValue}
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
                                />

                                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80">
                                    {isLoading ? (
                                        <LoaderCircleIcon
                                            className="animate-spin"
                                            size={16}
                                        />
                                    ) : (
                                        <SearchIcon size={16} />
                                    )}
                                </div>

                                <button
                                    aria-label="Press to speak"
                                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80"
                                >
                                    <MicIcon size={16} />
                                </button>
                            </div>
                        </div>

                        <CreateClientDialog />
                    </div>
                </div>

                <div className="relative min-h-[100vh] flex-1">
                    {clients.length === 0 ? (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <IconFolderCode />
                                </EmptyMedia>
                                <EmptyTitle>No Clients Yet</EmptyTitle>
                                <EmptyDescription>
                                    You haven&apos;t added any clients yet. Get
                                    started by creating your first client
                                    account.
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <div className="flex gap-2">
                                    <CreateClientDialog />
                                </div>
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <div className="grid w-full grid-cols-3 gap-4">
                            {clients.map((client) => (
                                <ClientCard key={client.id} client={client} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
