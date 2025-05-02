import { useState } from "react";
import { toast } from "sonner";
import { IUploadConvocatoriaReq } from "../../../core/convocatorias/domain/upload-convocatorias/upload-convocatoria.req";
import { useConvocatoriasStore } from "@/app/shared/convocatorias.store";

export const useUploadConvocatoria = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { uploadConvocatoria: uploadConvocatoriaService, getAllConvocatorias } =
    useConvocatoriasStore();

  const uploadConvocatoria = async (data: IUploadConvocatoriaReq) => {
    try {
      setIsLoading(true);
      setError(null);
      await uploadConvocatoriaService(data);
      toast.success("Convocatoria subida correctamente");
      await getAllConvocatorias();
    } catch (err: any) {
      console.error("Error al subir la convocatoria:", err);
      setError("Error al subir la convocatoria");
      toast.error("No se pudo subir la convocatoria");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    uploadConvocatoria,
    isLoading,
    error,
  };
};
