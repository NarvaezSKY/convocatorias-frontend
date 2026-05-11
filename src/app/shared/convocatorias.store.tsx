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
  addUserToConvocatoriaUseCase,
  removeUserFromConvocatoriaUseCase
} from "@/core/convocatorias/application";
import { IAddUserToConvocatoriaReq } from "@/core/convocatorias/domain/add-user-to-convocatoria";
import { IRemoveUserFromConvocatoriaReq } from "@/core/convocatorias/domain/remove-user-from-convocatoria";

const toNumber = (value: unknown): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeConvocatoria = (
  convocatoria: IGetAllConvocatoriasRes,
): IGetAllConvocatoriasRes => {
  const beneficiarios = Array.isArray(convocatoria.beneficiariosPorMunicipio)
    ? convocatoria.beneficiariosPorMunicipio
    : [];

  if (beneficiarios.length === 0) {
    return convocatoria;
  }

  const totalDirectos = beneficiarios.reduce(
    (acc, item) => acc + toNumber(item?.directos),
    0,
  );
  const totalIndirectos = beneficiarios.reduce(
    (acc, item) => acc + toNumber(item?.indirectos),
    0,
  );

  return {
    ...convocatoria,
    numeroBeneficiariosDirectos:
      convocatoria.numeroBeneficiariosDirectos ?? totalDirectos,
    numeroBeneficiariosIndirectos:
      convocatoria.numeroBeneficiariosIndirectos ?? totalIndirectos,
  };
};

type State = {
  convocatorias: IGetAllConvocatoriasRes[];
  profileConvocatorias: IGetAllConvocatoriasRes[];
  singleConvocatoria: IGetAllConvocatoriasRes | null;
  loading: boolean;
  error: string | null;
  filterLoading: boolean;
};

type Actions = {
  getAllConvocatorias: () => Promise<IGetAllConvocatoriasRes[]>;
  uploadConvocatoria: (data: IUploadConvocatoriaReq) => Promise<void>;
  searchConvocatorias: (data: ISearchConvocatoriasReq) => Promise<void>;
  deleteConvocatorias: (id: string) => Promise<void>;
  getSingleConvocatoria: (id: string) => Promise<IGetAllConvocatoriasRes>;
  patchConvocatorias: (
    id: string,
    data: IPatchConvocatoriasReq
  ) => Promise<void>;
  clearSingleConvocatoria: () => void;
  downloadReport: (data: ISearchConvocatoriasReq) => Promise<void>;
  addUserToConvocatoria: (data: IAddUserToConvocatoriaReq) => Promise<void>;
  removeUserFromConvocatoria: (data: IRemoveUserFromConvocatoriaReq) => Promise<void>;
  searchProfileConvocatorias: (data: ISearchConvocatoriasReq) => Promise<void>;
  clearProfileConvocatorias: () => void;
};

type Store = State & Actions;

export const useConvocatoriasStore = create<Store>((set) => ({
  convocatorias: [],
  profileConvocatorias: [],
  singleConvocatoria: null,
  loading: false,
  error: null,
  filterLoading: false,
  getAllConvocatorias: async () => {
    set({ loading: true, error: null });
    try {
      const convocatorias = await getAllConvocatoriasUseCase(
        convocatoriasRepository
      )();
      const normalizedConvocatorias = convocatorias.map(normalizeConvocatoria);
      set({ convocatorias: normalizedConvocatorias, error: null, loading: false });
      return normalizedConvocatorias;
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
    set({ loading: true, error: null, singleConvocatoria: null });
    try {
      const convocatoria = await getSingleConvocatoriaUseCase(
        convocatoriasRepository
      )(id);

      if (!convocatoria) {
        throw new Error("Convocatoria not found");
      }

      const normalizedConvocatoria = normalizeConvocatoria(convocatoria);
      set({ singleConvocatoria: normalizedConvocatoria });
      return normalizedConvocatoria;
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
    set({ filterLoading: true, error: null });
    try {
      const convocatorias = await searchConvocatoriasUseCase(
        convocatoriasRepository
      )(data);
      set({ convocatorias: convocatorias.map(normalizeConvocatoria) });
    } catch (error) {
      console.error("Error searching convocatorias:", error);
      set({ error: "Error searching convocatorias" });
    } finally {
      set({ filterLoading: false });
    }
  },

  searchProfileConvocatorias: async (data) => {
    set({ filterLoading: true, error: null });
    try {
      const convocatorias = await searchConvocatoriasUseCase(
        convocatoriasRepository
      )(data);
      set({ profileConvocatorias: convocatorias.map(normalizeConvocatoria) });
    } catch (error) {
      console.error("Error searching convocatorias:", error);
      set({ error: "Error searching convocatorias" });
    } finally {
      set({ filterLoading: false });
    }
  },

  clearProfileConvocatorias: () => {
    set({ profileConvocatorias: [] });
  },

  deleteConvocatorias: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteConvocatoriasUseCase(convocatoriasRepository)(id);
      set((state) => ({
        convocatorias: state.convocatorias.filter(
          (convocatoria) => (convocatoria._id) !== id
        ),
      }));
    } catch (error) {
      console.error("Error deleting convocatoria:", error);
      set({ error: "Error deleting convocatoria" });
    } finally {
      set({ loading: false });
    }
  },

  addUserToConvocatoria: async (data) => {
    set({ loading: true, error: null });
    try {
      await addUserToConvocatoriaUseCase(convocatoriasRepository)(data);
    } catch (error) {
      console.error("Error adding user to convocatoria:", error);
      set({ error: "Error adding user to convocatoria" });
    } finally {
      set({ loading: false });
    }
  },

  removeUserFromConvocatoria: async (data) => {
    set({ loading: true, error: null });
    try {
      console.log("data from store", data);
      await removeUserFromConvocatoriaUseCase(convocatoriasRepository)(data);
      // Actualizar localmente las convocatorias del perfil al eliminar
      set((state) => ({
        profileConvocatorias: state.profileConvocatorias.filter(
          (c) => c._id !== data.convocatoria_id
        ),
      }));
    } catch (error) {
      console.error("Error removing user from convocatoria:", error);
      set({ error: "Error removing user from convocatoria" });
    } finally {
      set({ loading: false });
    }
  },

  


}));
