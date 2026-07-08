import { Link, useLocation } from "react-router-dom";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { IconDashboard, IconClipboardList, IconBuildingStore, IconReport } from "@tabler/icons-react"
const MenuItems =
    [
        {
            title: "Order Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
        },
        {
            title: "Menu",
            url: "/menu",
            icon: IconClipboardList,
        },
        {
            title: "Store Information",
            url: "/stores",
            icon: IconBuildingStore,
        },
        {
            title: "Reports",
            url: "/",
            icon: IconReport,
        },

    ]

export function AppSidebar() {
    const location = useLocation();
    return (
        <Sidebar collapsible="icon" >
            <SidebarHeader>
                <div
                    className="flex flex-1 items-center sm:items-stretch sm:justify-start">
                    <a className="full-logo block lg:hidden mx-2 md:mx-4" href="/">
                        <img
                            alt="ROS"
                            title="ROS"
                            loading="eager"
                            width={36}
                            height={36}
                            decoding="async"
                            data-nimg={1}
                            className="mx-auto w-[30px] h-[30px] lg:h-[35px] lg:w-[35px]"
                            src="/img/logo.svg"
                            style={{ color: "transparent" }}
                        />
                    </a>
                    <div className="hidden sm:ml-6 sm:block">
                        <div className="flex space-x-4" />
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {MenuItems.map((item) => {
                                const isActive = location.pathname === item.url;
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                                            <Link to={item.url} className="flex items-center gap-3">
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter />
        </Sidebar>
    )
}