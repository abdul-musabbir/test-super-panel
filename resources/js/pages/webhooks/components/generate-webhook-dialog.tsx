import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import webhooks from '@/routes/webhooks';
import { useState } from 'react';
import { WebhookFormDataType } from '../types/types';
import { WebhookForm } from './webhook-form';

export function GenerateWebhookDialog() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [initialValue, setInitialValue] = useState<WebhookFormDataType>({
        webhookName: '',
    });
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Luo webhook</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <WebhookForm
                    mode="create"
                    action={webhooks.store.form()}
                    initialValue={initialValue}
                    setValue={setInitialValue}
                    onSuccess={() => {
                        setIsOpen(false);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                />
            </DialogContent>
        </Dialog>
    );
}
