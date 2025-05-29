import { create } from "zustand";
import { planFinancieroRepository } from "@/core/planFinanciero/infrastructure/planFinanciero.repository";
import {
  createPlanFinancieroUseCase,
  getSinglePlanFinancieroUseCase,
  updatePlanFinancieroUseCase,
} from "@/core/planFinanciero/application";
import { IGetPlanFinancieroByIdRes } from "@/core/planFinanciero/domain/get-by-id";
import { IUploadPlanFinancieroReq } from "@/core/planFinanciero/domain/upload";

type Actions = {
  createPlanFinanciero: (data: IUploadPlanFinancieroReq) => Promise<void>;
  getSinglePlanFinanciero: (id: string) => Promise<IGetPlanFinancieroByIdRes>;
  updatePlanFinanciero: (id: string, data: any) => Promise<void>;
};

type State = {
  loading: boolean;
  error: string | null;
  planFinanciero: IGetPlanFinancieroByIdRes | null;
};

export const usePlanFinancieroStore = create<State & Actions>((set) => ({
  loading: false,
  error: null,
  planFinanciero: null,

  createPlanFinanciero: async (data) => {
    set({ loading: true, error: null });
    try {
      await createPlanFinancieroUseCase(planFinancieroRepository)(data);
    } catch (error) {
      console.error("Error creating plan financiero:", error);
      set({ error: "Error creating plan financiero" });
    } finally {
      set({ loading: false });
    }
  },

  getSinglePlanFinanciero: async (id) => {
    set({ loading: true, error: null });
    try {
      const planFinanciero = await getSinglePlanFinancieroUseCase(
        planFinancieroRepository
      )(id);
      set({ planFinanciero, error: null, loading: false });
      return planFinanciero;
    } catch (error) {
      console.error("Error fetching plan financiero:", error);
      set({ error: "Error fetching plan financiero" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updatePlanFinanciero: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updatePlanFinancieroUseCase(planFinancieroRepository)(id, data);
    } catch (error) {
      console.error("Error updating plan financiero:", error);
      set({ error: "Error updating plan financiero" });
    } finally {
      set({ loading: false });
    }
  },
}));
