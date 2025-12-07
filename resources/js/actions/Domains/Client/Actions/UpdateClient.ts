import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Domains\Client\Actions\UpdateClient::__invoke
 * @see app/Domains/Client/Actions/UpdateClient.php:17
 * @route '/clients/{client}/update'
 */
const UpdateClient = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: UpdateClient.url(args, options),
    method: 'patch',
})

UpdateClient.definition = {
    methods: ["patch"],
    url: '/clients/{client}/update',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Domains\Client\Actions\UpdateClient::__invoke
 * @see app/Domains/Client/Actions/UpdateClient.php:17
 * @route '/clients/{client}/update'
 */
UpdateClient.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return UpdateClient.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\Client\Actions\UpdateClient::__invoke
 * @see app/Domains/Client/Actions/UpdateClient.php:17
 * @route '/clients/{client}/update'
 */
UpdateClient.patch = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: UpdateClient.url(args, options),
    method: 'patch',
})

    /**
* @see \Domains\Client\Actions\UpdateClient::__invoke
 * @see app/Domains/Client/Actions/UpdateClient.php:17
 * @route '/clients/{client}/update'
 */
    const UpdateClientForm = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: UpdateClient.url(args, {
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
        UpdateClientForm.patch = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: UpdateClient.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    UpdateClient.form = UpdateClientForm
export default UpdateClient