import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
const ManageClientPage = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ManageClientPage.url(options),
    method: 'get',
})

ManageClientPage.definition = {
    methods: ["get","head"],
    url: '/clients',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
ManageClientPage.url = (options?: RouteQueryOptions) => {
    return ManageClientPage.definition.url + queryParams(options)
}

/**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
ManageClientPage.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: ManageClientPage.url(options),
    method: 'get',
})
/**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
ManageClientPage.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: ManageClientPage.url(options),
    method: 'head',
})

    /**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
    const ManageClientPageForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: ManageClientPage.url(options),
        method: 'get',
    })

            /**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
        ManageClientPageForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ManageClientPage.url(options),
            method: 'get',
        })
            /**
* @see \Domains\Client\Pages\ManageClientPage::__invoke
 * @see app/Domains/Client/Pages/ManageClientPage.php:13
 * @route '/clients'
 */
        ManageClientPageForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: ManageClientPage.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    ManageClientPage.form = ManageClientPageForm
export default ManageClientPage