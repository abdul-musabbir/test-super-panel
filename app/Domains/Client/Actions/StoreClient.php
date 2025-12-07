<?php

declare(strict_types=1);

namespace Domains\Client\Actions;

use App\Models\User;
use Domains\Client\Data\ClientFormData;
use Domains\Client\Pages\ManageClientPage;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Lorisleiva\Actions\Concerns\AsAction;

class StoreClient
{
    use AsAction;

    /**
     * Validation rules for storing a client.
     */
    public function rules(): array
    {
        return [
            'companyName' => ['required', 'string', 'max:255', 'unique:users,name'],
            'contactPerson' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'phone' => ['nullable', 'string', 'max:20'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'city' => ['nullable', 'string', 'max:100'],
            'country' => ['nullable', 'string', 'max:100'],
            'streetAddress' => ['nullable', 'string', 'max:255'],
            'zipCode' => ['nullable', 'string', 'max:20'],
        ];
    }

    /**
     * Handle the creation of a new client.
     */
    public function handle(ClientFormData $data): RedirectResponse
    {
        try {
            $client = User::create([
                'name' => $data->companyName,
                'contact_person' => $data->contactPerson,
                'phone' => $data->phone,
                'email' => $data->email,
                'password' => Hash::make($data->password),
                'street_address' => $data->streetAddress,
                'zip_code' => $data->zipCode,
                'city' => $data->city,
                'country' => $data->country,
                // 'avatar' => null, // optional
            ]);

            // Assign the 'customer' role
            $client->assignRole('customer');

            return redirect()
                ->action(ManageClientPage::class)
                ->with('success', 'Client created successfully.');
        } catch (QueryException $exception) {
            // Handle DB-level unique constraint violations
            if ($exception->getCode() === '23000') {
                throw ValidationException::withMessages([
                    'companyName' => ['This company name or email is already taken.'],
                ]);
            }

            report($exception);

            throw ValidationException::withMessages([
                'server' => ['A database error occurred while creating the client. Please try again.'],
            ]);
        } catch (\Throwable $exception) {
            report($exception);

            throw ValidationException::withMessages([
                'server' => ['An unexpected error occurred. Please try again later.'],
            ]);
        }
    }
}
