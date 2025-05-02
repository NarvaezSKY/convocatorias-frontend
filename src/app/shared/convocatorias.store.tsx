import { create } from "zustand";
import { convocatoriasRepository } from "../../core/convocatorias/infrastructure/convocatorias.repository";
import { IGetAllConvocatoriasRes } from "@/core/convocatorias/domain/get-all-convocatorias";
import { IUploadConvocatoriaReq } from "../../core/convocatorias/domain/upload-convocatorias";
import { ISearchConvocatoriasReq } from "../../core/convocatorias/domain/search-convocatorias";
import {
  searchConvocatoriasUseCase,
  getAllConvocatoriasUseCase,
  uploadConvocatoriasUseCase,
} from "@/core/convocatorias/application";

type State = {
  convocatorias: IGetAllConvocatoriasRes[];
  loading: boolean;
  error: string | null;
};

type Actions = {
  getAllConvocatorias: () => Promise<IGetAllConvocatoriasRes[]>;
  uploadConvocatoria: (data: IUploadConvocatoriaReq) => Promise<void>;
  searchConvocatorias: (data: ISearchConvocatoriasReq) => Promise<void>;
};

type Store = State & Actions;

export const useConvocatoriasStore = create<Store>((set) => ({
  convocatorias: [],
  loading: false,
  error: null,
  getAllConvocatorias: async () => {
    set({ loading: true, error: null });
    try {
      const convocatorias = await getAllConvocatoriasUseCase(
        convocatoriasRepository
      )();
      set({ convocatorias, error: null, loading: false });
      return convocatorias;
    } catch (error) {
      console.error("Error fetching convocatorias:", error);
      set({ error: "Error fetching convocatorias", loading: false });
      throw error;
    } finally {
      set({ loading: false });
    }   
  },

  uploadConvocatoria: async (data) => {
    set({ loading: true, error: null });
    try {
      await uploadConvocatoriasUseCase(convocatoriasRepository)(data);
    } catch (error) {
      console.error("Error uploading convocatoria:", error);
      set({ error: "Error uploading convocatoria" });
    } finally {
      set({ loading: false });
    }
  },

  searchConvocatorias: async (data) => {
    set({ loading: true, error: null });
    try {
      const convocatorias = await searchConvocatoriasUseCase(
        convocatoriasRepository
      )(data);
      set({ convocatorias });
    } catch (error) {
      console.error("Error searching convocatorias:", error);
      set({ error: "Error searching convocatorias" });
    } finally {
      set({ loading: false });
    }
  },
}));
