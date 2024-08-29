import { Link } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from "../../components/NavigationMenu";
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
    title: "Sobre o projeto",
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
        <a href="/" className="text-md">
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
            <NavigationMenuItem>
              <Link href="/solution" asChild>
                <NavigationMenuLink>
                  <Button>Get Started Now</Button>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer>
    <div>foooter vem aqui, toma!</div>
  </footer>
);

export const Layout = () => {
  return (
    <div className="w-full grid justify-center">
      <div className="w-[calc(min(1100px,94vw)-2rem)]">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
