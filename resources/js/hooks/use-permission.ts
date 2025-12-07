import { usePage } from '@inertiajs/react';

export const usePermission = () => {
    const { role } = usePage().props;
    const isSuperadmin = role === 'superadmin';
    const isAdmin = role === 'admin';
    const isManager = role === 'manager';
    const isCustomer = role === 'customer';
    return {
        isSuperadmin,
        isAdmin,
        isManager,
        isCustomer,
    };
};
