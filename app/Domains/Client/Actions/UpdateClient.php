<?php

declare(strict_types=1);

namespace Domains\Client\Actions;

use App\Models\User;
use Domains\Client\Data\ClientFormData;
use Domains\Client\Pages\ManageClientPage;
use Illuminate\Database\QueryException;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Lorisleiva\Actions\Concerns\AsAction;

class UpdateClient
{
    use AsAction;

    /**
     * Validation rules for updating a client.
     */
    public function rules(): array
    {
        /** @var User $client */
        $client = request()->route('client');

        return [
            'companyName' => [
                'required',
                'string',
                'max:255',
                Rule::unique('users', 'name')->ignore($client->id),
            ],
            'contactPerson' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($client->id),
            ],
            'phone' => ['nullable', 'string', 'max:20'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'city' => ['nullable', 'string', 'max:100'],
            'country' => ['nullable', 'string', 'max:100'],
            'streetAddress' => ['nullable', 'string', 'max:255'],
            'zipCode' => ['nullable', 'string', 'max:20'],
        ];
    }

    /**
     * Handle updating a client.
     */
    public function handle(User $client, ClientFormData $data): RedirectResponse
    {
        try {
            $updateData = [
                'name' => $data->companyName,
                'contact_person' => $data->contactPerson,
                'phone' => $data->phone,
                'email' => $data->email,
                'street_address' => $data->streetAddress,
                'zip_code' => $data->zipCode,
                'city' => $data->city,
                'country' => $data->country,
            ];

            // Only update password if provided
            if (! empty($data->password)) {
                $updateData['password'] = Hash::make($data->password);
            }

            $client->update($updateData);

            return redirect()
                ->action(ManageClientPage::class)
                ->with('success', 'Client updated successfully.');
        } catch (QueryException $exception) {
            if ($exception->getCode() === '23000') {
                throw ValidationException::withMessages([
                    'companyName' => ['This company name or email is already taken.'],
                ]);
            }

            report($exception);

            throw ValidationException::withMessages([
                'server' => ['A database error occurred while updating the client. Please try again.'],
            ]);
        } catch (\Throwable $exception) {
            report($exception);

            throw ValidationException::withMessages([
                'server' => ['An unexpected error occurred. Please try again later.'],
            ]);
        }
    }
}
