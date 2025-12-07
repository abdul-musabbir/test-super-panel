import { CircleAlertIcon, TrashIcon } from 'lucide-react';
import { useId, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RouteFormDefinition } from '@/wayfinder';
import { Form } from '@inertiajs/react';
import { Spinner } from './ui/spinner';

type DeleteDialogProps = {
    /**
     * Inertia route + method definition (DELETE)
     */
    action: RouteFormDefinition<'post' | 'delete'>;

    /**
     * Exact text user must type to confirm.
     * Example: section name, classroom name, project key etc.
     */
    confirmText: string;

    /**
     * Human readable subject label.
     * Example: "project", "classroom", "section", "student"
     * Default: "item"
     */
    subjectLabel?: string;

    /**
     * Optional custom title
     */
    title?: string;

    /**
     * Optional custom description override
     */
    description?: string;
    onSuccess?: () => void;
    onError?: (errors: Record<string, string>) => void;
    open: boolean;
    setOpen: (bool: boolean) => void;
};

export default function DeleteDialog({
    action,
    confirmText,
    subjectLabel = 'item',
    title = 'Final confirmation',
    description,
    onSuccess,
    onError,
    open,
    setOpen,
}: DeleteDialogProps) {
    const id = useId();
    const [inputValue, setInputValue] = useState('');

    const handleOpenChange = (value: boolean) => {
        setOpen(value);

        // যখন dialog বন্ধ হবে, input reset করে দিবো
        if (!value) {
            setInputValue('');
        }
    };

    const canDelete = inputValue === confirmText;

    const finalDescription =
        description ??
        `This action cannot be undone. To confirm, please enter the ${subjectLabel} name "${confirmText}".`;

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="w-md">
                <div className="flex flex-col items-center gap-2">
                    <div
                        aria-hidden="true"
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border"
                    >
                        <CircleAlertIcon className="opacity-80" size={16} />
                    </div>
                    <DialogHeader>
                        <DialogTitle className="sm:text-center">
                            {title}
                        </DialogTitle>
                        <DialogDescription className="sm:text-center">
                            {finalDescription}
                        </DialogDescription>
                    </DialogHeader>
                </div>

                <Form
                    className="space-y-5"
                    {...action}
                    onSuccess={onSuccess}
                    onError={onError}
                    resetOnSuccess
                >
                    {({ processing }) => (
                        <>
                            <div className="*:not-first:mt-2">
                                <Label htmlFor={id}>
                                    {subjectLabel.charAt(0).toUpperCase() +
                                        subjectLabel.slice(1)}{' '}
                                    name
                                </Label>

                                <Input
                                    id={id}
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
                                    placeholder={`Type "${confirmText}" to confirm`}
                                    type="text"
                                    value={inputValue}
                                />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="reset" variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>

                                <Button
                                    variant="destructive"
                                    disabled={!canDelete || processing}
                                    type="submit"
                                >
                                    {processing ? (
                                        <Spinner
                                            aria-hidden="true"
                                            className="-ms-1 opacity-60"
                                        />
                                    ) : (
                                        <TrashIcon
                                            aria-hidden="true"
                                            className="-ms-1 opacity-60"
                                            size={16}
                                        />
                                    )}
                                    Delete
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
