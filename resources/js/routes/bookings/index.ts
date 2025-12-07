import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import event from './event'
/**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
export const manage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(options),
    method: 'get',
})

manage.definition = {
    methods: ["get","head"],
    url: '/bookings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
manage.url = (options?: RouteQueryOptions) => {
    return manage.definition.url + queryParams(options)
}

/**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
manage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(options),
    method: 'get',
})
/**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
manage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manage.url(options),
    method: 'head',
})

    /**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
    const manageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manage.url(options),
        method: 'get',
    })

            /**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
        manageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manage.url(options),
            method: 'get',
        })
            /**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
        manageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    manage.form = manageForm
const bookings = {
    manage: Object.assign(manage, manage),
event: Object.assign(event, event),
}

export default bookings