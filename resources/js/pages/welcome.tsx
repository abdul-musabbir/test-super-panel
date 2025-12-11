import {
    AlertCircle,
    AlertTriangle,
    ArrowLeft,
    Calendar,
    CheckCircle2,
    Clock,
    Clock3,
    Edit2,
    FileText,
    Mail,
    MessageSquare,
    PartyPopper,
    Phone,
    Save,
    Settings,
    Trash2,
    User,
    Users,
    X,
} from 'lucide-react';
import { useState } from 'react';

const ReservationSummary = () => {
    const [viewMode, setViewMode] = useState('view'); // 'view', 'edit', 'settings'

    // --- CONFIGURATION STATE (Opening Hours) ---
    // 0 = Sunday, 1 = Monday, etc.
    const [openingHours, setOpeningHours] = useState({
        1: { name: 'Monday', open: 10, close: 22, isClosed: false },
        2: { name: 'Tuesday', open: 10, close: 22, isClosed: false },
        3: { name: 'Wednesday', open: 10, close: 22, isClosed: false },
        4: { name: 'Thursday', open: 10, close: 22, isClosed: false },
        5: { name: 'Friday', open: 10, close: 23, isClosed: false },
        6: { name: 'Saturday', open: 11, close: 23, isClosed: false },
        0: { name: 'Sunday', open: 11, close: 22, isClosed: false },
    });

    // --- FORM DATA ---
    const [formData, setFormData] = useState({
        date: '7.12.2025',
        timeHour: '18',
        timeMinute: '30',
        endTimeHour: '22',
        endTimeMinute: '00',
        guests: '3',
        eventType: 'regular',
        status: 'Confirmed',
        clientName: 'John',
        clientEmail: 'john@example.com',
        clientPhone: '+1 (555) 123-4567',
        message:
            'We would love a table near the window if possible. One guest has a nut allergy.',
        notes: '',
    });

    // --- HELPERS FOR DATE CONVERSION ---
    // Converts "7.12.2025" -> "2025-12-07" for the HTML input
    const formatDateForInput = (dateString) => {
        if (!dateString) return '';
        const parts = dateString.split('.');
        if (parts.length !== 3) return '';
        const day = parts[0].padStart(2, '0');
        const month = parts[1].padStart(2, '0');
        const year = parts[2];
        return `${year}-${month}-${day}`;
    };

    // Converts "2025-12-07" -> "7.12.2025" for state storage
    const formatDateFromInput = (dateValue) => {
        if (!dateValue) return '';
        const [year, month, day] = dateValue.split('-');
        return `${parseInt(day, 10)}.${parseInt(month, 10)}.${year}`;
    };

    // --- LOGIC: Parse Date & Get Constraints ---
    const getDateConstraints = (dateString) => {
        try {
            const parts = dateString.split('.');
            if (parts.length !== 3) return null;

            const day = parseInt(parts[0], 10);
            const month = parseInt(parts[1], 10) - 1; // JS months are 0-11
            const year = parseInt(parts[2], 10);

            const dateObj = new Date(year, month, day);
            if (isNaN(dateObj.getTime())) return null;

            const dayOfWeek = dateObj.getDay(); // 0-6
            return openingHours[dayOfWeek];
        } catch (e) {
            return null;
        }
    };

    const currentConstraints = getDateConstraints(formData.date);

    // Helper to format time for display
    const getDisplayTime = () => {
        if (formData.eventType === 'regular') {
            return `${formData.timeHour}:${formData.timeMinute}`;
        }
        return `${formData.timeHour}:${formData.timeMinute} - ${formData.endTimeHour}:${formData.endTimeMinute}`;
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Confirmed':
                return 'bg-emerald-100 text-emerald-700 border-emerald-200';
            case 'Pending':
                return 'bg-amber-100 text-amber-700 border-amber-200';
            case 'Cancel':
                return 'bg-rose-100 text-rose-700 border-rose-200';
            default:
                return 'bg-slate-100 text-slate-700 border-slate-200';
        }
    };

    const getEventTypeDisplay = () => {
        switch (formData.eventType) {
            case 'private':
                return {
                    label: 'Private Event',
                    color: 'text-purple-600 bg-purple-50 border-purple-100',
                    icon: PartyPopper,
                };
            case 'special':
                return {
                    label: 'Special Event',
                    color: 'text-rose-600 bg-rose-50 border-rose-100',
                    icon: AlertCircle,
                };
            default:
                return {
                    label: 'Regular Booking',
                    color: 'text-slate-600 bg-slate-50 border-slate-100',
                    icon: Users,
                };
        }
    };

    const typeDisplay = getEventTypeDisplay();
    const TypeIcon = typeDisplay.icon;

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 p-6 font-sans">
            <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] transition-all duration-300">
                {/* ================= VIEW MODE ================= */}
                {viewMode === 'view' && (
                    <>
                        {/* Header */}
                        <div className="relative border-b border-slate-50 bg-white p-8 pb-6">
                            {/* Settings Button (Top Right) */}
                            <button
                                onClick={() => setViewMode('settings')}
                                className="absolute top-4 right-4 rounded-full p-2 text-slate-300 transition-all hover:bg-indigo-50 hover:text-indigo-600"
                                title="Configure Opening Hours"
                            >
                                <Settings className="h-4 w-4" />
                            </button>

                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-bold text-slate-800">
                                    Reservation Summary
                                </h2>

                                <div
                                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold tracking-wide uppercase ${getStatusColor(formData.status)}`}
                                >
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    {formData.status}
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                                    <Calendar className="h-6 w-6" />
                                </div>
                                <div>
                                    <div className="text-sm font-semibold text-slate-900">
                                        {formData.date}
                                    </div>
                                    <div className="mt-0.5 flex items-center gap-3 text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />{' '}
                                            {getDisplayTime()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="space-y-6 p-8 pt-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
                                    <div className="mb-2 flex items-center gap-2 text-slate-400">
                                        <Users className="h-4 w-4" />
                                        <span className="text-xs font-bold tracking-wider uppercase">
                                            Guests
                                        </span>
                                    </div>
                                    <div className="text-lg font-semibold text-slate-800">
                                        {formData.guests}{' '}
                                        {formData.eventType === 'regular'
                                            ? 'People'
                                            : ''}
                                    </div>
                                </div>

                                <div
                                    className={`rounded-2xl border p-4 ${typeDisplay.color}`}
                                >
                                    <div className="mb-2 flex items-center gap-2 opacity-80">
                                        <TypeIcon className="h-4 w-4" />
                                        <span className="text-xs font-bold tracking-wider uppercase">
                                            Type
                                        </span>
                                    </div>
                                    <div className="text-lg font-semibold">
                                        {typeDisplay.label}
                                    </div>
                                </div>
                            </div>

                            {/* Client Info */}
                            <div>
                                <h3 className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase">
                                    Client Information
                                </h3>
                                <div className="flex items-start gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                                        <User className="h-5 w-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <div className="font-semibold text-slate-800">
                                            {formData.clientName}
                                        </div>
                                        <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500">
                                            <div className="flex items-center gap-2">
                                                <Mail className="h-3 w-3" />{' '}
                                                {formData.clientEmail ||
                                                    'No email'}
                                            </div>
                                            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block"></span>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3" />{' '}
                                                {formData.clientPhone}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Message */}
                            {formData.message && (
                                <div>
                                    <h3 className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase">
                                        Message
                                    </h3>
                                    <div className="flex gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4 text-amber-900">
                                        <MessageSquare className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                                        <p className="text-sm leading-relaxed">
                                            {formData.message}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Notes Display */}
                            {formData.notes && (
                                <div>
                                    <h3 className="mb-3 text-xs font-bold tracking-wider text-slate-400 uppercase">
                                        Internal Notes
                                    </h3>
                                    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-600">
                                        <FileText className="mt-0.5 h-4 w-4 shrink-0 opacity-60" />
                                        <p className="text-sm leading-relaxed">
                                            {formData.notes}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer Actions */}
                        <div className="flex items-center gap-3 border-t border-slate-100 bg-slate-50 p-6">
                            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-transparent bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600 transition-all hover:bg-rose-100">
                                <Trash2 className="h-4 w-4" /> Delete
                            </button>
                            <button
                                onClick={() => setViewMode('edit')}
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 shadow-sm transition-all hover:bg-slate-100"
                            >
                                <Edit2 className="h-4 w-4" /> Edit
                            </button>
                            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-slate-200 transition-all hover:bg-slate-800">
                                <X className="h-4 w-4" /> Close
                            </button>
                        </div>
                    </>
                )}

                {/* ================= EDIT MODE ================= */}
                {viewMode === 'edit' && (
                    <div className="flex h-full flex-col bg-slate-50/50">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white p-6">
                            <button
                                onClick={() => setViewMode('view')}
                                className="-ml-2 rounded-full p-2 text-slate-400 hover:bg-slate-50"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <h2 className="text-lg font-bold text-slate-800">
                                Edit Reservation
                            </h2>
                            <div className="w-9"></div>
                        </div>

                        <div className="max-h-[80vh] space-y-6 overflow-y-auto p-6">
                            {/* Event Type */}
                            <div className="space-y-3">
                                <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                                    Event Type
                                </label>
                                <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                                    <EventTypeOption
                                        active={
                                            formData.eventType === 'regular'
                                        }
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                eventType: 'regular',
                                            })
                                        }
                                        colorClass="peer-checked:bg-emerald-50 peer-checked:border-emerald-500 peer-checked:text-emerald-700"
                                        label="Regular"
                                        dotClass="bg-emerald-500"
                                    />
                                    <EventTypeOption
                                        active={
                                            formData.eventType === 'private'
                                        }
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                eventType: 'private',
                                            })
                                        }
                                        colorClass="peer-checked:bg-purple-50 peer-checked:border-purple-500 peer-checked:text-purple-700"
                                        label="Private"
                                        dotClass="bg-purple-500"
                                    />
                                    <EventTypeOption
                                        active={
                                            formData.eventType === 'special'
                                        }
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                eventType: 'special',
                                            })
                                        }
                                        colorClass="peer-checked:bg-rose-50 peer-checked:border-rose-500 peer-checked:text-rose-700"
                                        label="Special"
                                        dotClass="bg-rose-500"
                                    />
                                </div>
                            </div>

                            {/* Status & Date */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                                        Status
                                    </label>
                                    <div className="relative">
                                        <select
                                            value={formData.status}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    status: e.target.value,
                                                })
                                            }
                                            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                                        >
                                            <option value="Pending">
                                                Pending
                                            </option>
                                            <option value="Confirmed">
                                                Confirmed
                                            </option>
                                            <option value="Cancel">
                                                Cancel
                                            </option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={formatDateForInput(
                                            formData.date,
                                        )}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                date: formatDateFromInput(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                        className={`w-full rounded-xl border bg-white px-3 py-3 text-sm text-slate-700 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none ${currentConstraints?.isClosed ? 'border-rose-300 bg-rose-50 text-rose-700' : 'border-slate-200'}`}
                                    />
                                    {currentConstraints && (
                                        <div className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                                            {currentConstraints.isClosed ? (
                                                <span className="flex items-center gap-1 font-bold text-rose-500">
                                                    <AlertTriangle className="h-3 w-3" />{' '}
                                                    Closed on{' '}
                                                    {currentConstraints.name}s
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1 text-emerald-600">
                                                    <Clock3 className="h-3 w-3" />{' '}
                                                    {currentConstraints.name}:{' '}
                                                    {currentConstraints.open}:00
                                                    - {currentConstraints.close}
                                                    :00
                                                </span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Dynamic Time & Guests */}
                            <div className="space-y-4 rounded-2xl bg-slate-100 p-4 transition-all">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        {formData.eventType === 'regular'
                                            ? 'Number of Guests'
                                            : 'Estimated Guests (Range)'}
                                    </label>
                                    <input
                                        type={
                                            formData.eventType === 'regular'
                                                ? 'number'
                                                : 'text'
                                        }
                                        value={formData.guests}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                guests: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
                                        placeholder={
                                            formData.eventType === 'regular'
                                                ? '3'
                                                : 'e.g. 35-50'
                                        }
                                    />
                                </div>

                                {/* TIME SELECTION */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                                        {formData.eventType === 'regular'
                                            ? 'Time'
                                            : 'Start & End Time'}
                                    </label>

                                    {currentConstraints?.isClosed ? (
                                        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-100 p-3 text-sm text-rose-700">
                                            <AlertTriangle className="h-4 w-4" />{' '}
                                            Cannot set time: Venue Closed
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <TimePicker
                                                hour={formData.timeHour}
                                                minute={formData.timeMinute}
                                                onHourChange={(v) =>
                                                    setFormData({
                                                        ...formData,
                                                        timeHour: v,
                                                    })
                                                }
                                                onMinuteChange={(v) =>
                                                    setFormData({
                                                        ...formData,
                                                        timeMinute: v,
                                                    })
                                                }
                                                constraints={currentConstraints}
                                            />

                                            {formData.eventType !==
                                                'regular' && (
                                                <>
                                                    <span className="text-sm font-medium text-slate-400">
                                                        to
                                                    </span>
                                                    <TimePicker
                                                        hour={
                                                            formData.endTimeHour
                                                        }
                                                        minute={
                                                            formData.endTimeMinute
                                                        }
                                                        onHourChange={(v) =>
                                                            setFormData({
                                                                ...formData,
                                                                endTimeHour: v,
                                                            })
                                                        }
                                                        onMinuteChange={(v) =>
                                                            setFormData({
                                                                ...formData,
                                                                endTimeMinute:
                                                                    v,
                                                            })
                                                        }
                                                        constraints={
                                                            currentConstraints
                                                        }
                                                    />
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Client & Notes (Same as before) */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                                    Contact Details
                                </h3>
                                <div className="space-y-3">
                                    <input
                                        type="text"
                                        value={formData.clientName}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                clientName: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
                                        placeholder="Full Name"
                                    />
                                    <input
                                        type="email"
                                        value={formData.clientEmail}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                clientEmail: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
                                        placeholder="Email"
                                    />
                                    <input
                                        type="tel"
                                        value={formData.clientPhone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                clientPhone: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
                                        placeholder="Phone"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                                        Message (Client)
                                    </label>
                                    <textarea
                                        rows="3"
                                        value={formData.message}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                message: e.target.value,
                                            })
                                        }
                                        className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700"
                                    ></textarea>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold tracking-wider text-slate-400 uppercase">
                                        Internal Notes
                                    </label>
                                    <textarea
                                        rows="2"
                                        value={formData.notes}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                notes: e.target.value,
                                            })
                                        }
                                        className="w-full resize-none rounded-xl border border-amber-100 bg-amber-50 px-3 py-3 text-sm text-slate-700"
                                        placeholder="Staff notes..."
                                    ></textarea>
                                </div>
                            </div>
                        </div>

                        <div className="sticky bottom-0 z-10 flex gap-3 border-t border-slate-100 bg-white p-4">
                            <button
                                onClick={() => setViewMode('view')}
                                className="flex-1 rounded-xl py-3 font-medium text-slate-500 hover:bg-slate-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setViewMode('view')}
                                className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-medium text-white shadow-lg hover:bg-indigo-700"
                            >
                                <Save className="h-4 w-4" /> Save Changes
                            </button>
                        </div>
                    </div>
                )}

                {/* ================= SETTINGS MODE ================= */}
                {viewMode === 'settings' && (
                    <div className="flex h-full flex-col bg-slate-50/50">
                        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white p-6">
                            <button
                                onClick={() => setViewMode('view')}
                                className="-ml-2 rounded-full p-2 text-slate-400 hover:bg-slate-50"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </button>
                            <h2 className="text-lg font-bold text-slate-800">
                                Opening Hours
                            </h2>
                            <div className="w-9"></div>
                        </div>

                        <div className="overflow-y-auto p-4">
                            <div className="space-y-3">
                                {[1, 2, 3, 4, 5, 6, 0].map((dayIndex) => {
                                    const day = openingHours[dayIndex];
                                    return (
                                        <div
                                            key={dayIndex}
                                            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                        >
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="font-bold text-slate-700">
                                                    {day.name}
                                                </span>
                                                <label className="flex cursor-pointer items-center gap-2">
                                                    <span className="text-xs font-medium text-slate-400 uppercase">
                                                        {day.isClosed
                                                            ? 'Closed'
                                                            : 'Open'}
                                                    </span>
                                                    <div
                                                        className={`h-6 w-10 rounded-full p-1 transition-colors ${!day.isClosed ? 'bg-indigo-500' : 'bg-slate-200'}`}
                                                        onClick={() =>
                                                            setOpeningHours(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [dayIndex]:
                                                                        {
                                                                            ...prev[
                                                                                dayIndex
                                                                            ],
                                                                            isClosed:
                                                                                !prev[
                                                                                    dayIndex
                                                                                ]
                                                                                    .isClosed,
                                                                        },
                                                                }),
                                                            )
                                                        }
                                                    >
                                                        <div
                                                            className={`h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${!day.isClosed ? 'translate-x-4' : ''}`}
                                                        ></div>
                                                    </div>
                                                </label>
                                            </div>

                                            {!day.isClosed && (
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1">
                                                        <label className="mb-1 block text-[10px] font-bold text-slate-400 uppercase">
                                                            Open
                                                        </label>
                                                        <select
                                                            value={day.open}
                                                            onChange={(e) =>
                                                                setOpeningHours(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [dayIndex]:
                                                                            {
                                                                                ...prev[
                                                                                    dayIndex
                                                                                ],
                                                                                open: parseInt(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ),
                                                                            },
                                                                    }),
                                                                )
                                                            }
                                                            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm"
                                                        >
                                                            {Array.from(
                                                                { length: 24 },
                                                                (_, i) => (
                                                                    <option
                                                                        key={i}
                                                                        value={
                                                                            i
                                                                        }
                                                                    >
                                                                        {i}:00
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                    <span className="self-end pb-2 text-slate-300">
                                                        -
                                                    </span>
                                                    <div className="flex-1">
                                                        <label className="mb-1 block text-[10px] font-bold text-slate-400 uppercase">
                                                            Close
                                                        </label>
                                                        <select
                                                            value={day.close}
                                                            onChange={(e) =>
                                                                setOpeningHours(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        [dayIndex]:
                                                                            {
                                                                                ...prev[
                                                                                    dayIndex
                                                                                ],
                                                                                close: parseInt(
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                                ),
                                                                            },
                                                                    }),
                                                                )
                                                            }
                                                            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-sm"
                                                        >
                                                            {Array.from(
                                                                { length: 24 },
                                                                (_, i) => (
                                                                    <option
                                                                        key={i}
                                                                        value={
                                                                            i
                                                                        }
                                                                    >
                                                                        {i}:00
                                                                    </option>
                                                                ),
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="sticky bottom-0 z-10 border-t border-slate-100 bg-white p-4">
                            <button
                                onClick={() => setViewMode('view')}
                                className="w-full rounded-xl bg-slate-900 py-3 font-medium text-white shadow-lg transition-all hover:bg-slate-800"
                            >
                                Done
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Sub Components ---

const EventTypeOption = ({ active, onClick, colorClass, label, dotClass }) => (
    <label
        className={`relative flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-3 transition-all ${active ? colorClass : 'border-slate-200 bg-white text-slate-500 hover:bg-slate-50'} `}
    >
        <input
            type="radio"
            className="hidden"
            checked={active}
            onChange={onClick}
        />
        <div
            className={`h-2 w-2 rounded-full ${active ? dotClass : 'bg-slate-300'}`}
        ></div>
        <span className="text-xs font-bold tracking-wide uppercase">
            {label}
        </span>
    </label>
);

const TimePicker = ({
    hour,
    minute,
    onHourChange,
    onMinuteChange,
    constraints,
}) => {
    // Dynamic range based on constraints or default (0-23) if parsing fails
    const minHour = constraints ? constraints.open : 0;
    const maxHour = constraints ? constraints.close : 23;

    const hours = [];
    // If no valid constraints (e.g. date parsing error), show full day.
    // If strict constraints, only show open hours.
    for (let i = minHour; i <= maxHour; i++) {
        hours.push(i);
    }

    const minutes = ['00', '15', '30', '45'];

    return (
        <div className="flex flex-1 gap-1">
            <div className="relative flex-1">
                <select
                    value={hour}
                    onChange={(e) => onHourChange(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-2 py-2 pr-6 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
                >
                    {hours.map((h) => (
                        <option key={h} value={h}>
                            {h}
                        </option>
                    ))}
                </select>
                <span className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-slate-400">
                    H
                </span>
            </div>
            <span className="self-center text-slate-300">:</span>
            <div className="relative flex-1">
                <select
                    value={minute}
                    onChange={(e) => onMinuteChange(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-2 py-2 pr-6 text-sm text-slate-700 focus:border-indigo-500 focus:outline-none"
                >
                    {minutes.map((m) => (
                        <option key={m} value={m}>
                            {m}
                        </option>
                    ))}
                </select>
                <span className="absolute top-1/2 right-2 -translate-y-1/2 text-[10px] text-slate-400">
                    M
                </span>
            </div>
        </div>
    );
};

export default ReservationSummary;
