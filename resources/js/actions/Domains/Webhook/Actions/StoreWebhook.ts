import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Domains\Webhook\Actions\StoreWebhook::__invoke
 * @see app/Domains/Webhook/Actions/StoreWebhook.php:17
 * @route '/webhooks/store'
 */
const StoreWebhook = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: StoreWebhook.url(options),
    method: 'post',
})

StoreWebhook.definition = {
    methods: ["post"],
    url: '/webhooks/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \Domains\Webhook\Actions\StoreWebhook::__invoke
 * @see app/Domains/Webhook/Actions/StoreWebhook.php:17
 * @route '/webhooks/store'
 */
StoreWebhook.url = (options?: RouteQueryOptions) => {
    return StoreWebhook.definition.url + queryParams(options)
}

/**
* @see \Domains\Webhook\Actions\StoreWebhook::__invoke
 * @see app/Domains/Webhook/Actions/StoreWebhook.php:17
 * @route '/webhooks/store'
 */
StoreWebhook.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: StoreWebhook.url(options),
    method: 'post',
})

    /**
* @see \Domains\Webhook\Actions\StoreWebhook::__invoke
 * @see app/Domains/Webhook/Actions/StoreWebhook.php:17
 * @route '/webhooks/store'
 */
    const StoreWebhookForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: StoreWebhook.url(options),
        method: 'post',
    })

            /**
* @see \Domains\Webhook\Actions\StoreWebhook::__invoke
 * @see app/Domains/Webhook/Actions/StoreWebhook.php:17
 * @route '/webhooks/store'
 */
        StoreWebhookForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: StoreWebhook.url(options),
            method: 'post',
        })
    
    StoreWebhook.form = StoreWebhookForm
export default StoreWebhook