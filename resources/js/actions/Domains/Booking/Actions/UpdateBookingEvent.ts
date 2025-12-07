import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Domains\Booking\Actions\UpdateBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/UpdateBookingEvent.php:17
 * @route '/bookings/event/{booking}/update'
 */
const UpdateBookingEvent = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: UpdateBookingEvent.url(args, options),
    method: 'patch',
})

UpdateBookingEvent.definition = {
    methods: ["patch"],
    url: '/bookings/event/{booking}/update',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Domains\Booking\Actions\UpdateBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/UpdateBookingEvent.php:17
 * @route '/bookings/event/{booking}/update'
 */
UpdateBookingEvent.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { booking: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { booking: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    booking: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        booking: typeof args.booking === 'object'
                ? args.booking.id
                : args.booking,
                }

    return UpdateBookingEvent.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\Booking\Actions\UpdateBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/UpdateBookingEvent.php:17
 * @route '/bookings/event/{booking}/update'
 */
UpdateBookingEvent.patch = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: UpdateBookingEvent.url(args, options),
    method: 'patch',
})

    /**
* @see \Domains\Booking\Actions\UpdateBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/UpdateBookingEvent.php:17
 * @route '/bookings/event/{booking}/update'
 */
    const UpdateBookingEventForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: UpdateBookingEvent.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Domains\Booking\Actions\UpdateBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/UpdateBookingEvent.php:17
 * @route '/bookings/event/{booking}/update'
 */
        UpdateBookingEventForm.patch = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: UpdateBookingEvent.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    UpdateBookingEvent.form = UpdateBookingEventForm
export default UpdateBookingEvent