import DefaultLayout from "@/layouts/default";
import ConvocatoriasTable from "./components/ConvocatoriasTable";
import ReusableModal from "../shared/components/Modal";
import { useEffect, useState } from "react";
import { UploadConvocatoriaForm } from "./components/UploadConvocatoriaForm";
import { useAuthStore } from "../shared/auth.store";
import { Button } from "@heroui/button";
import { ISearchConvocatoriasReq } from "@/core/convocatorias/domain/search-convocatorias";
import { FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Filtros from "./components/Filters";
import { useConvocatorias } from "./hooks/UseConvocatorias";
import { MdFileUpload } from "react-icons/md";
import { toast } from "sonner";
import { Divider, Tooltip } from "@heroui/react";

export const Home = () => {
  const [filtros, setFiltros] = useState<ISearchConvocatoriasReq>({});
  const [isOpen, setIsOpen] = useState(false);

  const { role, user } = useAuthStore();
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const { handleSearch } = useConvocatorias();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const filtrosLimpios = Object.fromEntries(
        Object.entries(filtros).filter(([_, v]) => v?.toString().trim() !== "")
      );

      handleSearch(filtrosLimpios);
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [filtros]);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4 bg-test p-4 rounded-lg shadow-md w-full border-2 border-success-100 mt-6 overflow-x-auto">

        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2">
            <h1 className="text-4xl font-extrabold text-success">
              Proyectos
            </h1>
            <Tooltip content="Buscar proyectos">
              <Button
                isIconOnly
                className="mb-2 mt-1"
                color="primary"
                radius="full"
                size="md"
                variant="flat"
                onClick={() => setMostrarFiltros((prev) => !prev)}
              >
                {mostrarFiltros ? <IoMdCloseCircle /> : <FaSearch />}
              </Button>
            </Tooltip>
          </div>
          {(role === "superadmin" ||
            role === "dinamizador" ||
            role === "Linvestigador") && (
              <div className="flex flex-col gap-2">
                <Button
                  color="success"
                  size="md"
                  variant="flat"
                  onClick={() => setIsOpen(true)}
                >
                  <MdFileUpload /> Subir Proyecto
                </Button>
              </div>
            )}
          {role === "investigador" && (
            <div className="flex flex-col gap-2">
              <Button
                color="success"
                size="md"
                variant="flat"
                onClick={() => setIsOpen(true)}
              >
                <MdFileUpload /> Subir Proyecto
              </Button>
            </div>
          )}
        </div>

        {mostrarFiltros && (
          <>
            <Divider />
            <Filtros
              showDownload
              filtros={filtros}
              onChange={(nuevoFiltro: Partial<ISearchConvocatoriasReq>) =>
                setFiltros((prev) => ({ ...prev, ...nuevoFiltro }))
              }
              onReset={() => {
                toast.success("Filtros reseteados"), setFiltros({});
              }}
            />
          </>
        )}

        <Divider />
        <ConvocatoriasTable />
        <ReusableModal
          isOpen={isOpen}
          size="xl"
          modalTitle="Subir proyecto"
          onClose={() => setIsOpen(false)}
          onSubmit={() => setIsOpen(false)}
        >
          {user ? (
            <UploadConvocatoriaForm
              method="upload"
              userId={user.userId}
              onClose={() => setIsOpen(false)}
            />
          ) : (
            <p>Usuario no autenticado, por favor inicie sesión.</p>
          )}
        </ReusableModal>
      </div>
    </DefaultLayout>
  );
};
