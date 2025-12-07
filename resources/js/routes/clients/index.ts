import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
export const manage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(options),
    method: 'get',
})

manage.definition = {
    methods: ["get","head"],
    url: '/clients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
manage.url = (options?: RouteQueryOptions) => {
    return manage.definition.url + queryParams(options)
}

/**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
manage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(options),
    method: 'get',
})
/**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
manage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manage.url(options),
    method: 'head',
})

    /**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
    const manageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manage.url(options),
        method: 'get',
    })

            /**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
        manageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manage.url(options),
            method: 'get',
        })
            /**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
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
/**
* @see \Domains\Client\Actions\StoreClient::__invoke
 * @see app/Domains/Client/Actions/StoreClient.php:17
 * @route '/clients/store'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/clients/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \Domains\Client\Actions\StoreClient::__invoke
 * @see app/Domains/Client/Actions/StoreClient.php:17
 * @route '/clients/store'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Domains\Client\Actions\StoreClient::__invoke
 * @see app/Domains/Client/Actions/StoreClient.php:17
 * @route '/clients/store'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Domains\Client\Actions\StoreClient::__invoke
 * @see app/Domains/Client/Actions/StoreClient.php:17
 * @route '/clients/store'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Domains\Client\Actions\StoreClient::__invoke
 * @see app/Domains/Client/Actions/StoreClient.php:17
 * @route '/clients/store'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \Domains\Client\Actions\UpdateClient::__invoke
 * @see app/Domains/Client/Actions/UpdateClient.php:17
 * @route '/clients/{client}/update'
 */
export const update = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/clients/{client}/update',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Domains\Client\Actions\UpdateClient::__invoke
 * @see app/Domains/Client/Actions/UpdateClient.php:17
 * @route '/clients/{client}/update'
 */
update.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { client: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { client: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    client: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        client: typeof args.client === 'object'
                ? args.client.id
                : args.client,
                }

    return update.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\Client\Actions\UpdateClient::__invoke
 * @see app/Domains/Client/Actions/UpdateClient.php:17
 * @route '/clients/{client}/update'
 */
update.patch = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \Domains\Client\Actions\UpdateClient::__invoke
 * @see app/Domains/Client/Actions/UpdateClient.php:17
 * @route '/clients/{client}/update'
 */
    const updateForm = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Domains\Client\Actions\UpdateClient::__invoke
 * @see app/Domains/Client/Actions/UpdateClient.php:17
 * @route '/clients/{client}/update'
 */
        updateForm.patch = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \Domains\Client\Actions\DeleteClient::__invoke
 * @see app/Domains/Client/Actions/DeleteClient.php:17
 * @route '/clients/{client}/destroy'
 */
export const destroy = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: destroy.url(args, options),
    method: 'patch',
})

destroy.definition = {
    methods: ["patch"],
    url: '/clients/{client}/destroy',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Domains\Client\Actions\DeleteClient::__invoke
 * @see app/Domains/Client/Actions/DeleteClient.php:17
 * @route '/clients/{client}/destroy'
 */
destroy.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { client: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { client: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    client: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        client: typeof args.client === 'object'
                ? args.client.id
                : args.client,
                }

    return destroy.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\Client\Actions\DeleteClient::__invoke
 * @see app/Domains/Client/Actions/DeleteClient.php:17
 * @route '/clients/{client}/destroy'
 */
destroy.patch = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: destroy.url(args, options),
    method: 'patch',
})

    /**
* @see \Domains\Client\Actions\DeleteClient::__invoke
 * @see app/Domains/Client/Actions/DeleteClient.php:17
 * @route '/clients/{client}/destroy'
 */
    const destroyForm = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \Domains\Client\Actions\DeleteClient::__invoke
 * @see app/Domains/Client/Actions/DeleteClient.php:17
 * @route '/clients/{client}/destroy'
 */
        destroyForm.patch = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const clients = {
    manage: Object.assign(manage, manage),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default clients