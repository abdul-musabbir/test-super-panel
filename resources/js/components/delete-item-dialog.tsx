import { CircleAlertIcon, TrashIcon } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { RouteFormDefinition } from '@/wayfinder';
import { Form } from '@inertiajs/react';
import { Spinner } from './ui/spinner';

type DialogProps = {
    button: React.ReactNode;
    onSuccess?: (value: any) => void;
    onError?: (value: any) => void;
    action: RouteFormDefinition<'post' | 'delete'>;
};

export default function DeleteItemDialog({
    button,
    onSuccess,
    onError,
    action,
}: DialogProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>{button}</DialogTrigger>
            <DialogContent>
                <div className="flex flex-col items-center gap-2">
                    <div
                        aria-hidden="true"
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                    >
                        <CircleAlertIcon className="opacity-80" size={16} />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">
                            Final confirmation
                        </DialogTitle>
                        <DialogDescription className="sm:text-center">
                            This action cannot be undone. To confirm, please
                            enter the project name{' '}
                            <span className="text-foreground">coss-ui</span>.
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <Form
                    onSuccess={(resp) => {
                        setIsOpen(false);
                        onSuccess?.(resp);
                    }}
                    onError={onError}
                    {...action}
                    className="space-y-5"
                >
                    {({ processing }) => (
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    className="flex-1"
                                    type="button"
                                    variant="outline"
                                >
                                    Cancel
                                </Button>
                            </DialogClose>
                            <Button
                                className="flex-1"
                                variant={'destructive'}
                                type="submit"
                                disabled={processing}
                            >
                                {processing ? <Spinner /> : <TrashIcon />}{' '}
                                Delete
                            </Button>
                        </DialogFooter>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
