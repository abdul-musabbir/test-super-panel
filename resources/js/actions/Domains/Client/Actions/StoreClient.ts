import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Domains\Client\Actions\StoreClient::__invoke
 * @see app/Domains/Client/Actions/StoreClient.php:17
 * @route '/clients/store'
 */
const StoreClient = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: StoreClient.url(options),
    method: 'post',
})

StoreClient.definition = {
    methods: ["post"],
    url: '/clients/store',
} satisfies RouteDefinition<["post"]>

/**
* @see \Domains\Client\Actions\StoreClient::__invoke
 * @see app/Domains/Client/Actions/StoreClient.php:17
 * @route '/clients/store'
 */
StoreClient.url = (options?: RouteQueryOptions) => {
    return StoreClient.definition.url + queryParams(options)
}

/**
* @see \Domains\Client\Actions\StoreClient::__invoke
 * @see app/Domains/Client/Actions/StoreClient.php:17
 * @route '/clients/store'
 */
StoreClient.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: StoreClient.url(options),
    method: 'post',
})

    /**
* @see \Domains\Client\Actions\StoreClient::__invoke
 * @see app/Domains/Client/Actions/StoreClient.php:17
 * @route '/clients/store'
 */
    const StoreClientForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: StoreClient.url(options),
        method: 'post',
    })

            /**
* @see \Domains\Client\Actions\StoreClient::__invoke
 * @see app/Domains/Client/Actions/StoreClient.php:17
 * @route '/clients/store'
 */
        StoreClientForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: StoreClient.url(options),
            method: 'post',
        })
    
    StoreClient.form = StoreClientForm
export default StoreClient