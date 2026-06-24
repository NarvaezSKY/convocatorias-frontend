import DefaultLayout from "@/layouts/default";
import CasesTable from "./components/CasesTable";
import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { FaSearch } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import { MdFileUpload } from "react-icons/md";
import { Divider, Input } from "@heroui/react";
import { useAtencionEspecialJudicial } from "./hooks/useAtencionEspecialJudicial";
import { IFilterCasesReq } from "@/core/atencionEspecialJudicial/domain/filter-cases";
import { useAuthStore } from "../shared/auth.store";
import ReusableModal from "../shared/components/Modal";
import { CreateCaseForm } from "./components/CreateCaseForm";

export const AtencionEspecialJudicial = () => {
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filtros, setFiltros] = useState<IFilterCasesReq>({});
  const { handleSearch } = useAtencionEspecialJudicial();
  const { role } = useAuthStore();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const filtrosLimpios = Object.fromEntries(
        Object.entries(filtros).filter(([_, v]) => v?.toString().trim() !== "")
      );
      handleSearch(filtrosLimpios as IFilterCasesReq);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [filtros]);

  const handleFilterChange = (key: keyof IFilterCasesReq, value: string) => {
    setFiltros((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-4 bg-test p-4 rounded-lg shadow-md w-full border-2 border-success-100 mt-6 overflow-x-auto">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2">
            <h1 className="text-4xl font-extrabold text-success">
              Atención Especial - Judicial
            </h1>
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
          </div>
          {(role === "superadmin" || role === "coordinador") && (
            <Button
              color="success"
              size="md"
              variant="flat"
              onClick={() => setIsOpen(true)}
            >
              <MdFileUpload /> Crear Caso
            </Button>
          )}
        </div>

        {mostrarFiltros && (
          <>
            <Divider />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Caso / Sentencia"
                placeholder="Buscar por caso o sentencia..."
                value={filtros.caso_o_sentencia || ""}
                onChange={(e) => handleFilterChange("caso_o_sentencia", e.target.value)}
              />
              <Input
                label="Municipio"
                placeholder="Buscar por municipio..."
                value={filtros.municipio || ""}
                onChange={(e) => handleFilterChange("municipio", e.target.value)}
              />
              <Input
                label="Estado"
                placeholder="Estado del caso..."
                value={filtros.case_estado || ""}
                onChange={(e) => handleFilterChange("case_estado", e.target.value)}
              />
            </div>
          </>
        )}

        <Divider />
        <CasesTable />

        <ReusableModal
          isOpen={isOpen}
          modalTitle="Crear caso"
          size="2xl"
          onClose={() => setIsOpen(false)}
          onSubmit={() => setIsOpen(false)}
        >
          <CreateCaseForm onClose={() => setIsOpen(false)} />
        </ReusableModal>
      </div>
    </DefaultLayout>
  );
};
