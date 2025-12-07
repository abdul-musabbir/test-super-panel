import { EyeIcon, EyeOffIcon, ImagePlusIcon } from 'lucide-react';

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
import { useFileUpload } from '@/hooks/use-file-upload';
import { Form } from '@inertiajs/react';
import { useState } from 'react';
import { ClientFormTypeProps } from '../types/types';

// Pretend we have initial image files

const initialAvatarImage = [
    {
        id: 'avatar-123456789',
        name: 'avatar-72-01.jpg',
        size: 1528737,
        type: 'image/jpeg',
        url: '/origin/avatar-72-01.jpg',
    },
];

export default function ClientForm({
    mode = 'create',
    action,
    initialValue,
    setValue,
    onError,
    onSuccess,
}: ClientFormTypeProps) {
    const handleChange = (e: any) => {
        setValue({ ...initialValue, [e.target.name]: e.target.value });
    };

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => setIsVisible((prevState) => !prevState);

    const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);
    const toggleVisibilityConfirm = () =>
        setIsVisibleConfirm((prevState) => !prevState);
    return (
        <Form
            {...action}
            onSuccess={onSuccess}
            onError={onError}
            resetOnSuccess
        >
            {({ processing, errors }) => (
                <>
                    <DialogHeader className="contents space-y-0 text-left">
                        <DialogTitle className="border-b px-6 py-4 text-base">
                            {mode === 'create'
                                ? 'Create Client'
                                : 'Edit Client'}
                        </DialogTitle>
                    </DialogHeader>
                    <DialogDescription className="sr-only">
                        Make changes to your profile here. You can change your
                        photo and set a username.
                    </DialogDescription>
                    <div className="overflow-y-auto">
                        {/* <div className="mb-14"></div> */}
                        {/* <Avatar /> */}
                        <div className="px-6 pt-4 pb-6">
                            <div className="space-y-4">
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor={'companyName'}>
                                            Company Name
                                        </Label>
                                        <Input
                                            id={'companyName'}
                                            name="companyName"
                                            placeholder="Company Name"
                                            type="text"
                                            value={initialValue.companyName}
                                            onChange={handleChange}
                                            required
                                        />
                                        <InputError
                                            message={errors.companyName}
                                        />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor={'contactPerson'}>
                                            Contact Person
                                        </Label>
                                        <Input
                                            id={'contactPerson'}
                                            name="contactPerson"
                                            placeholder="Contact Person"
                                            type="text"
                                            value={initialValue.contactPerson}
                                            onChange={handleChange}
                                        />
                                        <InputError
                                            message={errors.contactPerson}
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor={'email'}>Email</Label>
                                    <Input
                                        id={'email'}
                                        name="email"
                                        placeholder="Email"
                                        type="text"
                                        value={initialValue.email}
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.email} />
                                </div>
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor={'phone'}>Phone</Label>
                                    <Input
                                        id={'phone'}
                                        name="phone"
                                        placeholder="Phone"
                                        type="text"
                                        value={initialValue.phone}
                                        onChange={handleChange}
                                    />
                                    <InputError message={errors.phone} />
                                </div>
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor={'password'}>
                                            Password
                                        </Label>

                                        <div className="*:not-first:mt-2">
                                            <div className="relative">
                                                <Input
                                                    className="pe-9"
                                                    id="password"
                                                    name="password"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="Password"
                                                    type={
                                                        isVisible
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    value={
                                                        initialValue.password
                                                    }
                                                    onChange={handleChange}
                                                />
                                                <button
                                                    aria-controls="password"
                                                    aria-label={
                                                        isVisible
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                    aria-pressed={isVisible}
                                                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    onClick={toggleVisibility}
                                                    type="button"
                                                >
                                                    {isVisible ? (
                                                        <EyeOffIcon
                                                            aria-hidden="true"
                                                            size={16}
                                                        />
                                                    ) : (
                                                        <EyeIcon
                                                            aria-hidden="true"
                                                            size={16}
                                                        />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor={'confirmPassword'}>
                                            Confirm Password
                                        </Label>

                                        <div className="*:not-first:mt-2">
                                            <div className="relative">
                                                <Input
                                                    className="pe-9"
                                                    id="confirmPassword"
                                                    name="password_confirmation"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="current-password"
                                                    placeholder="Password"
                                                    type={
                                                        isVisibleConfirm
                                                            ? 'text'
                                                            : 'password'
                                                    }
                                                    value={
                                                        initialValue.password_confirmation
                                                    }
                                                    onChange={handleChange}
                                                />
                                                <button
                                                    aria-controls="password"
                                                    aria-label={
                                                        isVisibleConfirm
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                    aria-pressed={
                                                        isVisibleConfirm
                                                    }
                                                    className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 transition-[color,box-shadow] outline-none hover:text-foreground focus:z-10 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                    onClick={
                                                        toggleVisibilityConfirm
                                                    }
                                                    type="button"
                                                >
                                                    {isVisibleConfirm ? (
                                                        <EyeOffIcon
                                                            aria-hidden="true"
                                                            size={16}
                                                        />
                                                    ) : (
                                                        <EyeIcon
                                                            aria-hidden="true"
                                                            size={16}
                                                        />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-2">
                                    <Label htmlFor={'streetAddress'}>
                                        Street Address
                                    </Label>
                                    <Input
                                        id={'streetAddress'}
                                        name="streetAddress"
                                        placeholder="Street Address"
                                        type="text"
                                        value={initialValue.streetAddress}
                                        onChange={handleChange}
                                    />
                                    <InputError
                                        message={errors.streetAddress}
                                    />
                                </div>
                                <div className="flex flex-col gap-4 sm:flex-row">
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor={'zipCode'}>
                                            Zip Code
                                        </Label>
                                        <Input
                                            id={'zipCode'}
                                            name="zipCode"
                                            placeholder="Zip Code"
                                            type="text"
                                            value={initialValue.zipCode}
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.zipCode} />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor={'city'}>City</Label>
                                        <Input
                                            id={'city'}
                                            name="city"
                                            placeholder="City"
                                            type="text"
                                            value={initialValue.city}
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.city} />
                                    </div>
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor={`country`}>
                                            Country
                                        </Label>
                                        <Input
                                            id={'country'}
                                            name="country"
                                            placeholder="Country"
                                            type="text"
                                            value={initialValue.country}
                                            onChange={handleChange}
                                        />
                                        <InputError message={errors.country} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="border-t px-6 py-4">
                        <DialogClose asChild>
                            <Button type="reset" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={processing}>
                            {processing && <Spinner />}{' '}
                            {mode === 'create' ? 'Save' : 'Update'}
                        </Button>
                    </DialogFooter>
                </>
            )}
        </Form>
    );
}

function Avatar() {
    const [{ files }, { openFileDialog, getInputProps }] = useFileUpload({
        accept: 'image/*',
        initialFiles: initialAvatarImage,
    });

    const currentImage = files[0]?.preview || null;

    return (
        <div className="-mt-10 px-6">
            <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-xs shadow-black/10">
                {currentImage && (
                    <img
                        alt="Profile"
                        className="size-full object-cover"
                        height={80}
                        src={currentImage}
                        width={80}
                    />
                )}
                <button
                    aria-label="Change profile picture"
                    className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-[color,box-shadow] outline-none hover:bg-black/80 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    onClick={openFileDialog}
                    type="button"
                >
                    <ImagePlusIcon aria-hidden="true" size={16} />
                </button>
                <input
                    {...getInputProps({
                        name: 'avatar',
                    })}
                    aria-label="Upload profile picture"
                    className="sr-only"
                />
            </div>
        </div>
    );
}
