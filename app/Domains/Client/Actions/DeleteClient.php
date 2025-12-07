<?php

declare(strict_types=1);

namespace Domains\Client\Actions;

use App\Models\User;
use Domains\Client\Pages\ManageClientPage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Validation\ValidationException;
use Lorisleiva\Actions\Concerns\AsAction;

class DeleteClient
{
    use AsAction;

    public function handle(User $client): RedirectResponse
    {
        try {
            $client->delete();

            return redirect()->action(ManageClientPage::class);
        } catch (\Exception $e) {
            throw ValidationException::withMessages([
                'server' => ['Failed to delete client'],
            ]);
        }
    }
}
