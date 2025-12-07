import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { resolveUrl } from '@/lib/utils';
import { NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronRight } from 'lucide-react';

interface SubItemType {
    title: string;
    url: string;
}

interface NavMainProps {
    items: (NavItem & { items?: SubItemType[] })[];
}

export function NavMain({ items }: NavMainProps) {
    const { url } = usePage();

    // Check if current URL matches the item URL
    const isActiveUrl = (itemUrl: string) => {
        return url.startsWith(itemUrl);
    };

    // Check if any sub-item is active
    const hasActiveSubItem = (subItems?: SubItemType[]) => {
        if (!subItems) return false;
        return subItems.some((subItem) => url.startsWith(subItem.url));
    };

    return (
        <SidebarGroup>
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isParentActive = url.startsWith(
                        resolveUrl(item.href),
                    );
                    const hasActiveChild = hasActiveSubItem(item.items);
                    const shouldBeOpen = isParentActive || hasActiveChild;

                    // If no sub-items, render as simple link
                    if (!item.items || item.items.length === 0) {
                        return (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={isParentActive}
                                    tooltip={{ children: item.title }}
                                >
                                    <Link href={item.href} prefetch>
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        );
                    }

                    // Render collapsible menu with sub-items
                    return (
                        <Collapsible
                            key={item.title}
                            asChild
                            defaultOpen={shouldBeOpen}
                            className="group/collapsible"
                        >
                            <SidebarMenuItem>
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        isActive={
                                            isParentActive || hasActiveChild
                                        }
                                        tooltip={item.title}
                                    >
                                        {item.icon && <item.icon />}
                                        <span>{item.title}</span>
                                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items.map((subItem) => {
                                            const isSubItemActive = isActiveUrl(
                                                subItem.url,
                                            );
                                            return (
                                                <SidebarMenuSubItem
                                                    key={subItem.title}
                                                >
                                                    <SidebarMenuSubButton
                                                        asChild
                                                        isActive={
                                                            isSubItemActive
                                                        }
                                                    >
                                                        <Link
                                                            href={subItem.url}
                                                        >
                                                            <span>
                                                                {subItem.title}
                                                            </span>
                                                        </Link>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            );
                                        })}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </SidebarMenuItem>
                        </Collapsible>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
