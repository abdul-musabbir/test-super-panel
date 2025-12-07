import { RiCalendarLine, RiDeleteBinLine } from '@remixicon/react';
import { format } from 'date-fns';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import bookings from '@/routes/bookings';
import { Form, router } from '@inertiajs/react';
import InputError from './input-error';
import { CalendarEvent, EventColor } from './types';
import { Spinner } from './ui/spinner';

import {
    Calendar as CalendarIcon,
    CheckCircle2,
    Clock,
    Edit2,
    Mail as MailIcon,
    MessageSquare as MessageSquareIcon,
    PartyPopper,
    Phone as PhoneIcon,
    Trash2,
    User as UserIcon,
    Users,
    X,
} from 'lucide-react';

type BookingStatus = 'confirmed' | 'pending' | 'cancel';

interface EventDialogProps {
    event: CalendarEvent | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: CalendarEvent) => void;
    onDelete: (eventId: string) => void;
}

export function EventDialog({
    event,
    isOpen,
    onClose,
    onSave,
    onDelete,
}: EventDialogProps) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [date, setDate] = useState<Date>(new Date());
    const [hour, setHour] = useState('12');
    const [minute, setMinute] = useState('00');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState('1');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<BookingStatus>('pending');
    const [color, setColor] = useState<EventColor>('sky');
    const [error, setError] = useState<string | null>(null);
    const [dateOpen, setDateOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log('EventDialog received event:', event);
    }, [event]);

    const resetForm = useCallback(() => {
        setDate(new Date());
        setHour('12');
        setMinute('00');
        setName('');
        setEmail('');
        setPhone('');
        setNumberOfGuests('1');
        setMessage('');
        setStatus('pending');
        setColor('sky');
        setError(null);
        setIsEditMode(false);
        setLoading(false);
    }, []);

    // Populate form when event changes
    useEffect(() => {
        if (event) {
            const start = new Date(event.start);
            setDate(start);
            setHour(start.getHours().toString().padStart(2, '0'));
            const minutes = start.getMinutes();
            setMinute(minutes.toString().padStart(2, '0'));

            setName(event.title || '');
            setEmail((event as any).email || '');
            setPhone((event as any).phone || '');
            setNumberOfGuests(
                ((event as any).numberOfGuests ?? '1').toString(),
            );
            setMessage(event.description || '');
            setStatus((event as any).status || 'pending');
            setColor((event.color as EventColor) || 'sky');
            setError(null);

            // base mode (but will also be re-applied on open)
            setIsEditMode(!event.id);
        } else {
            resetForm();
            setIsEditMode(true);
        }
    }, [event, resetForm]);

    // 🔧 Fix: reset mode + transient state every time dialog opens/closes
    useEffect(() => {
        if (isOpen) {
            // when opening
            if (event?.id) {
                setIsEditMode(false); // existing booking opens in view mode
            } else {
                setIsEditMode(true); // new booking opens in edit mode
            }
            setError(null);
        } else {
            // when closing
            setDateOpen(false);
            setLoading(false);
            setError(null);
        }
    }, [isOpen, event]);

    const hourOptions = useMemo(() => {
        const options: Array<{ label: string; value: string }> = [];
        for (let h = 0; h < 24; h++) {
            const value = h.toString().padStart(2, '0');
            const label = `${value}:00`;
            options.push({ label, value });
        }
        return options;
    }, []);

    const minuteOptions = [
        { label: '00', value: '00' },
        { label: '15', value: '15' },
        { label: '30', value: '30' },
        { label: '45', value: '45' },
    ];

    const handleSave = () => {
        if (!name.trim()) {
            setError('Nimi on pakollinen');
            return;
        }
        if (!email.trim()) {
            setError('Sähköpostiosoite on pakollinen');
            return;
        }
        if (!phone.trim()) {
            setError('Puhelinnumero on pakollinen');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Anna kelvollinen sähköpostiosoite');
            return;
        }

        const guests = parseInt(numberOfGuests, 10);
        if (isNaN(guests) || guests < 1) {
            setError('Vieraiden määrän on oltava vähintään 1');
            return;
        }

        const start = new Date(date);
        start.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);

        const end = new Date(start);
        end.setHours(start.getHours() + 1);

        onSave({
            id: event?.id || '',
            title: name,
            description: message,
            start,
            end,
            allDay: false,
            color,
            location: '',
            email,
            phone,
            numberOfGuests: guests,
            status,
        } as any);
    };

    const handleDelete = () => {
        if (event?.id) {
            router[bookings.event.destroy({ booking: event.id }).method](
                bookings.event.destroy({ booking: event.id }).url,
                {
                    onSuccess: () => {
                        onDelete(event.id);
                    },
                    onError: (error: any) => {
                        console.log(error);
                    },
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                    onStart: () => setLoading(true),
                    onFinish: () => setLoading(false),
                },
            );
        }
    };

    const statusOptions: Array<{
        value: BookingStatus;
        label: string;
        bgClass: string;
        borderClass: string;
    }> = [
        {
            bgClass: 'bg-emerald-400 data-[state=checked]:bg-emerald-400',
            borderClass:
                'border-emerald-400 data-[state=checked]:border-emerald-400',
            label: 'Vahvistettu',
            value: 'confirmed',
        },
        {
            bgClass: 'bg-amber-400 data-[state=checked]:bg-amber-400',
            borderClass:
                'border-amber-400 data-[state=checked]:border-amber-400',
            label: 'Odottaa',
            value: 'pending',
        },
        {
            bgClass: 'bg-rose-400 data-[state=checked]:bg-rose-400',
            borderClass: 'border-rose-400 data-[state=checked]:border-rose-400',
            label: 'Peruttu',
            value: 'cancel',
        },
    ];

    const colorOptions: Array<{
        value: EventColor;
        label: string;
        bgClass: string;
        borderClass: string;
    }> = [
        {
            bgClass: 'bg-sky-400 data-[state=checked]:bg-sky-400',
            borderClass: 'border-sky-400 data-[state=checked]:border-sky-400',
            label: 'Taivas',
            value: 'sky',
        },
        {
            bgClass: 'bg-amber-400 data-[state=checked]:bg-amber-400',
            borderClass:
                'border-amber-400 data-[state=checked]:border-amber-400',
            label: 'Meripihka',
            value: 'amber',
        },
        {
            bgClass: 'bg-violet-400 data-[state=checked]:bg-violet-400',
            borderClass:
                'border-violet-400 data-[state=checked]:border-violet-400',
            label: 'Violetti',
            value: 'violet',
        },
        {
            bgClass: 'bg-rose-400 data-[state=checked]:bg-rose-400',
            borderClass: 'border-rose-400 data-[state=checked]:border-rose-400',
            label: 'Ruusu',
            value: 'rose',
        },
        {
            bgClass: 'bg-emerald-400 data-[state=checked]:bg-emerald-400',
            borderClass:
                'border-emerald-400 data-[state=checked]:border-emerald-400',
            label: 'Smaragdi',
            value: 'emerald',
        },
        {
            bgClass: 'bg-orange-400 data-[state=checked]:bg-orange-400',
            borderClass:
                'border-orange-400 data-[state=checked]:border-orange-400',
            label: 'Oranssi',
            value: 'orange',
        },
    ];

    const startDateTime = new Date(date);
    startDateTime.setHours(parseInt(hour, 10), parseInt(minute, 10), 0, 0);

    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1);

    const action = event?.id
        ? bookings.event.update.form({ booking: event.id })
        : bookings.event.store.form();

    const getStatusLabel = (statusValue: BookingStatus) => {
        return (
            statusOptions.find((s) => s.value === statusValue)?.label ||
            statusValue
        );
    };

    const getStatusColor = (statusValue: BookingStatus) => {
        if (statusValue === 'confirmed')
            return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
        if (statusValue === 'pending')
            return 'bg-amber-50 text-amber-700 border border-amber-200';
        if (statusValue === 'cancel')
            return 'bg-rose-50 text-rose-700 border border-rose-200';
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    };

    const getColorLabel = (colorValue: EventColor) => {
        return (
            colorOptions.find((c) => c.value === colorValue)?.label ||
            colorValue
        );
    };

    const getColorDotClass = (colorValue: EventColor) => {
        switch (colorValue) {
            case 'sky':
                return 'bg-sky-400';
            case 'amber':
                return 'bg-amber-400';
            case 'violet':
                return 'bg-violet-400';
            case 'rose':
                return 'bg-rose-400';
            case 'emerald':
                return 'bg-emerald-400';
            case 'orange':
                return 'bg-orange-400';
            default:
                return 'bg-slate-300';
        }
    };

    // Format date as d.M.yyyy (e.g., 7.12.2025)
    const formatFinnishDate = (date: Date) => {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    // Safe date validation helper
    const isValidDate = (date: Date) => {
        return date instanceof Date && !isNaN(date.getTime());
    };

    return (
        <Dialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}
        >
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
                {/* VIEW MODE – modern ReservationSummary-style UI */}
                {!isEditMode && event?.id ? (
                    <div className="w-full overflow-hidden">
                        {/* Header */}
                        <div className="border-b border-slate-50 bg-white p-6 pb-4 sm:p-8 sm:pb-6">
                            <div className="mb-6 flex items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
                                        Varauksen yhteenveto
                                    </h2>
                                    <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                                        Yhteenveto varauksen tiedoista
                                    </p>
                                </div>

                                {/* Status badge */}
                                <div
                                    className={cn(
                                        'flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold tracking-wide uppercase sm:text-xs',
                                        getStatusColor(status),
                                    )}
                                >
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    {getStatusLabel(status)}
                                </div>
                            </div>

                            {/* Primary info: date + time */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 sm:h-14 sm:w-14">
                                    <CalendarIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900 sm:text-base">
                                        {isValidDate(date)
                                            ? formatFinnishDate(date)
                                            : '-'}
                                    </div>
                                    <div className="mt-0.5 flex items-center gap-3 text-xs text-slate-500 sm:text-sm">
                                        <span className="flex items-center gap-1.5">
                                            <Clock className="h-3.5 w-3.5" />
                                            {hour}:{minute}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="space-y-6 p-6 pt-5 sm:space-y-7 sm:p-8 sm:pt-6">
                            {/* Key details grid */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Guests */}
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                    <div className="mb-2 flex items-center gap-2 text-slate-400">
                                        <Users className="h-4 w-4" />
                                        <span className="text-[11px] font-bold tracking-wider uppercase">
                                            Vieraiden määrä
                                        </span>
                                    </div>
                                    <div className="text-lg font-semibold text-slate-800 sm:text-xl">
                                        {numberOfGuests}{' '}
                                        {parseInt(numberOfGuests || '0', 10) ===
                                        1
                                            ? 'vieras'
                                            : 'vierasta'}
                                    </div>
                                </div>

                                {/* Color label / type-style card */}
                                <div className="rounded-2xl border border-purple-100 bg-purple-50 p-4">
                                    <div className="mb-2 flex items-center gap-2 text-purple-400">
                                        <PartyPopper className="h-4 w-4" />
                                        <span className="text-[11px] font-bold tracking-wider uppercase">
                                            Värimerkintä
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={cn(
                                                'h-2.5 w-2.5 rounded-full',
                                                getColorDotClass(color),
                                            )}
                                        />
                                        <div className="text-lg font-semibold text-purple-900 sm:text-xl">
                                            {getColorLabel(color)}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Client info */}
                            <div>
                                <h3 className="mb-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                    Asiakkaan tiedot
                                </h3>
                                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                        <UserIcon className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold text-slate-800">
                                            {name || 'Ei nimeä'}
                                        </div>

                                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500 sm:text-[13px]">
                                            <div className="flex items-center gap-1.5">
                                                <MailIcon className="h-3 w-3" />
                                                {email || 'Ei sähköpostia'}
                                            </div>

                                            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block" />

                                            <div className="flex items-center gap-1.5">
                                                <PhoneIcon className="h-3 w-3" />
                                                {phone || 'Ei puhelinnumeroa'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            {message && (
                                <div>
                                    <h3 className="mb-3 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
                                        Viesti
                                    </h3>
                                    <div className="flex gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-amber-900">
                                        <MessageSquareIcon className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                                        <p className="text-sm leading-relaxed sm:text-[15px]">
                                            {message}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer actions */}
                        <div className="flex flex-col gap-3 border-t border-slate-100 bg-slate-50 p-4 sm:flex-row sm:items-center sm:gap-3 sm:p-6">
                            {/* Delete */}
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={loading}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-transparent bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 transition-all hover:border-rose-200 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <Trash2 className="h-4 w-4" />
                                )}
                                Poista
                            </button>

                            {/* Edit */}
                            <button
                                type="button"
                                onClick={() => setIsEditMode(true)}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm transition-all hover:bg-slate-100"
                            >
                                <Edit2 className="h-4 w-4" />
                                Muokkaa
                            </button>

                            {/* Close */}
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800"
                            >
                                <X className="h-4 w-4" />
                                Sulje
                            </button>
                        </div>
                    </div>
                ) : (
                    // EDIT MODE – existing form
                    <Form
                        {...action}
                        resetOnSuccess
                        onSuccess={() => {
                            handleSave();
                            onClose();
                            resetForm();
                        }}
                        onError={(error: any) => {
                            console.log(error);
                        }}
                    >
                        {({ processing, errors }: any) => (
                            <>
                                <DialogHeader className="space-y-2 sm:space-y-3">
                                    <DialogTitle className="text-xl sm:text-2xl">
                                        {event?.id
                                            ? 'Muokkaa varausta'
                                            : 'Luo uusi varaus'}
                                    </DialogTitle>
                                    <DialogDescription className="text-sm sm:text-base">
                                        {event?.id
                                            ? 'Päivitä varauksen tiedot alla olevalla lomakkeella'
                                            : 'Täytä alla olevat tiedot luodaksesi uuden varauksen'}
                                    </DialogDescription>
                                </DialogHeader>

                                {error && (
                                    <div className="rounded-lg border border-destructive/20 bg-destructive/15 px-3 py-2 text-xs text-destructive sm:px-4 sm:py-3 sm:text-sm">
                                        {error}
                                    </div>
                                )}

                                <input
                                    type="hidden"
                                    name="date"
                                    value={
                                        isValidDate(date)
                                            ? format(date, 'yyyy-MM-dd')
                                            : ''
                                    }
                                />
                                <input
                                    type="hidden"
                                    name="start"
                                    value={
                                        isValidDate(startDateTime)
                                            ? startDateTime.toISOString()
                                            : ''
                                    }
                                />
                                <input
                                    type="hidden"
                                    name="end"
                                    value={
                                        isValidDate(endDateTime)
                                            ? endDateTime.toISOString()
                                            : ''
                                    }
                                />
                                <input
                                    type="hidden"
                                    name="status"
                                    value={status}
                                />
                                <input
                                    type="hidden"
                                    name="color"
                                    value={color}
                                />

                                <div className="grid gap-4 py-3 sm:gap-5 sm:py-4">
                                    {/* Date & time */}
                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <div className="flex-1 space-y-2">
                                            <Label
                                                htmlFor="date"
                                                className="text-sm font-medium"
                                            >
                                                Päivämäärä *
                                            </Label>
                                            <Popover
                                                onOpenChange={setDateOpen}
                                                open={dateOpen}
                                            >
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        className={cn(
                                                            'group h-10 w-full justify-between border-input bg-background px-3 text-sm font-normal hover:bg-accent sm:h-11',
                                                            !date &&
                                                                'text-muted-foreground',
                                                        )}
                                                        id="date"
                                                        variant={'outline'}
                                                        type="button"
                                                    >
                                                        <span
                                                            className={cn(
                                                                'truncate',
                                                                !date &&
                                                                    'text-muted-foreground',
                                                            )}
                                                        >
                                                            {date &&
                                                            isValidDate(date)
                                                                ? formatFinnishDate(
                                                                      date,
                                                                  )
                                                                : 'Valitse päivämäärä'}
                                                        </span>
                                                        <RiCalendarLine
                                                            aria-hidden="true"
                                                            className="h-4 w-4 shrink-0 text-muted-foreground/80"
                                                        />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent
                                                    align="start"
                                                    className="w-auto p-0"
                                                >
                                                    <Calendar
                                                        defaultMonth={date}
                                                        mode="single"
                                                        onSelect={(
                                                            selectedDate,
                                                        ) => {
                                                            if (selectedDate) {
                                                                setDate(
                                                                    selectedDate,
                                                                );
                                                                setError(null);
                                                                setDateOpen(
                                                                    false,
                                                                );
                                                            }
                                                        }}
                                                        selected={date}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <InputError message={errors.date} />
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="min-w-[100px] flex-1 space-y-2 sm:min-w-24">
                                                <Label
                                                    htmlFor="hour"
                                                    className="text-sm font-medium"
                                                >
                                                    Tunti *
                                                </Label>
                                                <Select
                                                    value={hour}
                                                    onValueChange={(value) => {
                                                        setHour(value);
                                                        setError(null);
                                                    }}
                                                >
                                                    <SelectTrigger
                                                        id="hour"
                                                        className="h-10 sm:h-11"
                                                    >
                                                        <SelectValue placeholder="Tunti" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {hourOptions.map(
                                                            (option) => (
                                                                <SelectItem
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <InputError
                                                    message={errors.hour}
                                                />
                                            </div>

                                            <div className="min-w-[80px] flex-1 space-y-2 sm:min-w-20">
                                                <Label
                                                    htmlFor="minute"
                                                    className="text-sm font-medium"
                                                >
                                                    Min *
                                                </Label>
                                                <Select
                                                    value={minute}
                                                    onValueChange={(value) => {
                                                        setMinute(value);
                                                        setError(null);
                                                    }}
                                                >
                                                    <SelectTrigger
                                                        id="minute"
                                                        className="h-10 sm:h-11"
                                                    >
                                                        <SelectValue placeholder="Min" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {minuteOptions.map(
                                                            (option) => (
                                                                <SelectItem
                                                                    key={
                                                                        option.value
                                                                    }
                                                                    value={
                                                                        option.value
                                                                    }
                                                                >
                                                                    {
                                                                        option.label
                                                                    }
                                                                </SelectItem>
                                                            ),
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                                <InputError
                                                    message={errors.minute}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="name"
                                            className="text-sm font-medium"
                                        >
                                            Nimi *
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={name}
                                            onChange={(e) => {
                                                setName(e.target.value);
                                                setError(null);
                                            }}
                                            placeholder="Esim. Matti Meikäläinen"
                                            className="h-10 sm:h-11"
                                        />
                                        <InputError message={errors.name} />
                                    </div>

                                    {/* Email */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-sm font-medium"
                                        >
                                            Sähköposti *
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                setError(null);
                                            }}
                                            placeholder="esimerkki@email.com"
                                            className="h-10 sm:h-11"
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="phone"
                                            className="text-sm font-medium"
                                        >
                                            Puhelin *
                                        </Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => {
                                                setPhone(e.target.value);
                                                setError(null);
                                            }}
                                            placeholder="+358 40 123 4567"
                                            className="h-10 sm:h-11"
                                        />
                                        <InputError message={errors.phone} />
                                    </div>

                                    {/* Guests */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="numberOfGuests"
                                            className="text-sm font-medium"
                                        >
                                            Vieraiden määrä *
                                        </Label>
                                        <Input
                                            id="numberOfGuests"
                                            name="numberOfGuests"
                                            type="number"
                                            min="1"
                                            value={numberOfGuests}
                                            onChange={(e) => {
                                                setNumberOfGuests(
                                                    e.target.value,
                                                );
                                                setError(null);
                                            }}
                                            placeholder="1"
                                            className="h-10 sm:h-11"
                                        />
                                        <InputError
                                            message={errors.numberOfGuests}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="message"
                                            className="text-sm font-medium"
                                        >
                                            Viesti
                                        </Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            rows={4}
                                            value={message}
                                            onChange={(e) => {
                                                setMessage(e.target.value);
                                                setError(null);
                                            }}
                                            placeholder="Erityistoiveet tai muistiinpanot..."
                                            className="resize-none text-sm"
                                        />
                                        <InputError message={errors.message} />
                                    </div>

                                    {/* Status */}
                                    <fieldset className="space-y-3">
                                        <legend className="text-sm font-medium">
                                            Tila *
                                        </legend>
                                        <RadioGroup
                                            className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3"
                                            name="status"
                                            value={status}
                                            onValueChange={(value: string) => {
                                                setStatus(
                                                    value as BookingStatus,
                                                );
                                                setError(null);
                                            }}
                                        >
                                            {statusOptions.map(
                                                (statusOption) => (
                                                    <label
                                                        key={statusOption.value}
                                                        className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-lg border-2 px-3 py-2 transition-all hover:bg-accent has-[:checked]:border-current has-[:checked]:bg-accent/50 sm:flex-initial sm:px-4 sm:py-2.5"
                                                    >
                                                        <RadioGroupItem
                                                            className={cn(
                                                                'size-4 border-2 shadow-none sm:size-5',
                                                                statusOption.bgClass,
                                                                statusOption.borderClass,
                                                            )}
                                                            id={`status-${statusOption.value}`}
                                                            value={
                                                                statusOption.value
                                                            }
                                                        />
                                                        <span className="text-sm font-medium">
                                                            {statusOption.label}
                                                        </span>
                                                    </label>
                                                ),
                                            )}
                                        </RadioGroup>
                                        <InputError message={errors.status} />
                                    </fieldset>

                                    {/* Color */}
                                    <fieldset className="space-y-3">
                                        <legend className="text-sm font-medium">
                                            Värimerkintä
                                        </legend>
                                        <RadioGroup
                                            className="flex flex-wrap gap-2"
                                            name="color"
                                            value={color}
                                            onValueChange={(value: string) => {
                                                setColor(value as EventColor);
                                                setError(null);
                                            }}
                                        >
                                            {colorOptions.map((colorOption) => (
                                                <RadioGroupItem
                                                    aria-label={
                                                        colorOption.label
                                                    }
                                                    className={cn(
                                                        'size-9 border-2 shadow-sm transition-all hover:scale-110 data-[state=checked]:ring-2 data-[state=checked]:ring-offset-2 sm:size-10',
                                                        colorOption.bgClass,
                                                        colorOption.borderClass,
                                                    )}
                                                    id={`color-${colorOption.value}`}
                                                    key={colorOption.value}
                                                    value={colorOption.value}
                                                />
                                            ))}
                                        </RadioGroup>
                                        <InputError message={errors.color} />
                                    </fieldset>
                                </div>

                                <DialogFooter className="flex-col gap-3 border-t pt-4 sm:flex-row sm:justify-between sm:pt-6">
                                    {event?.id && (
                                        <Button
                                            aria-label="Poista varaus"
                                            onClick={handleDelete}
                                            size="icon"
                                            variant="outline"
                                            type="button"
                                            className="w-full hover:border-destructive hover:bg-destructive hover:text-destructive-foreground sm:w-auto"
                                        >
                                            {loading ? (
                                                <Spinner />
                                            ) : (
                                                <RiDeleteBinLine
                                                    aria-hidden="true"
                                                    className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
                                                />
                                            )}
                                        </Button>
                                    )}
                                    <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-1 sm:flex-row sm:justify-end sm:gap-3">
                                        <Button
                                            onClick={() => {
                                                if (event?.id) {
                                                    setIsEditMode(false);
                                                } else {
                                                    onClose();
                                                }
                                            }}
                                            variant="outline"
                                            type="button"
                                            size="lg"
                                            className="w-full sm:w-auto"
                                        >
                                            {event?.id ? 'Takaisin' : 'Peruuta'}
                                        </Button>
                                        <Button
                                            disabled={processing}
                                            type="submit"
                                            size="lg"
                                            className="w-full min-w-[120px] gap-2 sm:w-auto"
                                        >
                                            {processing && <Spinner />}
                                            Tallenna
                                        </Button>
                                    </div>
                                </DialogFooter>
                            </>
                        )}
                    </Form>
                )}
            </DialogContent>
        </Dialog>
    );
}
