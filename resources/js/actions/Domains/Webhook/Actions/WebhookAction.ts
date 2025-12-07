import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Domains\Webhook\Actions\WebhookAction::__invoke
 * @see app/Domains/Webhook/Actions/WebhookAction.php:17
 * @route '/api/webhook'
 */
const WebhookAction = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: WebhookAction.url(options),
    method: 'post',
})

WebhookAction.definition = {
    methods: ["post"],
    url: '/api/webhook',
} satisfies RouteDefinition<["post"]>

/**
* @see \Domains\Webhook\Actions\WebhookAction::__invoke
 * @see app/Domains/Webhook/Actions/WebhookAction.php:17
 * @route '/api/webhook'
 */
WebhookAction.url = (options?: RouteQueryOptions) => {
    return WebhookAction.definition.url + queryParams(options)
}

/**
* @see \Domains\Webhook\Actions\WebhookAction::__invoke
 * @see app/Domains/Webhook/Actions/WebhookAction.php:17
 * @route '/api/webhook'
 */
WebhookAction.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: WebhookAction.url(options),
    method: 'post',
})

    /**
* @see \Domains\Webhook\Actions\WebhookAction::__invoke
 * @see app/Domains/Webhook/Actions/WebhookAction.php:17
 * @route '/api/webhook'
 */
    const WebhookActionForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: WebhookAction.url(options),
        method: 'post',
    })

            /**
* @see \Domains\Webhook\Actions\WebhookAction::__invoke
 * @see app/Domains/Webhook/Actions/WebhookAction.php:17
 * @route '/api/webhook'
 */
        WebhookActionForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: WebhookAction.url(options),
            method: 'post',
        })
    
    WebhookAction.form = WebhookActionForm
export default WebhookAction