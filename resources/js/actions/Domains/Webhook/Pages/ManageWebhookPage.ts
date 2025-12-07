import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
const ManageWebhookPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ManageWebhookPage.url(options),
    method: 'get',
})

ManageWebhookPage.definition = {
    methods: ["get","head"],
    url: '/webhooks',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
ManageWebhookPage.url = (options?: RouteQueryOptions) => {
    return ManageWebhookPage.definition.url + queryParams(options)
}

/**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
ManageWebhookPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ManageWebhookPage.url(options),
    method: 'get',
})
/**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
ManageWebhookPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ManageWebhookPage.url(options),
    method: 'head',
})

    /**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
    const ManageWebhookPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ManageWebhookPage.url(options),
        method: 'get',
    })

            /**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
        ManageWebhookPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ManageWebhookPage.url(options),
            method: 'get',
        })
            /**
* @see \Domains\Webhook\Pages\ManageWebhookPage::__invoke
 * @see app/Domains/Webhook/Pages/ManageWebhookPage.php:13
 * @route '/webhooks'
 */
        ManageWebhookPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ManageWebhookPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ManageWebhookPage.form = ManageWebhookPageForm
export default ManageWebhookPage