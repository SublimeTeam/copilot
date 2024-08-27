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

export const Layout = () => {
  return (
    <div className="layout">
      <header className="text-end">
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
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
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
      <Outlet />
    </div>
  );
};
