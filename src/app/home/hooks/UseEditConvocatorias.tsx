import { useConvocatoriasStore } from "@/app/shared/convocatorias.store";
import { toast } from "sonner";

export const useEditConvocatorias = () => {
  const {
    patchConvocatorias,
    loading,
    error,
    singleConvocatoria,
    clearSingleConvocatoria,
  } = useConvocatoriasStore();

  const handlePatchConvocatorias = async (id: number, data: any) => {
    try {
      await patchConvocatorias(id, data);
      toast.success(`Convocatoria ${id} actualizada`);
      clearSingleConvocatoria();
    } catch (error) {
      console.error("Error updating convocatoria:", error);
    }
  };

  return {
    handlePatchConvocatorias,
    loading,
    error,
    singleConvocatoria,
  };
};
