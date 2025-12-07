import ImpersonateController from '@/actions/Lab404/Impersonate/Controllers/ImpersonateController';
import DeleteItemDialog from '@/components/delete-item-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useInitials } from '@/hooks/use-initials';
import { destroy } from '@/routes/clients';
import { Link } from '@inertiajs/react';
import {
    ArrowRightToLineIcon,
    CreditCardIcon,
    MailIcon,
    MapPinIcon,
    TrashIcon,
    UsersIcon,
} from 'lucide-react';
import EditClientDialog from './edit-client-dialog';

export const ClientCard = ({ client }) => {
    const getInitials = useInitials();
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>
                    <Avatar className="size-14">
                        <AvatarImage
                            alt={client.companyName}
                            src={client.avatar}
                        />
                        <AvatarFallback>
                            {getInitials(client.companyName)}
                        </AvatarFallback>
                    </Avatar>
                </CardTitle>
                <CardDescription className="space-y-2">
                    <h2 className="text-lg font-semibold text-black dark:text-white">
                        {client.companyName}
                    </h2>
                    <p className="inline-flex items-center gap-2">
                        <UsersIcon className="size-4" />{' '}
                        <span>{client.contactPerson}</span>
                    </p>
                    <div className="space-x-2">
                        <Badge className="gap-1.5">
                            <span
                                aria-hidden="true"
                                className="size-1.5 rounded-full bg-emerald-500"
                            />
                            Active
                        </Badge>

                        <Badge variant={'secondary'}>Inactive</Badge>
                    </div>
                </CardDescription>
                <CardAction>
                    <Button variant="ghost" size={'icon'}>
                        <CreditCardIcon />
                    </Button>

                    <EditClientDialog client={client} />

                    <DeleteItemDialog
                        button={
                            <Button variant="ghost" size={'icon'}>
                                <TrashIcon />
                            </Button>
                        }
                        action={destroy.form(client)}
                    />
                </CardAction>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-gray-500">
                            <MapPinIcon className="size-4" />
                            <span className="text-sm">
                                {client?.streetAddress}
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-500">
                            <MailIcon className="size-4" />
                            <span className="text-sm">{client.email}</span>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" asChild>
                    <Link href={ImpersonateController.take(client)}>
                        <ArrowRightToLineIcon /> Login as Client
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
};
