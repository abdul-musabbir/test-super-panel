export type CalendarView = 'month' | 'week' | 'day' | 'agenda';

export type BookingStatus = 'confirmed' | 'pending' | 'cancel';

export interface CalendarEvent {
    id: string;
    title: string;
    description?: string;
    start: Date;
    end: Date;
    allDay?: boolean;
    color?: EventColor;
    location?: string;
    // Booking-specific fields
    email?: string;
    phone?: string;
    numberOfGuests?: number;
    status?: BookingStatus;
}

export type EventColor =
    | 'sky'
    | 'amber'
    | 'violet'
    | 'rose'
    | 'emerald'
    | 'orange';
