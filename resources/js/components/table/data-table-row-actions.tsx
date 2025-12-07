import { Row } from '@tanstack/react-table';
import { EllipsisIcon } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface RowActionsProps<TData> {
    row: Row<TData>;
    render: (props: {
        row: Row<TData>;
        open: boolean;
        setIsOpen: (value: boolean) => void;
    }) => ReactNode;
}

export function RowActions<TData>({
    row,
    render,
    customButton,
}: RowActionsProps<TData>) {
    const [open, setIsOpen] = useState<boolean>(false);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className="flex justify-end">
                        <Button
                            aria-label="Edit item"
                            className="shadow-none"
                            size="icon"
                            variant="ghost"
                        >
                            <EllipsisIcon aria-hidden="true" size={16} />
                        </Button>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {customButton({ row })}

                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setIsOpen(true)}
                        className="text-destructive focus:text-destructive"
                    >
                        <span>Delete</span>
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {render({ row, open, setIsOpen })}
        </>
    );
}
