import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Domains\Booking\Actions\StoreBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/StoreBookingEvent.php:17
 * @route '/bookings/event-store'
 */
const StoreBookingEvent = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: StoreBookingEvent.url(options),
    method: 'post',
})

StoreBookingEvent.definition = {
    methods: ["post"],
    url: '/bookings/event-store',
} satisfies RouteDefinition<["post"]>

/**
* @see \Domains\Booking\Actions\StoreBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/StoreBookingEvent.php:17
 * @route '/bookings/event-store'
 */
StoreBookingEvent.url = (options?: RouteQueryOptions) => {
    return StoreBookingEvent.definition.url + queryParams(options)
}

/**
* @see \Domains\Booking\Actions\StoreBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/StoreBookingEvent.php:17
 * @route '/bookings/event-store'
 */
StoreBookingEvent.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: StoreBookingEvent.url(options),
    method: 'post',
})

    /**
* @see \Domains\Booking\Actions\StoreBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/StoreBookingEvent.php:17
 * @route '/bookings/event-store'
 */
    const StoreBookingEventForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: StoreBookingEvent.url(options),
        method: 'post',
    })

            /**
* @see \Domains\Booking\Actions\StoreBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/StoreBookingEvent.php:17
 * @route '/bookings/event-store'
 */
        StoreBookingEventForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: StoreBookingEvent.url(options),
            method: 'post',
        })
    
    StoreBookingEvent.form = StoreBookingEventForm
export default StoreBookingEvent