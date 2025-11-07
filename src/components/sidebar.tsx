import { Link } from "@heroui/link";
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerContent,
  Button,
} from "@heroui/react";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoCashOutline } from "react-icons/io5";
import { FaUserAlt } from "react-icons/fa";
import { PiSignOutBold } from "react-icons/pi";
import { useAuthStore } from "@/app/shared/auth.store";
import { toast } from "sonner";
import { Divider } from "@heroui/react";
import { useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;
  const { logout, role } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada correctamente");
  };
  return (
    <>
      <aside className="hidden md:flex flex-col h-full w-64 bg-test border-r border-gray-200 pt-20 px-4 fixed z-30 pr-4">
        <div className="flex flex-col h-screen justify-between">
          <nav className="flex flex-col gap-2 flex-1">
            <h1 className="font-bold text-lg">Módulos</h1>
            <Link
              className={`font-semibold text-success hover:text-default-800 underline flex justify-start gap-1 transition-all py-2 px-2
    ${currentPath === "/home" ? "bg-success text-white rounded-md hover:text-white" : ""}
  `}
              href="/home"
            >
              <IoCashOutline className="w-5 h-5" />
              Gestión de Proyectos
            </Link>
            <Link
              className={`font-semibold text-success hover:text-default-800 underline flex justify-start gap-1 transition-all py-2 px-2
    ${currentPath === "/users" ? "bg-success text-white rounded-md hover:text-white" : ""}`}
              href="/users"
              isDisabled={role === "investigador" || role === "admin" || role === "aprendiz"}
            >
              <FaUserAlt className="w-4 h-4" />
              Gestión de Usuarios
            </Link>
            <Divider />
            <h1 className="font-bold text-lg">Reportes</h1>
            <Link
              className={`font-semibold text-success hover:text-default-800 underline flex justify-start transition-all py-2 px-2
    ${currentPath === "/reportes/proyectos" ? "bg-success text-white rounded-md hover:text-white" : ""}`}
              href="/reportes/proyectos"
              isDisabled={role === "aprendiz"}
            >
              <HiOutlineDocumentReport className="w-5 h-5" />
              Power BI Proyectos
            </Link>
          </nav>
          <div className="mb-[3rem] flex flex-col gap-2">
            <Divider />
            <Button
              className="w-full h-12"
              color="danger"
              size="sm"
              variant="flat"
              onClick={handleLogout}
            >
              <PiSignOutBold /> Cerrar sesión
            </Button>
          </div>
        </div>
      </aside>

      <Drawer
        className="z-50"
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
      >
        <DrawerContent className="w-64">
          <DrawerHeader className="font-bold">Menú</DrawerHeader>
          <DrawerBody>
            <nav className="flex flex-col gap-2 flex-1">
              <h1 className="font-bold">Módulos</h1>
              <Link
                className="font-semibold text-success hover:text-default-800 underline flex justify-start gap-1 transition-all py-3 px-2"
                href="/home"
                onClick={onClose}
              >
                <IoCashOutline className="w-5 h-5" />
                Gestión de Proyectos
              </Link>
              <Link
                className="font-semibold text-success hover:text-default-800 underline flex justify-start gap-1 transition-all py-3 px-2"
                href="/users"
                isDisabled={role === "investigador" || role === "admin" || role === "aprendiz"}
                onClick={onClose}
              >
                <FaUserAlt className="w-4 h-4" />
                Gestión de Usuarios
              </Link>
              <Divider />
              <h1 className="font-bold">Reportes</h1>
              <Link
                className="font-semibold text-success hover:text-default-800 underline flex justify-between transition-all py-3 px-2"
                href="/reportes/proyectos"
                onClick={onClose}
              >
                <HiOutlineDocumentReport className="w-5 h-5" />
                Reporte Power BI Proyectos
              </Link>
              <Divider />
              <Button
                className="w-full h-12"
                color="danger"
                size="sm"
                variant="flat"
                onClick={handleLogout}
              >
                <PiSignOutBold /> Cerrar sesión
              </Button>
            </nav>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
