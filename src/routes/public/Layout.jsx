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
import { useNavigate } from "react-router-dom";

const links = [
  {
    title: "Início",
    href: "/",
  },
  {
    title: "Fale conosco",
    href: "/contact",
  },
  {
    title: "Sobre o projeto",
    href: "/about-project",
  },
  {
    title: "Entrar",
    href: "/login",
  },
];

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between">
      <a href="/" className="text-md">
        Copilot
      </a>
      <NavigationMenu>
        <NavigationMenuList>
          {links.map(({ href, title }) => (
            <NavigationMenuItem key={href}>
              <Link asChild>
                <button onClick={() => navigate(href)}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {title}
                  </NavigationMenuLink>
                </button>
              </Link>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <Link href="/solution" asChild>
              <NavigationMenuLink>
                <Button onClick={() => navigate("/solution")}>
                  Experimente o Copiloto
                </Button>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="#"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Copiloto
            </span>
          </a>
          <NavigationMenu>
            <NavigationMenuList>
              {links.map(({ href, title }) => (
                <NavigationMenuItem key={href}>
                  <Link asChild>
                    <button onClick={() => navigate(href)}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {title}
                      </NavigationMenuLink>
                    </button>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://flowbite.com/" className="hover:underline">
            Copiloto™
          </a>
          . Todos os direitos reservados.
        </span>
      </div>
    </footer>
  );
};

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
