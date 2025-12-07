import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \Domains\Webhook\Actions\WebhookReceiver::__invoke
 * @see app/Domains/Webhook/Actions/WebhookReceiver.php:17
 * @route '/api/webhook/{webhook}'
 */
export const receive = (args: { webhook: string | { webhook_url: string } } | [webhook: string | { webhook_url: string } ] | string | { webhook_url: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receive.url(args, options),
    method: 'post',
})

receive.definition = {
    methods: ["post"],
    url: '/api/webhook/{webhook}',
} satisfies RouteDefinition<["post"]>

/**
* @see \Domains\Webhook\Actions\WebhookReceiver::__invoke
 * @see app/Domains/Webhook/Actions/WebhookReceiver.php:17
 * @route '/api/webhook/{webhook}'
 */
receive.url = (args: { webhook: string | { webhook_url: string } } | [webhook: string | { webhook_url: string } ] | string | { webhook_url: string }, options?: RouteQueryOptions) => {
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

    return receive.definition.url
            .replace('{webhook}', parsedArgs.webhook.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\Webhook\Actions\WebhookReceiver::__invoke
 * @see app/Domains/Webhook/Actions/WebhookReceiver.php:17
 * @route '/api/webhook/{webhook}'
 */
receive.post = (args: { webhook: string | { webhook_url: string } } | [webhook: string | { webhook_url: string } ] | string | { webhook_url: string }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: receive.url(args, options),
    method: 'post',
})

    /**
* @see \Domains\Webhook\Actions\WebhookReceiver::__invoke
 * @see app/Domains/Webhook/Actions/WebhookReceiver.php:17
 * @route '/api/webhook/{webhook}'
 */
    const receiveForm = (args: { webhook: string | { webhook_url: string } } | [webhook: string | { webhook_url: string } ] | string | { webhook_url: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: receive.url(args, options),
        method: 'post',
    })

            /**
* @see \Domains\Webhook\Actions\WebhookReceiver::__invoke
 * @see app/Domains/Webhook/Actions/WebhookReceiver.php:17
 * @route '/api/webhook/{webhook}'
 */
        receiveForm.post = (args: { webhook: string | { webhook_url: string } } | [webhook: string | { webhook_url: string } ] | string | { webhook_url: string }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: receive.url(args, options),
            method: 'post',
        })
    
    receive.form = receiveForm
const webhook = {
    receive: Object.assign(receive, receive),
}

export default webhook