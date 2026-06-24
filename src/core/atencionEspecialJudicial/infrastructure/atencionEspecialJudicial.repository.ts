import axiosInstance from "@/config/axios/instance";
import { IAtencionEspecialJudicialRepository } from "../domain/atencionEspecialJudicial.repository";
import { ICaseRes } from "../domain/get-all-cases";
import { ICreateCaseReq } from "../domain/create-case";
import { IUpdateCaseReq } from "../domain/update-case";
import { IFilterCasesReq } from "../domain/filter-cases";

const getAllCases = async (): Promise<ICaseRes[]> => {
  try {
    const response = await axiosInstance.get("/atencion-especial-judicial");
    return response.data;
  } catch (error) {
    console.error("Error fetching all cases:", error);
    throw error;
  }
};

const getCaseById = async (id: string): Promise<ICaseRes> => {
  try {
    const response = await axiosInstance.get(`/atencion-especial-judicial/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching case by ID:", error);
    throw error;
  }
};

const createCase = async (data: ICreateCaseReq): Promise<ICaseRes> => {
  try {
    const response = await axiosInstance.post("/atencion-especial-judicial", data);
    return response.data;
  } catch (error) {
    console.error("Error creating case:", error);
    throw error;
  }
};

const updateCase = async (id: string, data: IUpdateCaseReq): Promise<ICaseRes> => {
  try {
    const response = await axiosInstance.patch(`/atencion-especial-judicial/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating case:", error);
    throw error;
  }
};

const filterCases = async (data: IFilterCasesReq): Promise<ICaseRes[]> => {
  try {
    const response = await axiosInstance.get("/atencion-especial-judicial/filter", {
      params: data,
    });
    return response.data;
  } catch (error) {
    console.error("Error filtering cases:", error);
    throw error;
  }
};

const deleteCase = async (id: string): Promise<any> => {
  try {
    const response = await axiosInstance.delete(`/atencion-especial-judicial/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting case:", error);
    throw error;
  }
};

export const atencionEspecialJudicialRepository: IAtencionEspecialJudicialRepository = {
  getAllCases,
  getCaseById,
  createCase,
  updateCase,
  filterCases,
  deleteCase,
};
