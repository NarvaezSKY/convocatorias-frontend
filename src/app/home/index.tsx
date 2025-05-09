import DefaultLayout from "@/layouts/default";
import ConvocatoriasTable from "./components/ConvocatoriasTable";
import ReusableModal from "../shared/components/Modal";
import React, { useEffect, useState } from "react";
import { UploadConvocatoriaForm } from "./components/UploadConvocatoriaForm";
import { useAuthStore } from "../shared/auth.store";
import { Button } from "@heroui/button";
import { ISearchConvocatoriasReq } from "@/core/convocatorias/domain/search-convocatorias";
import { FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import Filtros from "./components/Filters";
import { useConvocatorias } from "./hooks/UseConvocatorias";
import { MdFileUpload } from "react-icons/md";

export const Home = () => {
  const [filtros, setFiltros] = useState<ISearchConvocatoriasReq>({});
  const [isOpen, setIsOpen] = React.useState(false);
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
      <div className="flex items-center justify-center flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2">
            <h1 className="text-3xl font-bold">Seguimiento Innovación Y Competitividad</h1>
            <Button
              isIconOnly
              className="mb-4"
              color="primary"
              radius="full"
              size="md"
              variant="bordered"
              onClick={() => setMostrarFiltros((prev) => !prev)}
            >
              {mostrarFiltros ? <IoMdCloseCircle /> : <FaSearch />}
            </Button>

          </div>
          {role && role === "superadmin" && (
            <Button
              className="w-full max-w-xs"
              color="primary"
              size="md"
              variant="bordered"
              onClick={() => setIsOpen(true)}
            >
              <MdFileUpload /> Subir Convocatoria
            </Button>
          )}
        </div>
        {mostrarFiltros && (
              <Filtros
                filtros={filtros}
                onChange={(nuevoFiltro: Partial<ISearchConvocatoriasReq>) =>
                  setFiltros((prev) => ({ ...prev, ...nuevoFiltro }))
                }
                onReset={() => setFiltros({})}
              />
            )}
        <ConvocatoriasTable />
        <ReusableModal
          isOpen={isOpen}
          modalTitle="Subir Convocatoria"
          onClose={() => setIsOpen(false)}
          onSubmit={() => {}}
        >
          {user ? (
            <UploadConvocatoriaForm userId={user.userid} />
          ) : (
            <p>Usuario no autenticado, por favor inicie sesión.</p>
          )}
        </ReusableModal>
      </div>
    </DefaultLayout>
  );
};
