import { RouteFormDefinition } from '@/wayfinder';

export type WebhookFormDataType = {
    webhookName: string;
};

export type WebhookFormTypeProps = {
    mode: 'create' | 'edit';
    action: RouteFormDefinition<'post' | 'put' | 'patch'>;
    initialValue: WebhookFormDataType;
    setValue: (value: WebhookFormDataType) => void;
    onError?: (errors: Record<string, string>) => void;
    onSuccess?: () => void;
};
