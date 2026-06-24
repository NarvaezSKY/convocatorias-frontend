import { useState } from "react";
import { toast } from "sonner";
import { IUpdateCaseReq } from "@/core/atencionEspecialJudicial/domain/update-case";
import { useAtencionEspecialJudicialStore } from "@/app/shared/atencionEspecialJudicial.store";

export const useEditCase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { updateCase: updateCaseService, getAllCases } =
    useAtencionEspecialJudicialStore();

  const updateCase = async (id: string, data: IUpdateCaseReq) => {
    try {
      setIsLoading(true);
      setError(null);
      await updateCaseService(id, data);
      toast.success("Caso actualizado correctamente");
      await getAllCases();
    } catch (err: any) {
      console.error("Error al actualizar el caso:", err);
      setError("Error al actualizar el caso");
      toast.error("No se pudo actualizar el caso");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateCase,
    isLoading,
    error,
  };
};
