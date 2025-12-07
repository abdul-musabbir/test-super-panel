import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Domains\RecentBooking\Actions\ApprovedBooking::__invoke
 * @see app/Domains/RecentBooking/Actions/ApprovedBooking.php:17
 * @route '/recent-bookings/{webhookLog}/approve'
 */
const ApprovedBooking = (args: { webhookLog: number | { id: number } } | [webhookLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ApprovedBooking.url(args, options),
    method: 'post',
})

ApprovedBooking.definition = {
    methods: ["post"],
    url: '/recent-bookings/{webhookLog}/approve',
} satisfies RouteDefinition<["post"]>

/**
* @see \Domains\RecentBooking\Actions\ApprovedBooking::__invoke
 * @see app/Domains/RecentBooking/Actions/ApprovedBooking.php:17
 * @route '/recent-bookings/{webhookLog}/approve'
 */
ApprovedBooking.url = (args: { webhookLog: number | { id: number } } | [webhookLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return ApprovedBooking.definition.url
            .replace('{webhookLog}', parsedArgs.webhookLog.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\RecentBooking\Actions\ApprovedBooking::__invoke
 * @see app/Domains/RecentBooking/Actions/ApprovedBooking.php:17
 * @route '/recent-bookings/{webhookLog}/approve'
 */
ApprovedBooking.post = (args: { webhookLog: number | { id: number } } | [webhookLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: ApprovedBooking.url(args, options),
    method: 'post',
})

    /**
* @see \Domains\RecentBooking\Actions\ApprovedBooking::__invoke
 * @see app/Domains/RecentBooking/Actions/ApprovedBooking.php:17
 * @route '/recent-bookings/{webhookLog}/approve'
 */
    const ApprovedBookingForm = (args: { webhookLog: number | { id: number } } | [webhookLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: ApprovedBooking.url(args, options),
        method: 'post',
    })

            /**
* @see \Domains\RecentBooking\Actions\ApprovedBooking::__invoke
 * @see app/Domains/RecentBooking/Actions/ApprovedBooking.php:17
 * @route '/recent-bookings/{webhookLog}/approve'
 */
        ApprovedBookingForm.post = (args: { webhookLog: number | { id: number } } | [webhookLog: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: ApprovedBooking.url(args, options),
            method: 'post',
        })
    
    ApprovedBooking.form = ApprovedBookingForm
export default ApprovedBooking