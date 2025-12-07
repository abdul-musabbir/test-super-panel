import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Domains\RecentBooking\Actions\ApprovedBooking::__invoke
 * @see app/Domains/RecentBooking/Actions/ApprovedBooking.php:17
 * @route '/recent-bookings/{webhookLog}/approve'
 */
export const booking = (args: { webhookLog: number | { id: number } } | [webhookLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: booking.url(args, options),
    method: 'post',
})

booking.definition = {
    methods: ["post"],
    url: '/recent-bookings/{webhookLog}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Domains\RecentBooking\Actions\ApprovedBooking::__invoke
 * @see app/Domains/RecentBooking/Actions/ApprovedBooking.php:17
 * @route '/recent-bookings/{webhookLog}/approve'
 */
booking.url = (args: { webhookLog: number | { id: number } } | [webhookLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { webhookLog: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { webhookLog: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    webhookLog: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        webhookLog: typeof args.webhookLog === 'object'
                ? args.webhookLog.id
                : args.webhookLog,
                }

    return booking.definition.url
            .replace('{webhookLog}', parsedArgs.webhookLog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\RecentBooking\Actions\ApprovedBooking::__invoke
 * @see app/Domains/RecentBooking/Actions/ApprovedBooking.php:17
 * @route '/recent-bookings/{webhookLog}/approve'
 */
booking.post = (args: { webhookLog: number | { id: number } } | [webhookLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: booking.url(args, options),
    method: 'post',
})

    /**
* @see \Domains\RecentBooking\Actions\ApprovedBooking::__invoke
 * @see app/Domains/RecentBooking/Actions/ApprovedBooking.php:17
 * @route '/recent-bookings/{webhookLog}/approve'
 */
    const bookingForm = (args: { webhookLog: number | { id: number } } | [webhookLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: booking.url(args, options),
        method: 'post',
    })

            /**
* @see \Domains\RecentBooking\Actions\ApprovedBooking::__invoke
 * @see app/Domains/RecentBooking/Actions/ApprovedBooking.php:17
 * @route '/recent-bookings/{webhookLog}/approve'
 */
        bookingForm.post = (args: { webhookLog: number | { id: number } } | [webhookLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: booking.url(args, options),
            method: 'post',
        })
    
    booking.form = bookingForm
const approved = {
    booking: Object.assign(booking, booking),
}

export default approved