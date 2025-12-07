import { RiCalendarCheckLine } from '@remixicon/react';
import {
    addDays,
    addMonths,
    addWeeks,
    endOfWeek,
    format,
    isSameMonth,
    startOfWeek,
    subMonths,
    subWeeks,
} from 'date-fns';
import { fi } from 'date-fns/locale';
import {
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { AgendaView } from './agenda-view';
import { CalendarDndProvider } from './calendar-dnd-context';
import {
    AgendaDaysToShow,
    EventGap,
    EventHeight,
    WeekCellsHeight,
} from './constants';
import { DayView } from './day-view';
import { EventDialog } from './event-dialog';
import { MonthView } from './month-view';
import { CalendarEvent, CalendarView } from './types';
import { addHoursToDate } from './utils';
import { WeekView } from './week-view';

export interface EventCalendarProps {
    events?: CalendarEvent[];
    onEventAdd?: (event: CalendarEvent) => void;
    onEventUpdate?: (event: CalendarEvent) => void;
    onEventDelete?: (eventId: string) => void;
    className?: string;
    initialView?: CalendarView;
}

const capitalize = (value: string) =>
    value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

export function EventCalendar({
    events = [],
    onEventAdd,
    onEventUpdate,
    onEventDelete,
    className,
    initialView = 'month',
}: EventCalendarProps) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<CalendarView>(initialView);
    const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
        null,
    );

    // Add keyboard shortcuts for view switching
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Skip if user is typing in an input, textarea or contentEditable element
            // or if the event dialog is open
            if (
                isEventDialogOpen ||
                e.target instanceof HTMLInputElement ||
                e.target instanceof HTMLTextAreaElement ||
                (e.target instanceof HTMLElement && e.target.isContentEditable)
            ) {
                return;
            }

            switch (e.key.toLowerCase()) {
                case 'm':
                    setView('month');
                    break;
                case 'w':
                    setView('week');
                    break;
                case 'd':
                    setView('day');
                    break;
                case 'a':
                    setView('agenda');
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isEventDialogOpen]);

    const handlePrevious = () => {
        if (view === 'month') {
            setCurrentDate(subMonths(currentDate, 1));
        } else if (view === 'week') {
            setCurrentDate(subWeeks(currentDate, 1));
        } else if (view === 'day') {
            setCurrentDate(addDays(currentDate, -1));
        } else if (view === 'agenda') {
            setCurrentDate(addDays(currentDate, -AgendaDaysToShow));
        }
    };

    const handleNext = () => {
        if (view === 'month') {
            setCurrentDate(addMonths(currentDate, 1));
        } else if (view === 'week') {
            setCurrentDate(addWeeks(currentDate, 1));
        } else if (view === 'day') {
            setCurrentDate(addDays(currentDate, 1));
        } else if (view === 'agenda') {
            setCurrentDate(addDays(currentDate, AgendaDaysToShow));
        }
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleEventSelect = (event: CalendarEvent) => {
        console.log('Event selected:', event);
        setSelectedEvent(event);
        setIsEventDialogOpen(true);
    };

    const handleEventCreate = (startTime: Date) => {
        console.log('Creating new event at:', startTime);

        // Snap to 15-minute intervals
        const minutes = startTime.getMinutes();
        const remainder = minutes % 15;
        if (remainder !== 0) {
            if (remainder < 7.5) {
                startTime.setMinutes(minutes - remainder);
            } else {
                startTime.setMinutes(minutes + (15 - remainder));
            }
            startTime.setSeconds(0);
            startTime.setMilliseconds(0);
        }

        const newEvent: CalendarEvent = {
            allDay: false,
            end: addHoursToDate(startTime, 1),
            id: '',
            start: startTime,
            title: '',
        };
        setSelectedEvent(newEvent);
        setIsEventDialogOpen(true);
    };

    const handleEventSave = (event: CalendarEvent) => {
        if (event.id) {
            onEventUpdate?.(event);
            toast(`Varaus "${event.title}" päivitetty`, {
                description: format(new Date(event.start), 'dd.MM.yyyy'),
                position: 'bottom-left',
            });
        } else {
            onEventAdd?.({
                ...event,
                id: Math.random().toString(36).substring(2, 11),
            });
            toast(`Varaus "${event.title}" lisätty`, {
                description: format(new Date(event.start), 'dd.MM.yyyy'),
                position: 'bottom-left',
            });
        }
        setIsEventDialogOpen(false);
        setSelectedEvent(null);
    };

    const handleEventDelete = (eventId: string) => {
        const deletedEvent = events.find((e) => e.id === eventId);
        onEventDelete?.(eventId);
        setIsEventDialogOpen(false);
        setSelectedEvent(null);

        if (deletedEvent) {
            toast(`Varaus "${deletedEvent.title}" poistettu`, {
                description: format(new Date(deletedEvent.start), 'dd.MM.yyyy'),
                position: 'bottom-left',
            });
        }
    };

    const handleEventUpdate = (updatedEvent: CalendarEvent) => {
        onEventUpdate?.(updatedEvent);
        toast(`Varaus "${updatedEvent.title}" siirretty`, {
            description: format(new Date(updatedEvent.start), 'dd.MM.yyyy'),
            position: 'bottom-left',
        });
    };

    const viewTitle = useMemo(() => {
        // Month view: "Joulukuu 2025"
        if (view === 'month') {
            const label = format(currentDate, 'LLLL yyyy', { locale: fi });
            return capitalize(label);
        }

        // Week view: "Joulukuu 2025" or "Marras – Joulukuu 2025"
        if (view === 'week') {
            const start = startOfWeek(currentDate, {
                weekStartsOn: 1,
                locale: fi,
            });
            const end = endOfWeek(currentDate, {
                weekStartsOn: 1,
                locale: fi,
            });

            if (isSameMonth(start, end)) {
                const label = format(start, 'LLLL yyyy', { locale: fi });
                return capitalize(label);
            }

            const startLabel = capitalize(format(start, 'LLL', { locale: fi }));
            const endLabel = capitalize(
                format(end, 'LLL yyyy', { locale: fi }),
            );

            return `${startLabel} – ${endLabel}`;
        }

        // Day view: Responsive three versions
        if (view === 'day') {
            const weekday = capitalize(
                format(currentDate, 'cccc', { locale: fi }),
            );
            const monthYear = capitalize(
                format(currentDate, 'LLLL yyyy', { locale: fi }),
            );
            const dayNumber = format(currentDate, 'd.', { locale: fi });

            const full = `${weekday} ${dayNumber} ${monthYear}`;
            const mid = `${dayNumber} ${monthYear}`;
            const compact = format(currentDate, 'dd.MM.yyyy');

            return (
                <>
                    <span aria-hidden="true" className="sm:hidden">
                        {compact}
                    </span>
                    <span
                        aria-hidden="true"
                        className="hidden sm:inline md:hidden"
                    >
                        {mid}
                    </span>
                    <span className="hidden md:inline">{full}</span>
                </>
            );
        }

        // Agenda view: range
        if (view === 'agenda') {
            const start = currentDate;
            const end = addDays(currentDate, AgendaDaysToShow - 1);

            if (isSameMonth(start, end)) {
                const label = format(start, 'LLLL yyyy', { locale: fi });
                return capitalize(label);
            }

            const startLabel = capitalize(format(start, 'LLL', { locale: fi }));
            const endLabel = capitalize(
                format(end, 'LLL yyyy', { locale: fi }),
            );

            return `${startLabel} – ${endLabel}`;
        }

        const fallback = format(currentDate, 'LLLL yyyy', { locale: fi });
        return capitalize(fallback);
    }, [currentDate, view]);

    return (
        <div
            className={cn(
                'flex flex-col rounded-lg border bg-background',
                'min-h-0 w-full',
                className,
            )}
            style={
                {
                    '--event-gap': `${EventGap}px`,
                    '--event-height': `${EventHeight}px`,
                    '--week-cells-height': `${WeekCellsHeight}px`,
                } as React.CSSProperties
            }
        >
            <CalendarDndProvider onEventUpdate={handleEventUpdate}>
                {/* Compact Header for Mobile */}
                <div className="shrink-0 border-b bg-background">
                    {/* Mobile Layout */}
                    <div className="flex flex-col gap-2 p-2 sm:hidden">
                        {/* Row 1: Title centered */}
                        <div className="flex items-center justify-center">
                            <h2 className="text-base font-semibold">
                                {viewTitle}
                            </h2>
                        </div>

                        {/* Row 2: All controls */}
                        <div className="flex items-center justify-between gap-2">
                            {/* Left: Today + Nav */}
                            <div className="flex items-center gap-1">
                                <Button
                                    className="h-9 w-9 p-0"
                                    onClick={handleToday}
                                    size="sm"
                                    variant="outline"
                                >
                                    <RiCalendarCheckLine size={18} />
                                </Button>
                                <Button
                                    aria-label="Edellinen"
                                    className="h-9 w-9 p-0"
                                    onClick={handlePrevious}
                                    size="icon"
                                    variant="ghost"
                                >
                                    <ChevronLeftIcon size={18} />
                                </Button>
                                <Button
                                    aria-label="Seuraava"
                                    className="h-9 w-9 p-0"
                                    onClick={handleNext}
                                    size="icon"
                                    variant="ghost"
                                >
                                    <ChevronRightIcon size={18} />
                                </Button>
                            </div>

                            {/* Right: View + Add */}
                            <div className="flex items-center gap-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            className="h-9 gap-1.5 px-3"
                                            size="sm"
                                            variant="outline"
                                        >
                                            <span className="text-xs font-medium">
                                                {view === 'month'
                                                    ? 'K'
                                                    : view === 'week'
                                                      ? 'V'
                                                      : view === 'day'
                                                        ? 'P'
                                                        : 'A'}
                                            </span>
                                            <ChevronDownIcon
                                                className="opacity-60"
                                                size={14}
                                            />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        align="end"
                                        className="min-w-32"
                                    >
                                        <DropdownMenuItem
                                            onClick={() => setView('month')}
                                        >
                                            Kuukausi
                                            <DropdownMenuShortcut>
                                                M
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => setView('week')}
                                        >
                                            Viikko
                                            <DropdownMenuShortcut>
                                                W
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => setView('day')}
                                        >
                                            Päivä
                                            <DropdownMenuShortcut>
                                                D
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={() => setView('agenda')}
                                        >
                                            Päiväjärjestys
                                            <DropdownMenuShortcut>
                                                A
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button
                                    className="h-9 w-9 p-0"
                                    onClick={() => {
                                        setSelectedEvent(null);
                                        setIsEventDialogOpen(true);
                                    }}
                                    size="sm"
                                >
                                    <PlusIcon size={18} />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop/Tablet Layout */}
                    <div className="hidden sm:flex sm:items-center sm:justify-between sm:p-4">
                        <div className="flex items-center gap-2 md:gap-4">
                            <Button
                                className="h-9 gap-2"
                                onClick={handleToday}
                                variant="outline"
                            >
                                <RiCalendarCheckLine size={16} />
                                <span>Tänään</span>
                            </Button>
                            <div className="flex items-center gap-1">
                                <Button
                                    aria-label="Edellinen"
                                    className="h-9 w-9"
                                    onClick={handlePrevious}
                                    size="icon"
                                    variant="ghost"
                                >
                                    <ChevronLeftIcon size={18} />
                                </Button>
                                <Button
                                    aria-label="Seuraava"
                                    className="h-9 w-9"
                                    onClick={handleNext}
                                    size="icon"
                                    variant="ghost"
                                >
                                    <ChevronRightIcon size={18} />
                                </Button>
                            </div>
                            <h2 className="text-lg font-semibold md:text-xl">
                                {viewTitle}
                            </h2>
                        </div>

                        <div className="flex items-center gap-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        className="h-9 gap-2"
                                        variant="outline"
                                    >
                                        <span className="text-sm">
                                            {view === 'month'
                                                ? 'Kuukausi'
                                                : view === 'week'
                                                  ? 'Viikko'
                                                  : view === 'day'
                                                    ? 'Päivä'
                                                    : 'Päiväjärjestys'}
                                        </span>
                                        <ChevronDownIcon
                                            className="opacity-60"
                                            size={16}
                                        />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    align="end"
                                    className="min-w-32"
                                >
                                    <DropdownMenuItem
                                        onClick={() => setView('month')}
                                    >
                                        Kuukausi
                                        <DropdownMenuShortcut>
                                            M
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setView('week')}
                                    >
                                        Viikko
                                        <DropdownMenuShortcut>
                                            W
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setView('day')}
                                    >
                                        Päivä
                                        <DropdownMenuShortcut>
                                            D
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        onClick={() => setView('agenda')}
                                    >
                                        Päiväjärjestys
                                        <DropdownMenuShortcut>
                                            A
                                        </DropdownMenuShortcut>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                className="h-9 gap-2"
                                onClick={() => {
                                    setSelectedEvent(null);
                                    setIsEventDialogOpen(true);
                                }}
                            >
                                <PlusIcon size={16} />
                                <span>Lisää varaus</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Calendar Views - Flexible container */}
                <div className="flex min-h-0 w-full flex-1 flex-col overflow-auto">
                    {view === 'month' && (
                        <MonthView
                            currentDate={currentDate}
                            events={events}
                            onEventCreate={handleEventCreate}
                            onEventSelect={handleEventSelect}
                        />
                    )}
                    {view === 'week' && (
                        <WeekView
                            currentDate={currentDate}
                            events={events}
                            onEventCreate={handleEventCreate}
                            onEventSelect={handleEventSelect}
                        />
                    )}
                    {view === 'day' && (
                        <DayView
                            currentDate={currentDate}
                            events={events}
                            onEventCreate={handleEventCreate}
                            onEventSelect={handleEventSelect}
                        />
                    )}
                    {view === 'agenda' && (
                        <AgendaView
                            currentDate={currentDate}
                            events={events}
                            onEventSelect={handleEventSelect}
                        />
                    )}
                </div>

                <EventDialog
                    event={selectedEvent}
                    isOpen={isEventDialogOpen}
                    onClose={() => {
                        setIsEventDialogOpen(false);
                        setSelectedEvent(null);
                    }}
                    onDelete={handleEventDelete}
                    onSave={handleEventSave}
                />
            </CalendarDndProvider>
        </div>
    );
}
