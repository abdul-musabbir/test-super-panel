import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { usePermission } from '@/hooks/use-permission';
import { dashboard } from '@/routes';
import bookings from '@/routes/bookings';
import clients from '@/routes/clients';
import recentBooking from '@/routes/recentBooking';
import webhooks from '@/routes/webhooks';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    CalendarIcon,
    CreditCardIcon,
    LinkIcon,
    UsersIcon,
} from 'lucide-react';
import AppLogo from './app-logo';

// const footerNavItems: NavItem[] = [
//     {
//         title: 'Repository',
//         href: 'https://github.com/laravel/react-starter-kit',
//         icon: Folder,
//     },
//     {
//         title: 'Documentation',
//         href: 'https://laravel.com/docs/starter-kits#react',
//         icon: BookOpen,
//     },
// ];

export function AppSidebar() {
    const { isSuperadmin, isCustomer } = usePermission();
    const { impersonating } = usePage().props;

    const mainNavItems: NavItem[] = [
        // {
        //     title: 'Dashboard',
        //     href: dashboard(),
        //     icon: LayoutGrid,
        // },
        ...(isSuperadmin
            ? [
                  {
                      title: 'Clients',
                      href: clients.manage().url,
                      icon: UsersIcon,
                  },
                  {
                      title: 'Subscriptions',
                      href: dashboard(),
                      icon: CreditCardIcon,
                      items: [
                          {
                              title: 'All Subscriptions',
                              url: '/df',
                          },
                          {
                              title: 'Manage Plans',
                              url: '/df',
                          },
                      ],
                  },
                  {
                      title: 'Recent Bookings',
                      href: recentBooking.manage(),
                      icon: CreditCardIcon,
                  },
              ]
            : []),
        ...(isCustomer && impersonating
            ? [
                  {
                      title: 'Webhooks',
                      href: webhooks.manage(),
                      icon: LinkIcon,
                  },
              ]
            : []),
        ...(isCustomer
            ? [
                  {
                      title: 'Pöytävaraus',
                      href: bookings.manage(),
                      icon: CalendarIcon,
                  },
              ]
            : []),
    ].filter(Boolean);

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
