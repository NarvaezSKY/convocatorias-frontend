import { create } from "zustand";
import { convocatoriasRepository } from "../../core/convocatorias/infrastructure/convocatorias.repository";
import { IGetAllConvocatoriasRes } from "@/core/convocatorias/domain/get-all-convocatorias";
import { IUploadConvocatoriaReq } from "../../core/convocatorias/domain/upload-convocatorias";
import { ISearchConvocatoriasReq } from "../../core/convocatorias/domain/search-convocatorias";
import { IPatchConvocatoriasReq } from "@/core/convocatorias/domain/patch-convocatorias";
import {
  searchConvocatoriasUseCase,
  getAllConvocatoriasUseCase,
  uploadConvocatoriasUseCase,
  getSingleConvocatoriaUseCase,
  deleteConvocatoriasUseCase,
  patchConvocatoriasUseCase,
} from "@/core/convocatorias/application";

type State = {
  convocatorias: IGetAllConvocatoriasRes[];
  singleConvocatoria: IGetAllConvocatoriasRes | null;
  loading: boolean;
  error: string | null;
};

type Actions = {
  getAllConvocatorias: () => Promise<IGetAllConvocatoriasRes[]>;
  uploadConvocatoria: (data: IUploadConvocatoriaReq) => Promise<void>;
  searchConvocatorias: (data: ISearchConvocatoriasReq) => Promise<void>;
  deleteConvocatorias: (id: number) => Promise<void>;
  getSingleConvocatoria: (id: number) => Promise<IGetAllConvocatoriasRes>;
  patchConvocatorias: (
    id: number,
    data: IPatchConvocatoriasReq
  ) => Promise<void>;
  clearSingleConvocatoria: () => void;
  downloadReport: (data: ISearchConvocatoriasReq) => Promise<void>;
};

type Store = State & Actions;

export const useConvocatoriasStore = create<Store>((set) => ({
  convocatorias: [],
  singleConvocatoria: null,
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

  downloadReport: async (data) => {
    set({ loading: true, error: null });
    try {
      const report = await convocatoriasRepository.downloadReport(data);
      const blob = new Blob([report], { type: "application/xlsx" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "convocatorias_report.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading report:", error);
      set({ error: "Error downloading report" });
    } finally {
      set({ loading: false });
    }
  },

  getSingleConvocatoria: async (id) => {
    set({ loading: true, error: null });
    try {
      const convocatoria = await getSingleConvocatoriaUseCase(
        convocatoriasRepository
      )(id);

      if (!convocatoria) {
        throw new Error("Convocatoria not found");
      }

      set({ singleConvocatoria: convocatoria });
      return convocatoria;
    } catch (error) {
      console.error("Error fetching single convocatoria:", error);
      set({ error: "Error fetching single convocatoria" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearSingleConvocatoria: () => {
    set({ singleConvocatoria: null });
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

  patchConvocatorias: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await patchConvocatoriasUseCase(convocatoriasRepository)(id, data);
    } catch (error) {
      console.error("Error updating convocatoria:", error);
      set({ error: "Error updating convocatoria" });
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

  deleteConvocatorias: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteConvocatoriasUseCase(convocatoriasRepository)(id);
      set((state) => ({
        convocatorias: state.convocatorias.filter(
          (convocatoria) => convocatoria._id !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting convocatoria:", error);
      set({ error: "Error deleting convocatoria" });
    } finally {
      set({ loading: false });
    }
  },
}));
