<?php

declare(strict_types=1);

namespace Domains\Common\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CanImpersonate
{
    /**
     * Handle an incoming request.
     *
     * @param \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (! $user) {
            abort(404);
        }

        // Superadmin can impersonate anyone
        if ($user->hasRole('superadmin', 'web')) {
            return $next($request);
        }

        // Otherwise, abort
        abort(404);
    }
}
