import { useAtencionEspecialJudicialStore } from "@/app/shared/atencionEspecialJudicial.store";
import { IFilterCasesReq } from "@/core/atencionEspecialJudicial/domain/filter-cases";

export const useAtencionEspecialJudicial = () => {
  const {
    cases,
    singleCase,
    loading,
    getAllCases,
    getCaseById,
    createCase,
    updateCase,
    filterCases,
    deleteCase,
    clearSingleCase,
  } = useAtencionEspecialJudicialStore();

  const handleSearch = (data: IFilterCasesReq) => {
    const filtrosLimpios = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v?.toString().trim() !== "")
    );
    if (Object.keys(filtrosLimpios).length > 0) {
      filterCases(filtrosLimpios as IFilterCasesReq);
    } else {
      getAllCases();
    }
  };

  const handleDelete = async (id: string) => {
    await deleteCase(id);
    await getAllCases();
  };

  return {
    cases,
    singleCase,
    loading,
    handleSearch,
    handleDelete,
    getCaseById,
    createCase,
    updateCase,
    clearSingleCase,
  };
};
