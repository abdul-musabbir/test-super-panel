import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { Form } from '@inertiajs/react';
import { WebhookFormTypeProps } from '../types/types';

export const WebhookForm = ({
    action,
    initialValue,
    mode,
    setValue,
    onError,
    onSuccess,
}: WebhookFormTypeProps) => {
    const handleChange = (e: any) => {
        setValue({ ...initialValue, [e.target.name]: e.target.value });
    };

    return (
        <Form
            {...action}
            onSuccess={onSuccess}
            onError={onError}
            resetOnSuccess
        >
            {({ processing, errors }) => (
                <div className="space-y-4">
                    <DialogHeader>
                        <DialogTitle>
                            {mode === 'create'
                                ? 'Luo webhook'
                                : 'Muokkaa webhookia'}
                        </DialogTitle>
                        <DialogDescription>
                            Täytä webhookin nimi ja tallenna muutokset.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="webhook-name">Webhookin nimi</Label>
                            <Input
                                id="webhook-name"
                                name="webhookName"
                                placeholder="Webhookin nimi"
                                required
                                value={initialValue.webhookName}
                                onChange={handleChange}
                            />
                            <InputError message={errors.webhookName} />
                        </div>
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="reset" variant="outline">
                                Peruuta
                            </Button>
                        </DialogClose>

                        <Button type="submit">
                            {processing && <Spinner />}
                            {mode === 'create' ? 'Tallenna' : 'Päivitä'}
                        </Button>
                    </DialogFooter>
                </div>
            )}
        </Form>
    );
};
