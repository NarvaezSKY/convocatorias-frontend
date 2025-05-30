import { usePlanFinancieroStore } from "@/app/shared/planFinanciero.store";
import { IGetPlanFinancieroByIdRes } from "@/core/planFinanciero/domain/get-by-id";
import { IUploadPlanFinancieroReq } from "@/core/planFinanciero/domain/upload";
import { toast } from "sonner";

export const UsePlanFinanciero = () => {
  const {
    createPlanFinanciero,
    getSinglePlanFinanciero,
    updatePlanFinanciero,
    planFinanciero,
    loading,
  } = usePlanFinancieroStore();

  const handleCreatePlanFinanciero = async (data: IUploadPlanFinancieroReq) => {
    try {
      await createPlanFinanciero(data);
      toast.success("Plan financiero creado correctamente");
    } catch (error) {
      console.error("Error creating plan financiero:", error);
      toast.error("Ocurrió un error al guardar el plan financiero");
    }
  };

  const handleUpdatePlanFinanciero = async (
    id: string,
    data: IUploadPlanFinancieroReq
  ) => {
    try {
      await updatePlanFinanciero(id, data);
      toast.success("Plan financiero actualizado correctamente");
    } catch (error) {
      console.error("Error updating plan financiero:", error);
      toast.error("Ocurrido un error al actualizar el plan financiero");
    }
  };

  const handleGetPlanFinanciero = async (id: string) => {
    try {
      const planFinanciero = await getSinglePlanFinanciero(id);
      return planFinanciero;
    } catch (error) {
      console.error("Error fetching plan financiero:", error);
      toast.error("Esta convocatoria no tiene plan financiero");
    }
  };

  const formatPlanFinancieroForInitialValues = (
    data: IGetPlanFinancieroByIdRes
  ) => {
    const rows = data.structure.rows;
    const columns = data.structure.columns;
    const gridData = data.data;

    return {
      rows,
      columns,
      gridData,
    };
  };

  return {
    handleCreatePlanFinanciero,
    handleUpdatePlanFinanciero,
    handleGetPlanFinanciero,
    formatPlanFinancieroForInitialValues,
    planFinanciero,
    loading,
  };
};
