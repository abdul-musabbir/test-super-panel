<?php

declare(strict_types=1);

namespace Domains\Client\Pages;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class ManageClientPage
{
    public function __invoke(): Response
    {
        $search = request()->input('search');

        return Inertia::render('clients/manage-client-page', [
            'clients' => $this->getClients($search),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    private function getClients(?string $search = null)
    {
        $query = User::role('customer');

        if (! empty($search)) {
            $query->where('name', 'like', "%{$search}%");
        }

        return $query->get()->map(function (User $user): array {
            return [
                'id' => $user->id,
                'companyName' => $user->name,
                'contactPerson' => $user->contact_person,
                'email' => $user->email,
                'phone' => $user->phone,
                'streetAddress' => $user->street_address,
                'zipCode' => $user->zip_code,
                'city' => $user->city,
                'country' => $user->country,
                'avatar' => $user->avatar,
            ];
        });
    }
}
