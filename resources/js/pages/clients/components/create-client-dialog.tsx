import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import clients from '@/routes/clients';
import { UserPlusIcon } from 'lucide-react';
import { useState } from 'react';
import { ClientFormDataType } from '../types/types';
import ClientForm from './client-form';

export default function CreateClientDialog() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [initialValue, setInitialValue] = useState<ClientFormDataType>({
        companyName: '',
        contactPerson: '',
        city: '',
        password_confirmation: '',
        country: '',
        email: '',
        password: '',
        phone: '',
        streetAddress: '',
        zipCode: '',
    });

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>
                    <UserPlusIcon />
                    New Client
                </Button>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-2xl [&>button:last-child]:top-3.5">
                <ClientForm
                    mode="create"
                    action={clients.store.form()}
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
