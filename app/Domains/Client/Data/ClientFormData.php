<?php

declare(strict_types=1);

namespace Domains\Client\Data;

use Spatie\LaravelData\Data;

class ClientFormData extends Data
{
    public function __construct(
        public readonly string $companyName,
        public readonly string $contactPerson,
        public readonly string $email,
        public readonly ?string $phone,
        public readonly ?string $password,
        public readonly ?string $password_confirmation,
        public readonly ?string $city,
        public readonly ?string $country,
        public readonly ?string $streetAddress,
        public readonly ?string $zipCode,
    ) {}
}
