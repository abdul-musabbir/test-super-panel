import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Domains\Client\Actions\DeleteClient::__invoke
 * @see app/Domains/Client/Actions/DeleteClient.php:17
 * @route '/clients/{client}/destroy'
 */
const DeleteClient = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: DeleteClient.url(args, options),
    method: 'patch',
})

DeleteClient.definition = {
    methods: ["patch"],
    url: '/clients/{client}/destroy',
} satisfies RouteDefinition<["patch"]>

/**
* @see \Domains\Client\Actions\DeleteClient::__invoke
 * @see app/Domains/Client/Actions/DeleteClient.php:17
 * @route '/clients/{client}/destroy'
 */
DeleteClient.url = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return DeleteClient.definition.url
            .replace('{client}', parsedArgs.client.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Domains\Client\Actions\DeleteClient::__invoke
 * @see app/Domains/Client/Actions/DeleteClient.php:17
 * @route '/clients/{client}/destroy'
 */
DeleteClient.patch = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: DeleteClient.url(args, options),
    method: 'patch',
})

    /**
* @see \Domains\Client\Actions\DeleteClient::__invoke
 * @see app/Domains/Client/Actions/DeleteClient.php:17
 * @route '/clients/{client}/destroy'
 */
    const DeleteClientForm = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: DeleteClient.url(args, {
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
        DeleteClientForm.patch = (args: { client: number | { id: number } } | [client: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: DeleteClient.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    DeleteClient.form = DeleteClientForm
export default DeleteClient