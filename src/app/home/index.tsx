import DefaultLayout from "@/layouts/default";
import ConvocatoriasTable from "./components/ConvocatoriasTable";
import ReusableModal from "../shared/components/Modal";
import React from "react";
import { UploadConvocatoriaForm } from "./components/UploadConvocatoriaForm";
import { useAuthStore } from "../shared/auth.store";

export const Home = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { user } = useAuthStore();
  return (
    <DefaultLayout>
      <div className="flex items-center justify-center flex-col gap-4">
        <h1 className="text-3xl font-bold">Convocatorias</h1>
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
        <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
          Subir Convocatoria
        </button>
      </div>
    </DefaultLayout>
  );
};
