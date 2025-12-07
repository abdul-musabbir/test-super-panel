import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
const ManageBookingPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ManageBookingPage.url(options),
    method: 'get',
})

ManageBookingPage.definition = {
    methods: ["get","head"],
    url: '/bookings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
ManageBookingPage.url = (options?: RouteQueryOptions) => {
    return ManageBookingPage.definition.url + queryParams(options)
}

/**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
ManageBookingPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ManageBookingPage.url(options),
    method: 'get',
})
/**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
ManageBookingPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ManageBookingPage.url(options),
    method: 'head',
})

    /**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
    const ManageBookingPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ManageBookingPage.url(options),
        method: 'get',
    })

            /**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
        ManageBookingPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ManageBookingPage.url(options),
            method: 'get',
        })
            /**
* @see \Domains\Booking\Pages\ManageBookingPage::__invoke
 * @see app/Domains/Booking/Pages/ManageBookingPage.php:13
 * @route '/bookings'
 */
        ManageBookingPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ManageBookingPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ManageBookingPage.form = ManageBookingPageForm
export default ManageBookingPage