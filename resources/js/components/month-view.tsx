'use client';

import {
    addDays,
    eachDayOfInterval,
    endOfMonth,
    endOfWeek,
    format,
    isSameDay,
    isSameMonth,
    isToday,
    startOfMonth,
    startOfWeek,
} from 'date-fns';
import { fi } from 'date-fns/locale';
import type React from 'react';
import { useEffect, useMemo, useState } from 'react';

import {
    DefaultStartHour,
    EventGap,
    EventHeight,
} from '@/components/constants';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { DraggableEvent } from './draggable-event';
import { DroppableCell } from './droppable-cell';
import { EventItem } from './event-item';
import { CalendarEvent } from './types';
import { useEventVisibility } from './use-event-visibility';
import {
    getAllEventsForDay,
    getEventsForDay,
    getSpanningEventsForDay,
    sortEvents,
} from './utils';

interface MonthViewProps {
    currentDate: Date;
    events: CalendarEvent[];
    onEventSelect: (event: CalendarEvent) => void;
    onEventCreate: (startTime: Date) => void;
}

export function MonthView({
    currentDate,
    events,
    onEventSelect,
    onEventCreate,
}: MonthViewProps) {
    const days = useMemo(() => {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(monthStart);

        // Week starts on Monday (weekStartsOn: 1) and uses Finnish locale
        const calendarStart = startOfWeek(monthStart, {
            weekStartsOn: 1,
            locale: fi,
        });
        const calendarEnd = endOfWeek(monthEnd, {
            weekStartsOn: 1,
            locale: fi,
        });

        return eachDayOfInterval({ end: calendarEnd, start: calendarStart });
    }, [currentDate]);

    const weekdays = useMemo(() => {
        const start = startOfWeek(new Date(), { weekStartsOn: 1, locale: fi });
        return Array.from({ length: 7 }).map((_, i) => {
            const date = addDays(start, i);
            const fullName = format(date, 'cccc', { locale: fi });
            const shortName = format(date, 'EEE', { locale: fi });

            const fullCap =
                fullName.charAt(0).toUpperCase() + fullName.slice(1);
            const shortCap =
                shortName.charAt(0).toUpperCase() + shortName.slice(1);

            return { full: fullCap, short: shortCap };
        });
    }, []);

    const weeks = useMemo(() => {
        const result: Date[][] = [];
        let week: Date[] = [];

        for (let i = 0; i < days.length; i++) {
            week.push(days[i]);
            if (week.length === 7 || i === days.length - 1) {
                result.push(week);
                week = [];
            }
        }

        return result;
    }, [days]);

    const handleEventClick = (event: CalendarEvent, e: React.MouseEvent) => {
        e.stopPropagation();
        onEventSelect(event);
    };

    const [isMounted, setIsMounted] = useState(false);
    const { contentRef, getVisibleEventCount } = useEventVisibility({
        eventGap: EventGap,
        eventHeight: EventHeight,
    });

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <div
            className="flex h-full flex-col rounded-xl border border-border/60 bg-background/60 shadow-sm backdrop-blur-sm"
            data-slot="month-view"
            style={
                {
                    '--event-height': `${EventHeight}px`,
                    '--event-gap': `${EventGap}px`,
                } as React.CSSProperties
            }
        >
            {/* Scroll container for small screens */}
            <div className="flex-1 overflow-x-auto">
                {/* Ensure good width on mobile but flexible on larger screens */}
                <div className="flex h-full min-w-[720px] flex-col md:min-w-full">
                    {/* Weekday header */}
                    <div className="sticky top-0 z-20 grid grid-cols-7 border-b border-border/70 bg-background/90">
                        {weekdays.map((day, index) => (
                            <div
                                className="py-2 text-center text-[11px] text-muted-foreground/70 sm:text-sm"
                                key={`${day.full}-${index}`}
                            >
                                {/* Mobile: short name */}
                                <span className="sm:hidden">{day.short}</span>
                                {/* Desktop: full name */}
                                <span className="hidden sm:inline">
                                    {day.full}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid flex-1 auto-rows-fr">
                        {weeks.map((week, weekIndex) => (
                            <div
                                className="grid grid-cols-7 [&:last-child>*]:border-b-0"
                                key={`week-${weekIndex}`}
                            >
                                {week.map((day, dayIndex) => {
                                    if (!day) return null; // Skip if day is undefined

                                    const dayEvents = getEventsForDay(
                                        events,
                                        day,
                                    );
                                    const spanningEvents =
                                        getSpanningEventsForDay(events, day);
                                    const isCurrentMonth = isSameMonth(
                                        day,
                                        currentDate,
                                    );
                                    const cellId = `month-cell-${day.toISOString()}`;
                                    const allDayEvents = [
                                        ...spanningEvents,
                                        ...dayEvents,
                                    ];
                                    const allEvents = getAllEventsForDay(
                                        events,
                                        day,
                                    );

                                    const isReferenceCell =
                                        weekIndex === 0 && dayIndex === 0;
                                    const visibleCount = isMounted
                                        ? getVisibleEventCount(
                                              allDayEvents.length,
                                          )
                                        : undefined;
                                    const hasMore =
                                        visibleCount !== undefined &&
                                        allDayEvents.length > visibleCount;
                                    const remainingCount = hasMore
                                        ? allDayEvents.length - visibleCount
                                        : 0;

                                    return (
                                        <div
                                            className="group border-r border-b border-border/70 last:border-r-0 data-outside-cell:bg-muted/20 data-outside-cell:text-muted-foreground/70 data-today:bg-primary/5"
                                            data-outside-cell={
                                                !isCurrentMonth || undefined
                                            }
                                            data-today={
                                                isToday(day) || undefined
                                            }
                                            key={day.toString()}
                                        >
                                            <DroppableCell
                                                className="flex h-full flex-col px-1 pb-1 transition-colors hover:bg-muted/40 sm:px-2"
                                                date={day}
                                                id={cellId}
                                                onClick={() => {
                                                    const startTime = new Date(
                                                        day,
                                                    );
                                                    startTime.setHours(
                                                        DefaultStartHour,
                                                        0,
                                                        0,
                                                    );
                                                    onEventCreate(startTime);
                                                }}
                                            >
                                                {/* Date badge */}
                                                <div className="mt-1 inline-flex size-6 items-center justify-center rounded-full text-[11px] group-data-today:bg-primary group-data-today:text-primary-foreground group-data-today:ring-2 group-data-today:ring-primary/70 sm:text-sm">
                                                    {format(day, 'd', {
                                                        locale: fi,
                                                    })}
                                                </div>

                                                {/* Events container */}
                                                <div
                                                    className="mt-0.5 min-h-[calc((var(--event-height)+var(--event-gap))*2)] sm:min-h-[calc((var(--event-height)+var(--event-gap))*3)] lg:min-h-[calc((var(--event-height)+var(--event-gap))*4)]"
                                                    ref={
                                                        isReferenceCell
                                                            ? contentRef
                                                            : null
                                                    }
                                                >
                                                    {sortEvents(
                                                        allDayEvents,
                                                    ).map((event, index) => {
                                                        const eventStart =
                                                            new Date(
                                                                event.start,
                                                            );
                                                        const eventEnd =
                                                            new Date(event.end);
                                                        const isFirstDay =
                                                            isSameDay(
                                                                day,
                                                                eventStart,
                                                            );
                                                        const isLastDay =
                                                            isSameDay(
                                                                day,
                                                                eventEnd,
                                                            );

                                                        const isHidden =
                                                            isMounted &&
                                                            visibleCount &&
                                                            index >=
                                                                visibleCount;

                                                        if (!visibleCount)
                                                            return null;

                                                        if (!isFirstDay) {
                                                            return (
                                                                <div
                                                                    aria-hidden={
                                                                        isHidden
                                                                            ? 'true'
                                                                            : undefined
                                                                    }
                                                                    className="aria-hidden:hidden"
                                                                    key={`spanning-${event.id}-${day
                                                                        .toISOString()
                                                                        .slice(
                                                                            0,
                                                                            10,
                                                                        )}`}
                                                                >
                                                                    <EventItem
                                                                        event={
                                                                            event
                                                                        }
                                                                        isFirstDay={
                                                                            isFirstDay
                                                                        }
                                                                        isLastDay={
                                                                            isLastDay
                                                                        }
                                                                        onClick={(
                                                                            e,
                                                                        ) =>
                                                                            handleEventClick(
                                                                                event,
                                                                                e,
                                                                            )
                                                                        }
                                                                        view="month"
                                                                    >
                                                                        <div
                                                                            aria-hidden={
                                                                                true
                                                                            }
                                                                            className="invisible"
                                                                        >
                                                                            {!event.allDay && (
                                                                                <span>
                                                                                    {format(
                                                                                        new Date(
                                                                                            event.start,
                                                                                        ),
                                                                                        'H:mm',
                                                                                        {
                                                                                            locale: fi,
                                                                                        },
                                                                                    )}{' '}
                                                                                </span>
                                                                            )}
                                                                            {
                                                                                event.title
                                                                            }
                                                                        </div>
                                                                    </EventItem>
                                                                </div>
                                                            );
                                                        }

                                                        return (
                                                            <div
                                                                aria-hidden={
                                                                    isHidden
                                                                        ? 'true'
                                                                        : undefined
                                                                }
                                                                className="aria-hidden:hidden"
                                                                key={event.id}
                                                            >
                                                                <DraggableEvent
                                                                    event={
                                                                        event
                                                                    }
                                                                    isFirstDay={
                                                                        isFirstDay
                                                                    }
                                                                    isLastDay={
                                                                        isLastDay
                                                                    }
                                                                    onClick={(
                                                                        e,
                                                                    ) =>
                                                                        handleEventClick(
                                                                            event,
                                                                            e,
                                                                        )
                                                                    }
                                                                    view="month"
                                                                />
                                                            </div>
                                                        );
                                                    })}

                                                    {hasMore && (
                                                        <Popover modal>
                                                            <PopoverTrigger
                                                                asChild
                                                            >
                                                                <button
                                                                    className="mt-[var(--event-gap)] flex h-[var(--event-height)] w-full items-center overflow-hidden rounded-[4px] px-1 text-left text-[10px] text-muted-foreground backdrop-blur-md transition outline-none select-none hover:bg-muted/60 hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:px-2 sm:text-xs"
                                                                    onClick={(
                                                                        e,
                                                                    ) =>
                                                                        e.stopPropagation()
                                                                    }
                                                                    type="button"
                                                                >
                                                                    <span>
                                                                        +{' '}
                                                                        {
                                                                            remainingCount
                                                                        }{' '}
                                                                        <span className="max-sm:sr-only">
                                                                            lisää
                                                                        </span>
                                                                    </span>
                                                                </button>
                                                            </PopoverTrigger>
                                                            <PopoverContent
                                                                align="center"
                                                                className="max-w-64 p-3"
                                                                style={
                                                                    {
                                                                        '--event-height': `${EventHeight}px`,
                                                                    } as Record<
                                                                        string,
                                                                        string
                                                                    >
                                                                }
                                                            >
                                                                <div className="space-y-2">
                                                                    <div className="text-sm font-medium">
                                                                        {format(
                                                                            day,
                                                                            'EEE d',
                                                                            {
                                                                                locale: fi,
                                                                            },
                                                                        )}
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        {sortEvents(
                                                                            allEvents,
                                                                        ).map(
                                                                            (
                                                                                event,
                                                                            ) => {
                                                                                const eventStart =
                                                                                    new Date(
                                                                                        event.start,
                                                                                    );
                                                                                const eventEnd =
                                                                                    new Date(
                                                                                        event.end,
                                                                                    );
                                                                                const isFirstDay =
                                                                                    isSameDay(
                                                                                        day,
                                                                                        eventStart,
                                                                                    );
                                                                                const isLastDay =
                                                                                    isSameDay(
                                                                                        day,
                                                                                        eventEnd,
                                                                                    );

                                                                                return (
                                                                                    <EventItem
                                                                                        event={
                                                                                            event
                                                                                        }
                                                                                        isFirstDay={
                                                                                            isFirstDay
                                                                                        }
                                                                                        isLastDay={
                                                                                            isLastDay
                                                                                        }
                                                                                        key={
                                                                                            event.id
                                                                                        }
                                                                                        onClick={(
                                                                                            e,
                                                                                        ) =>
                                                                                            handleEventClick(
                                                                                                event,
                                                                                                e,
                                                                                            )
                                                                                        }
                                                                                        view="month"
                                                                                    />
                                                                                );
                                                                            },
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </PopoverContent>
                                                        </Popover>
                                                    )}
                                                </div>
                                            </DroppableCell>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
