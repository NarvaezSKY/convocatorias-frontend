// import { useEffect } from "react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { useConvocatoriasStore } from "../../shared/convocatorias.store";
import { toast } from "sonner";
import { ISearchConvocatoriasReq } from "@/core/convocatorias/domain/search-convocatorias";

export const useConvocatorias = () => {
  const {
    convocatorias,
    getAllConvocatorias,
    loading,
    deleteConvocatorias,
    searchConvocatorias,
    downloadReport,
  } = useConvocatoriasStore();

  // useEffect(() => {
  //   getAllConvocatorias();
  // }, [getAllConvocatorias]);

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore: false,
    onLoadMore: () => {},
  });

  const handleDelete = (id: string) => {
    deleteConvocatorias(id)
      .then(() => {
        getAllConvocatorias();
        toast.success("Convocatoria eliminada");
      })
      .catch((error) => {
        console.error("Error deleting convocatoria:", error);
      });
  };

  const handleSearch = (searchParams: ISearchConvocatoriasReq) => {
    const filtrosLimpios = Object.fromEntries(
      Object.entries(searchParams).filter(
        ([_, v]) => v?.toString().trim() !== ""
      )
    );
    if (Object.keys(filtrosLimpios).length > 0) {
      searchConvocatorias(filtrosLimpios);
    } else {
      getAllConvocatorias();
    }
  };

  const generarReporte = async (filtros: ISearchConvocatoriasReq) => {
    const filtrosLimpios = Object.fromEntries(
      Object.entries(filtros).filter(([_, v]) => v?.toString().trim() !== "")
    );

    try {
      await downloadReport({ ...filtrosLimpios, report: "true" } as ISearchConvocatoriasReq);
      toast.success("Reporte generado correctamente");
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al generar el reporte.");
    }
  };

  return {
    convocatorias,
    loading,
    loaderRef,
    scrollerRef,
    handleDelete,
    handleSearch,
    generarReporte,
  };
};
