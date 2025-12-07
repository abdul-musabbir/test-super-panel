import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import clients from '@/routes/clients';
import { EditIcon } from 'lucide-react';
import { useState } from 'react';
import { ClientFormDataType } from '../types/types';
import ClientForm from './client-form';

export default function EditClientDialog({ client }) {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [initialValue, setInitialValue] = useState<ClientFormDataType>({
        companyName: client.companyName,
        contactPerson: client.contactPerson,
        city: client?.city,
        password_confirmation: '',
        country: client?.country,
        email: client.email,
        password: '',
        phone: client?.phone,
        streetAddress: client?.streetAddress,
        zipCode: client?.zipCode,
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size={'icon'}>
                    <EditIcon />
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-2xl [&>button:last-child]:top-3.5">
                <ClientForm
                    mode="edit"
                    action={clients.update.form(client)}
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
