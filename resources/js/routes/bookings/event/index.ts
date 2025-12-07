import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \Domains\Booking\Actions\StoreBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/StoreBookingEvent.php:17
 * @route '/bookings/event-store'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/bookings/event-store',
} satisfies RouteDefinition<["post"]>

/**
* @see \Domains\Booking\Actions\StoreBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/StoreBookingEvent.php:17
 * @route '/bookings/event-store'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Domains\Booking\Actions\StoreBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/StoreBookingEvent.php:17
 * @route '/bookings/event-store'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Domains\Booking\Actions\StoreBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/StoreBookingEvent.php:17
 * @route '/bookings/event-store'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Domains\Booking\Actions\StoreBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/StoreBookingEvent.php:17
 * @route '/bookings/event-store'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Domains\Booking\Actions\UpdateBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/UpdateBookingEvent.php:17
 * @route '/bookings/event/{booking}/update'
 */
export const update = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/bookings/event/{booking}/update',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Domains\Booking\Actions\UpdateBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/UpdateBookingEvent.php:17
 * @route '/bookings/event/{booking}/update'
 */
update.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\Booking\Actions\UpdateBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/UpdateBookingEvent.php:17
 * @route '/bookings/event/{booking}/update'
 */
update.patch = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Domains\Booking\Actions\UpdateBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/UpdateBookingEvent.php:17
 * @route '/bookings/event/{booking}/update'
 */
    const updateForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
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
        updateForm.patch = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \Domains\Booking\Actions\DeleteBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/DeleteBookingEvent.php:17
 * @route '/bookings/event/{booking}/destroy'
 */
export const destroy = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/bookings/event/{booking}/destroy',
} satisfies RouteDefinition<["delete"]>

/**
* @see \Domains\Booking\Actions\DeleteBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/DeleteBookingEvent.php:17
 * @route '/bookings/event/{booking}/destroy'
 */
destroy.url = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{booking}', parsedArgs.booking.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\Booking\Actions\DeleteBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/DeleteBookingEvent.php:17
 * @route '/bookings/event/{booking}/destroy'
 */
destroy.delete = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \Domains\Booking\Actions\DeleteBookingEvent::__invoke
 * @see app/Domains/Booking/Actions/DeleteBookingEvent.php:17
 * @route '/bookings/event/{booking}/destroy'
 */
    const destroyForm = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
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
        destroyForm.delete = (args: { booking: number | { id: number } } | [booking: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const event = {
    store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default event