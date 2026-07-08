import { Navigate, Outlet } from 'react-router-dom';
import Header from './common/header';
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import RDIcons from './icons';
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from './common/app-sidebar';
import { TooltipProvider } from './ui/tooltip';


const DashboardLayout = () => {
    const { userCred } = useContext(AuthContext)
    if (!userCred)
        return <Navigate to="/" replace ></Navigate>
    return (
        <>
            <TooltipProvider delayDuration={0}>
                <SidebarProvider >
                    <AppSidebar variant="inset" />
                    <SidebarInset>
                        <Header />
                        <div className="dashboard-layout px-4 pt-4">
                            <Outlet />
                        </div>
                    </SidebarInset>
                    <RDIcons />
                </SidebarProvider>
            </TooltipProvider>
        </>
    );
};

export default DashboardLayout;