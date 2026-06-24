import { useState } from "react";
import { toast } from "sonner";
import { ICreateCaseReq } from "@/core/atencionEspecialJudicial/domain/create-case";
import { useAtencionEspecialJudicialStore } from "@/app/shared/atencionEspecialJudicial.store";

export const useCreateCase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { createCase: createCaseService, getAllCases } =
    useAtencionEspecialJudicialStore();

  const createCase = async (data: ICreateCaseReq) => {
    try {
      setIsLoading(true);
      setError(null);
      await createCaseService(data);
      toast.success("Caso creado correctamente");
      await getAllCases();
    } catch (err: any) {
      console.error("Error al crear el caso:", err);
      setError("Error al crear el caso");
      toast.error("No se pudo crear el caso");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createCase,
    isLoading,
    error,
  };
};
