import { LoggedInUserAvatar } from "@/components/LoggedInUserAvatar/index";
import { SideBar } from "@/components/Sidebar/index";
import { ConversationProvider } from "@/contexts/ConversationContext";
import { Outlet } from "react-router-dom";

export const Header = () => {
  return (
    <div className="sticky inline-flex top-0 py-2 px-4 bg-primary-foreground justify-end w-full z-10">
      <LoggedInUserAvatar />
    </div>
  );
};

export const Layout = () => {
  return (
    <div className="grid grid-cols-[auto_1fr] h-screen w-full">
      <ConversationProvider>
        <SideBar />
        <Outlet />
      </ConversationProvider>
    </div>
  );
};
