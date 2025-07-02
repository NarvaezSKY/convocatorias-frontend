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
import { Chip } from "@heroui/chip";
import clsx from "clsx";
import { toast } from "sonner";
import { link as linkStyles } from "@heroui/theme";
import { siteConfig } from "../config/site";
import { ThemeSwitch } from "./theme-switch";
// import { Logo } from "./icons";
import { useAuthStore } from "@/app/shared/auth.store";
import { FaUserAlt } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoCashOutline } from "react-icons/io5";
import { Button } from "@heroui/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/dropdown";
import SENAIcon from "../../favicon_io/logoSena.png";

export const Navbar = () => {
  const { user, logout, role } = useAuthStore();

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
                    Bienvenido,{" "}
                    <strong className="text-success">{user?.username}</strong>
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
        {isAuthenticated && (
          <div className="flex items-center gap-2">
            <NavbarItem className="hidden sm:flex">
              <Dropdown>
                <DropdownTrigger>
                  <Link
                    className="flex items-center gap-2 underline cursor-pointer"
                    color="success"
                    size="md"
                  >
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
                    <IoCashOutline className="inline-block mr-2" />
                    Proyectos
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>

            <NavbarItem className="hidden sm:flex">
              <Dropdown>
                <DropdownTrigger>
                  <Link
                    className="flex items-center gap-2 underline cursor-pointer"
                    color="success"
                    size="md"
                  >
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
                    <HiOutlineDocumentReport className="inline-block mr-2" />
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
                variant="flat"
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
