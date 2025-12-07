import { RouteFormDefinition } from '@/wayfinder';

export type ClientFormDataType = {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    password: string;
    password_confirmation: string;
    streetAddress: string;
    city: string;
    zipCode: string;
    country: string;
};

export type ClientFormTypeProps = {
    mode: 'create' | 'edit';
    action: RouteFormDefinition<'post' | 'put' | 'patch'>;
    initialValue: ClientFormDataType;
    setValue: (value: ClientFormDataType) => void;
    onError?: (errors: Record<string, string>) => void;
    onSuccess?: () => void;
};
