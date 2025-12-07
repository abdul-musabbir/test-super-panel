import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
export const manage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(options),
    method: 'get',
})

manage.definition = {
    methods: ["get","head"],
    url: '/webhooks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
manage.url = (options?: RouteQueryOptions) => {
    return manage.definition.url + queryParams(options)
}

/**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
manage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: manage.url(options),
    method: 'get',
})
/**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
manage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: manage.url(options),
    method: 'head',
})

    /**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
    const manageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: manage.url(options),
        method: 'get',
    })

            /**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
        manageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: manage.url(options),
            method: 'get',
        })
            /**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
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
* @see \Domains\Webhook\Actions\StoreWebhook::__invoke
 * @see app/Domains/Webhook/Actions/StoreWebhook.php:17
 * @route '/webhooks/store'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/webhooks/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \Domains\Webhook\Actions\StoreWebhook::__invoke
 * @see app/Domains/Webhook/Actions/StoreWebhook.php:17
 * @route '/webhooks/store'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \Domains\Webhook\Actions\StoreWebhook::__invoke
 * @see app/Domains/Webhook/Actions/StoreWebhook.php:17
 * @route '/webhooks/store'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \Domains\Webhook\Actions\StoreWebhook::__invoke
 * @see app/Domains/Webhook/Actions/StoreWebhook.php:17
 * @route '/webhooks/store'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \Domains\Webhook\Actions\StoreWebhook::__invoke
 * @see app/Domains/Webhook/Actions/StoreWebhook.php:17
 * @route '/webhooks/store'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
const webhooks = {
    manage: Object.assign(manage, manage),
store: Object.assign(store, store),
}

export default webhooks