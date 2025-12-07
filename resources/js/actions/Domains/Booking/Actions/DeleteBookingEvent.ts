import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Domains\Booking\Actions\DeleteBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/DeleteBookingEvent.php:17
 * @route '/bookings/event/{booking}/destroy'
 */
const DeleteBookingEvent = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: DeleteBookingEvent.url(args, options),
    method: 'delete',
})

DeleteBookingEvent.definition = {
    methods: ["delete"],
    url: '/bookings/event/{booking}/destroy',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Domains\Booking\Actions\DeleteBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/DeleteBookingEvent.php:17
 * @route '/bookings/event/{booking}/destroy'
 */
DeleteBookingEvent.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return DeleteBookingEvent.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\Booking\Actions\DeleteBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/DeleteBookingEvent.php:17
 * @route '/bookings/event/{booking}/destroy'
 */
DeleteBookingEvent.delete = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: DeleteBookingEvent.url(args, options),
    method: 'delete',
})

    /**
* @see \Domains\Booking\Actions\DeleteBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/DeleteBookingEvent.php:17
 * @route '/bookings/event/{booking}/destroy'
 */
    const DeleteBookingEventForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: DeleteBookingEvent.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Domains\Booking\Actions\DeleteBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/DeleteBookingEvent.php:17
 * @route '/bookings/event/{booking}/destroy'
 */
        DeleteBookingEventForm.delete = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: DeleteBookingEvent.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    DeleteBookingEvent.form = DeleteBookingEventForm
export default DeleteBookingEvent