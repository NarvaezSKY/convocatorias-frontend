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
import { Logo } from "./icons";
import { useAuthStore } from "@/app/shared/auth.store";
import { FaUserAlt } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";

export const Navbar = () => {
  const { user, logout } = useAuthStore();

  const isAuthenticated = !!user;

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada correctamente");
  };

  return (
    <HeroUINavbar
      className="border-b border-neutral-400"
      isBlurred={true}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/home"
          >
            <Logo />
            <p className="font-bold text-inherit">Convocatorias</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {isAuthenticated && (
            <div className="flex items-center gap-2">
              <FaUserAlt /> <p>Bienvenido, {user?.username}</p>
            </div>
          )}
        </div>
        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <NavbarItem className="hidden sm:flex">
              <Dropdown>
                <DropdownTrigger>
                  <Link className="flex items-center gap-2 underline cursor-pointer" size="md">
                    Módulos
                  </Link>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="ACME features"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  <DropdownItem
                    key="autoscaling"
                    description="Ver los proyectos a través de las convocatorias con sus respectivos planes de desarrollo"
                    href="/home"
                  >
                    Proyectos
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>

            <NavbarItem className="hidden sm:flex">
              <Dropdown>
                <DropdownTrigger>
                  <Link className="flex items-center gap-2 underline cursor-pointer" size="md">
                    Reportes
                  </Link>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="ACME features"
                  itemClasses={{
                    base: "gap-4",
                  }}
                >
                  <DropdownItem
                    key="autoscaling"
                    description="Ver el reporte en Power BI de los proyectos"
                    href="/reportes/proyectos"
                  >
                    Reporte de Proyectos (Power BI)
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </div>
        )}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
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
              <Button
                className="w-full"
                color="danger"
                size="sm"
                variant="bordered"
                onClick={handleLogout}
              >
                <PiSignOutBold /> Cerrar sesión
              </Button>
            </div>
          )}
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
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
              <Button
                className="w-full"
                color="danger"
                size="lg"
                variant="bordered"
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
