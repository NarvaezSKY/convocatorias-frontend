import { create } from "zustand";
import { atencionEspecialJudicialRepository } from "../../core/atencionEspecialJudicial/infrastructure/atencionEspecialJudicial.repository";
import { ICaseRes } from "@/core/atencionEspecialJudicial/domain/get-all-cases";
import { ICreateCaseReq } from "@/core/atencionEspecialJudicial/domain/create-case";
import { IUpdateCaseReq } from "@/core/atencionEspecialJudicial/domain/update-case";
import { IFilterCasesReq } from "@/core/atencionEspecialJudicial/domain/filter-cases";
import {
  getAllCasesUseCase,
  getCaseByIdUseCase,
  createCaseUseCase,
  updateCaseUseCase,
  filterCasesUseCase,
  deleteCaseUseCase,
} from "@/core/atencionEspecialJudicial/application";

type State = {
  cases: ICaseRes[];
  singleCase: ICaseRes | null;
  loading: boolean;
  error: string | null;
};

type Actions = {
  getAllCases: () => Promise<ICaseRes[]>;
  getCaseById: (id: string) => Promise<ICaseRes>;
  createCase: (data: ICreateCaseReq) => Promise<void>;
  updateCase: (id: string, data: IUpdateCaseReq) => Promise<void>;
  filterCases: (data: IFilterCasesReq) => Promise<void>;
  deleteCase: (id: string) => Promise<void>;
  clearSingleCase: () => void;
};

type Store = State & Actions;

export const useAtencionEspecialJudicialStore = create<Store>((set) => ({
  cases: [],
  singleCase: null,
  loading: false,
  error: null,

  getAllCases: async () => {
    set({ loading: true, error: null });
    try {
      const cases = await getAllCasesUseCase(atencionEspecialJudicialRepository)();
      set({ cases, error: null, loading: false });
      return cases;
    } catch (error) {
      console.error("Error fetching cases:", error);
      set({ error: "Error fetching cases", loading: false });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getCaseById: async (id) => {
    set({ loading: true, error: null, singleCase: null });
    try {
      const caseItem = await getCaseByIdUseCase(atencionEspecialJudicialRepository)(id);
      if (!caseItem) throw new Error("Case not found");
      set({ singleCase: caseItem, error: null, loading: false });
      return caseItem;
    } catch (error) {
      console.error("Error fetching case by ID:", error);
      set({ error: "Error fetching case", loading: false });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  clearSingleCase: () => {
    set({ singleCase: null });
  },

  createCase: async (data) => {
    set({ loading: true, error: null });
    try {
      await createCaseUseCase(atencionEspecialJudicialRepository)(data);
    } catch (error) {
      console.error("Error creating case:", error);
      set({ error: "Error creating case" });
    } finally {
      set({ loading: false });
    }
  },

  updateCase: async (id, data) => {
    set({ loading: true, error: null });
    try {
      await updateCaseUseCase(atencionEspecialJudicialRepository)(id, data);
    } catch (error) {
      console.error("Error updating case:", error);
      set({ error: "Error updating case" });
    } finally {
      set({ loading: false });
    }
  },

  filterCases: async (data) => {
    set({ loading: true, error: null });
    try {
      const cases = await filterCasesUseCase(atencionEspecialJudicialRepository)(data);
      set({ cases, error: null, loading: false });
    } catch (error) {
      console.error("Error filtering cases:", error);
      set({ error: "Error filtering cases" });
    } finally {
      set({ loading: false });
    }
  },

  deleteCase: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteCaseUseCase(atencionEspecialJudicialRepository)(id);
      set((state) => ({
        cases: state.cases.filter((c) => c._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting case:", error);
      set({ error: "Error deleting case" });
    } finally {
      set({ loading: false });
    }
  },
}));
