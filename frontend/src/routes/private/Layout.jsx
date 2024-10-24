import { LoggedInUserAvatar } from "@/components/LoggedInUserAvatar/index";
import { AppSidebar } from "@/components/Sidebar/index";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ConversationProvider } from "@/contexts/ConversationContext";
import { Outlet } from "react-router-dom";

export const Header = () => {
  return (
    <div className="sticky inline-flex top-0 py-2 px-4 bg-primary-foreground justify-between w-full z-10">
      <SidebarTrigger />
      <LoggedInUserAvatar />
    </div>
  );
};

export const Layout = () => {
  return (
    <SidebarProvider>
      <div className="grid grid-cols-[auto_1fr] h-screen w-full">
        <ConversationProvider>
          <AppSidebar />

          <div className="flex w-full justify-center bg-background flex-col max-h-screen">
            <Header />
            <Outlet />
          </div>
        </ConversationProvider>
      </div>
    </SidebarProvider>
  );
};
