import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
const ManageRecentBookingPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ManageRecentBookingPage.url(options),
    method: 'get',
})

ManageRecentBookingPage.definition = {
    methods: ["get","head"],
    url: '/recent-bookings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
ManageRecentBookingPage.url = (options?: RouteQueryOptions) => {
    return ManageRecentBookingPage.definition.url + queryParams(options)
}

/**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
ManageRecentBookingPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ManageRecentBookingPage.url(options),
    method: 'get',
})
/**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
ManageRecentBookingPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ManageRecentBookingPage.url(options),
    method: 'head',
})

    /**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
    const ManageRecentBookingPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ManageRecentBookingPage.url(options),
        method: 'get',
    })

            /**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
        ManageRecentBookingPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ManageRecentBookingPage.url(options),
            method: 'get',
        })
            /**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
        ManageRecentBookingPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ManageRecentBookingPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ManageRecentBookingPage.form = ManageRecentBookingPageForm
export default ManageRecentBookingPage