import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Domains\Webhook\Actions\WebhookReceiver::__invoke
 * @see app/Domains/Webhook/Actions/WebhookReceiver.php:17
 * @route '/api/webhook/{webhook}'
 */
const WebhookReceiver = (args: { webhook: string | { webhook_url: string } } | [webhook: string | { webhook_url: string } ] | string | { webhook_url: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: WebhookReceiver.url(args, options),
    method: 'post',
})

WebhookReceiver.definition = {
    methods: ["post"],
    url: '/api/webhook/{webhook}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Domains\Webhook\Actions\WebhookReceiver::__invoke
 * @see app/Domains/Webhook/Actions/WebhookReceiver.php:17
 * @route '/api/webhook/{webhook}'
 */
WebhookReceiver.url = (args: { webhook: string | { webhook_url: string } } | [webhook: string | { webhook_url: string } ] | string | { webhook_url: string }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { webhook: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'webhook_url' in args) {
            args = { webhook: args.webhook_url }
        }
    
    if (Array.isArray(args)) {
        args = {
                    webhook: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        webhook: typeof args.webhook === 'object'
                ? args.webhook.webhook_url
                : args.webhook,
                }

    return WebhookReceiver.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\Webhook\Actions\WebhookReceiver::__invoke
 * @see app/Domains/Webhook/Actions/WebhookReceiver.php:17
 * @route '/api/webhook/{webhook}'
 */
WebhookReceiver.post = (args: { webhook: string | { webhook_url: string } } | [webhook: string | { webhook_url: string } ] | string | { webhook_url: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: WebhookReceiver.url(args, options),
    method: 'post',
})

    /**
* @see \Domains\Webhook\Actions\WebhookReceiver::__invoke
 * @see app/Domains/Webhook/Actions/WebhookReceiver.php:17
 * @route '/api/webhook/{webhook}'
 */
    const WebhookReceiverForm = (args: { webhook: string | { webhook_url: string } } | [webhook: string | { webhook_url: string } ] | string | { webhook_url: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: WebhookReceiver.url(args, options),
        method: 'post',
    })

            /**
* @see \Domains\Webhook\Actions\WebhookReceiver::__invoke
 * @see app/Domains/Webhook/Actions/WebhookReceiver.php:17
 * @route '/api/webhook/{webhook}'
 */
        WebhookReceiverForm.post = (args: { webhook: string | { webhook_url: string } } | [webhook: string | { webhook_url: string } ] | string | { webhook_url: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: WebhookReceiver.url(args, options),
            method: 'post',
        })
    
    WebhookReceiver.form = WebhookReceiverForm
export default WebhookReceiver