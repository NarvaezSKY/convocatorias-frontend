import { Link } from "@heroui/link";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  // NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Chip } from "@heroui/chip";
import clsx from "clsx";
import { toast } from "sonner";
import { link as linkStyles } from "@heroui/theme";
import { siteConfig } from "../config/site";
import { ThemeSwitch } from "./theme-switch";

import { useAuthStore } from "@/app/shared/auth.store";
import { FaUserAlt } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";

import { Button } from "@heroui/button";

import SENAIcon from "../../favicon_io/logoSena.png";

export const Navbar = () => {
  const { user, logout, role } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada correctamente");
  };
  const isAuthenticated = !!user;

  return (
    <HeroUINavbar
      className="border-b border-gray-200 bg-default-100 fixed top-0 z-50 w-full"
      maxWidth="xl"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/home"
          >
            {/* <Logo /> */}
            <img
              alt="SENA Logo"
              className="w-8 h-8 m-2 rounded-full"
              src={SENAIcon}
            />
            <p className="font-bold leading-none">
              Innovación y<br />
              Competitividad
            </p>
          </Link>
        </NavbarBrand>
        <NavbarItem className="ml-6  hidden lg:flex">
          <div className="hidden lg:flex gap-4 justify-start ml-2 w-full">
            {isAuthenticated && (
              <div className="flex items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                  <FaUserAlt />{" "}
                  <p>
                    <strong>{user?.username}</strong>
                  </p>
                </div>
                <div>
                  <Chip
                    className="text-xs"
                    color="warning"
                    size="sm"
                    variant="bordered"
                  >
                    {role === "admin"
                      ? "Supervisor"
                      : role === "superadmin"
                        ? "Super Administrador"
                        : role === "dinamizador"
                          ? "Dinamizador"
                          : role === "Linvestigador"
                            ? "Lider Investigador"
                            : role === "investigador"
                              ? "Investigador"
                              : "Investigador"}
                  </Chip>
                </div>
              </div>
            )}
          </div>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          {!isAuthenticated &&
            siteConfig.navItems.map((item, index) => (
              <Link
                key={index}
                className={clsx(linkStyles({ color: "foreground" }))}
                href={item.href}
              >
                {item.label}
              </Link>
            ))}

          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {/* <NavbarMenuToggle /> */}
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
              <Button
                className="w-full"
                color="danger"
                size="lg"
                variant="flat"
                onClick={handleLogout}
              >
                <PiSignOutBold /> Cerrar sesión
              </Button>
            </NavbarMenuItem>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
