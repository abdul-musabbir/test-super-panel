import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
import approved from './approved'
/**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
export const manage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(options),
    method: 'get',
})

manage.definition = {
    methods: ["get","head"],
    url: '/recent-bookings',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
manage.url = (options?: RouteQueryOptions) => {
    return manage.definition.url + queryParams(options)
}

/**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
manage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(options),
    method: 'get',
})
/**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
manage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manage.url(options),
    method: 'head',
})

    /**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
    const manageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manage.url(options),
        method: 'get',
    })

            /**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
 */
        manageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manage.url(options),
            method: 'get',
        })
            /**
* @see \Domains\RecentBooking\Pages\ManageRecentBookingPage::__invoke
 * @see app/Domains/RecentBooking/Pages/ManageRecentBookingPage.php:14
 * @route '/recent-bookings'
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
const recentBooking = {
    manage: Object.assign(manage, manage),
approved: Object.assign(approved, approved),
}

export default recentBooking