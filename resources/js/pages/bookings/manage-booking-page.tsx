import { CalendarEvent, EventCalendar } from '@/components';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function ManageBookingPage({ bookings: data }) {
    const [events, setEvents] = useState<CalendarEvent[]>(data);

    const handleEventAdd = (event: CalendarEvent) => {
        // Generate a unique ID for new bookings
        const newEvent = {
            ...event,
            id: `booking_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        };
        setEvents([...events, newEvent]);
    };

    const handleEventUpdate = (updatedEvent: CalendarEvent) => {
        setEvents(
            events.map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event,
            ),
        );
    };

    const handleEventDelete = (eventId: string) => {
        setEvents(events.filter((event) => event.id !== eventId));
    };

    return (
        <AppLayout>
            <Head title="Pöytävaraus" />
            <div className="p-5">
                <EventCalendar
                    events={events}
                    onEventAdd={handleEventAdd}
                    onEventDelete={handleEventDelete}
                    onEventUpdate={handleEventUpdate}
                />
            </div>
        </AppLayout>
    );
}
