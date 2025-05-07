import DefaultLayout from "@/layouts/default";
import ConvocatoriasTable from "./components/ConvocatoriasTable";
import ReusableModal from "../shared/components/Modal";
import React from "react";
import { UploadConvocatoriaForm } from "./components/UploadConvocatoriaForm";
import { useAuthStore } from "../shared/auth.store";
import { Button } from "@heroui/button";

export const Home = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { role, user } = useAuthStore();
  return (
    <DefaultLayout>
      <div className="flex items-center justify-center flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-3xl font-bold">Convocatorias</h1>
          {role && role === "superadmin" && (
            <Button
              color="primary"
              size="md"
              variant="bordered"
              onClick={() => setIsOpen(true)}
              className="w-full max-w-xs"
            >
              Subir Convocatoria
            </Button>
          )}
        </div>
        <ConvocatoriasTable />
        <ReusableModal
          isOpen={isOpen}
          modalTitle="Subir Convocatoria"
          onClose={() => setIsOpen(false)}
          onSubmit={() => { }}
        >
          { user ? (
            <UploadConvocatoriaForm userId={user.userid} />
          ) : (
            <p>Usuario no autenticado, por favor inicie sesión.</p>
          )}
        </ReusableModal>
      </div>
    </DefaultLayout>
  );
};
