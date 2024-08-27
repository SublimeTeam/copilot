import { Link } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../components/NavigationMenu";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/Button";
import { navigationMenuTriggerStyle } from "@/components/NavigationMenu/styles";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

const links = [
  {
    title: "Início",
    href: "/",
  },
  {
    title: "Sobre o Projeto",
    href: "/about-project",
  },
  {
    title: "Avaliação Gratuita",
    href: "/about-project",
  },
];

const Header = () => {
  return (
    <header>
      <div className="flex justify-end items-center gap-4 p-2">
        <a href="/contact" className="text-sm">
          Fale conosco
        </a>
        <p className="text-sm gap-1 inline-flex">português (Brasil)</p>
      </div>
      <Separator />
      <div className="flex items-center justify-between">
        <a href="/contact" className="text-md">
          Copilot
        </a>
        <NavigationMenu>
          <NavigationMenuList>
            {links.map(({ href, title }) => (
              <NavigationMenuItem key={href}>
                <Link href={href} asChild>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
          <Button>Entrar</Button>
        </NavigationMenu>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer>
    This is the <div>footer</div>
  </footer>
);

export const Layout = () => {
  return (
    <ScrollArea>
      <div className="w-[calc(min(1280px,90vw)-2rem)] max-h-[100dvh] mx-auto">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ScrollArea>
  );
};
