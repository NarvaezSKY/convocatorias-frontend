import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import clsx from "clsx";
import { toast } from "sonner";
import { link as linkStyles } from "@heroui/theme";
import { siteConfig } from "../config/site";
import { ThemeSwitch } from "./theme-switch";
import { TwitterIcon, GithubIcon, DiscordIcon } from "./icons";
import { Logo } from "./icons";
import { useAuthStore } from "@/app/shared/auth.store";
import { FaUserAlt } from "react-icons/fa";

export const Navbar = () => {
  const { user, logout } = useAuthStore();

  const isAuthenticated = !!user;

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada correctamente");
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">Convocatorias</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {!isAuthenticated ? (
            siteConfig.navItems.map((item, index) => (
              <Link
                key={index}
                className={clsx(linkStyles({ color: "foreground" }))}
                href={item.href}
              >
                {item.label}
              </Link>
            ))
          ) : (
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <FaUserAlt /> <p>Bienvenido, {user?.username}</p>
              </div>

              <Link
                className={clsx(
                  linkStyles({ color: "danger" }),
                  "cursor-pointer"
                )}
                onClick={handleLogout}
              >
                Cerrar sesión
              </Link>
            </div>
          )}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} title="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <Link isExternal href={siteConfig.links.github}>
          <GithubIcon className="text-default-500" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {!isAuthenticated ? (
            siteConfig.navMenuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                        ? "danger"
                        : "foreground"
                  }
                  href={item.href}
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))
          ) : (
            <NavbarMenuItem>
              <button
                className="text-danger text-lg text-left w-full"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
