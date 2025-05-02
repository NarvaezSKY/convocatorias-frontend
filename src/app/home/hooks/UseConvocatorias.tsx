// hooks/useConvocatorias.ts
import { useEffect } from "react";
import { useInfiniteScroll } from "@heroui/use-infinite-scroll";
import { useConvocatoriasStore } from "../../shared/convocatorias.store";

export const useConvocatorias = () => {
  const { convocatorias, getAllConvocatorias, loading } = useConvocatoriasStore();

  // Cargar convocatorias al montar
  useEffect(() => {
    getAllConvocatorias();
  }, [getAllConvocatorias]);

  const [loaderRef, scrollerRef] = useInfiniteScroll({
    hasMore: false,
    onLoadMore: () => {}, // no hay paginación
  });

  return { convocatorias, loading, loaderRef, scrollerRef };
};
