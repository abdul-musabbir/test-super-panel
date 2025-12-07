<?php

declare(strict_types=1);

namespace App\Providers;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;
use SplFileInfo;
use Symfony\Component\Finder\Finder;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerWebRoutes();
        $this->registerApiRoutes();
    }

    /**
     * Register all "routes.php" files under app/Domain/** with web middleware.
     */
    protected function registerWebRoutes(): void
    {
        foreach ($this->getDomainRouteFiles('routes.php') as $routeFile) {
            $this->loadRouteFile($routeFile, 'web');
        }
    }

    /**
     * Register all "api.php" files under app/Domain/** with api middleware.
     */
    protected function registerApiRoutes(): void
    {
        foreach ($this->getDomainRouteFiles('api.php') as $routeFile) {
            $this->loadRouteFile($routeFile, 'api', 'api');
        }
    }

    /**
     * Load a single route file with the specified middleware and optional prefix.
     */
    protected function loadRouteFile(SplFileInfo $routeFile, string $middleware, ?string $prefix = null): void
    {
        $group = Route::middleware($middleware);

        if ($prefix) {
            $group->prefix($prefix);
        }

        $group->group($routeFile->getRealPath());
    }

    /**
     * Get all route files by file name (e.g., routes.php or api.php) under app/Domain/**.
     */
    protected function getDomainRouteFiles(string $fileName): Finder
    {
        return Finder::create()
            ->files()
            ->name($fileName)
            ->in(app_path('Domains'));
    }
}
