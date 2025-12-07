import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::take
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:32
 * @route '/impersonate/take/{id}'
 */
export const take = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: take.url(args, options),
    method: 'get',
})

take.definition = {
    methods: ["get","head"],
    url: '/impersonate/take/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::take
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:32
 * @route '/impersonate/take/{id}'
 */
take.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return take.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::take
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:32
 * @route '/impersonate/take/{id}'
 */
take.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: take.url(args, options),
    method: 'get',
})
/**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::take
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:32
 * @route '/impersonate/take/{id}'
 */
take.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: take.url(args, options),
    method: 'head',
})

    /**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::take
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:32
 * @route '/impersonate/take/{id}'
 */
    const takeForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: take.url(args, options),
        method: 'get',
    })

            /**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::take
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:32
 * @route '/impersonate/take/{id}'
 */
        takeForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: take.url(args, options),
            method: 'get',
        })
            /**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::take
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:32
 * @route '/impersonate/take/{id}'
 */
        takeForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: take.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    take.form = takeForm
/**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::leave
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:67
 * @route '/impersonate/leave'
 */
export const leave = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leave.url(options),
    method: 'get',
})

leave.definition = {
    methods: ["get","head"],
    url: '/impersonate/leave',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::leave
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:67
 * @route '/impersonate/leave'
 */
leave.url = (options?: RouteQueryOptions) => {
    return leave.definition.url + queryParams(options)
}

/**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::leave
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:67
 * @route '/impersonate/leave'
 */
leave.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: leave.url(options),
    method: 'get',
})
/**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::leave
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:67
 * @route '/impersonate/leave'
 */
leave.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: leave.url(options),
    method: 'head',
})

    /**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::leave
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:67
 * @route '/impersonate/leave'
 */
    const leaveForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: leave.url(options),
        method: 'get',
    })

            /**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::leave
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:67
 * @route '/impersonate/leave'
 */
        leaveForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leave.url(options),
            method: 'get',
        })
            /**
* @see \Lab404\Impersonate\Controllers\ImpersonateController::leave
 * @see vendor/lab404/laravel-impersonate/src/Controllers/ImpersonateController.php:67
 * @route '/impersonate/leave'
 */
        leaveForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: leave.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    leave.form = leaveForm
const ImpersonateController = { take, leave }

export default ImpersonateController