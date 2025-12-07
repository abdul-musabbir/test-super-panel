import { Head } from '@inertiajs/react';
import { useState } from 'react';

import AppLayout from '@/layouts/app-layout';
import { GenerateWebhookDialog } from './components/generate-webhook-dialog';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from '@/components/ui/empty';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { receive } from '@/routes/webhook';
import { IconFolderCode } from '@tabler/icons-react';
import { CheckIcon, CopyIcon } from 'lucide-react';

export default function ManageWebhookPage({ webhooks }) {
    const [copiedId, setCopiedId] = useState(null);

    const copyToClipboard = async (text: string, id: any) => {
        await navigator.clipboard.writeText(text);
        setCopiedId(id);

        setTimeout(() => setCopiedId(null), 1500);
    };

    return (
        <AppLayout>
            <Head title="Webhookit" />

            <div className="flex flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <div className="flex w-full items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Webhook-päätepisteet
                        </h2>
                        <p className="text-muted-foreground">
                            Hallitse webhook-osoitteita ja tarkastele
                            lokitietoja.
                        </p>
                    </div>

                    <GenerateWebhookDialog />
                </div>

                {/* Cards */}
                <div className="relative min-h-[80vh] flex-1">
                    {webhooks.length === 0 ? (
                        <Empty>
                            <EmptyHeader>
                                <EmptyMedia variant="icon">
                                    <IconFolderCode />
                                </EmptyMedia>
                                <EmptyTitle>Ei webhookeja vielä</EmptyTitle>
                                <EmptyDescription>
                                    Et ole vielä luonut yhtään
                                    webhook-päätepistettä. Luo uusi webhook
                                    vastaanottaaksesi tapahtumia reaaliajassa.
                                </EmptyDescription>
                            </EmptyHeader>
                            <EmptyContent>
                                <div className="flex gap-2">
                                    <GenerateWebhookDialog />
                                </div>
                            </EmptyContent>
                        </Empty>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {webhooks.map((webhook) => {
                                const fullUrl =
                                    location.origin + receive.url({ webhook });

                                return (
                                    <Card
                                        key={webhook.id}
                                        className="w-full shadow-sm"
                                    >
                                        <CardHeader>
                                            <CardTitle className="flex items-center justify-between">
                                                {webhook.name ||
                                                    `Webhook #${webhook.id}`}
                                            </CardTitle>

                                            <CardDescription>
                                                Tämä URL vastaanottaa
                                                webhook-tapahtumat.
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent>
                                            <div className="grid gap-2">
                                                <Label>Webhook-osoite</Label>
                                                <Input
                                                    value={fullUrl}
                                                    readOnly
                                                    className="cursor-pointer"
                                                />
                                            </div>
                                        </CardContent>

                                        <CardFooter className="flex items-center justify-between">
                                            <Button
                                                variant="secondary"
                                                className="flex w-full items-center gap-2"
                                                onClick={() =>
                                                    copyToClipboard(
                                                        fullUrl,
                                                        webhook.id,
                                                    )
                                                }
                                            >
                                                {copiedId === webhook.id ? (
                                                    <>
                                                        <CheckIcon size={16} />{' '}
                                                        Kopioitu!
                                                    </>
                                                ) : (
                                                    <>
                                                        <CopyIcon size={16} />{' '}
                                                        Kopioi URL
                                                    </>
                                                )}
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
