import axiosInstance from "@/config/axios/instance";
import { IConvocatoriasRepository } from "../domain/convocatorias.repository";
import { IGetAllConvocatoriasRes } from "../domain/get-all-convocatorias";
import { ISearchConvocatoriasReq } from "../domain/search-convocatorias";
import { IUploadConvocatoriaReq } from "../domain/upload-convocatorias";
import { IPatchConvocatoriasReq } from "../domain/patch-convocatorias";

const getAllConvocatorias = async (): Promise<IGetAllConvocatoriasRes[]> => {
    try {
        const response = await axiosInstance.get("/convocatorias/get");
        return response.data;
    } catch (error) {
        console.error("Error fetching all convocatorias:", error);
        throw error;
    }
};

const uploadConvocatorias = async (data: IUploadConvocatoriaReq): Promise<any> => {
    try {
        const response = await axiosInstance.post("/convocatorias/upload", data);
        return response.data;
    } catch (error) {
        console.error("Error uploading convocatorias:", error);
        throw error;
    }
};

const searchConvocatorias = async (
    data: ISearchConvocatoriasReq
): Promise<IGetAllConvocatoriasRes[]> => {
    try {
        const response = await axiosInstance.get(`/convocatorias/filter`, {
            params: data,
        });
        return response.data;
    } catch (error) {
        console.error("Error searching convocatorias:", error);
        throw error;
    }
};

const downloadReport = async (
  data: ISearchConvocatoriasReq
): Promise<Blob> => {
  try {
    const response = await axiosInstance.get(`/convocatorias/filter`, {
      params: { ...data, report: true },
      responseType: "blob",
    });
    return response.data;
  } catch (error) {
    console.error("Error descargando reporte:", error);
    throw error;
  }
};

const deleteConvocatorias = async (id: string): Promise<any> => {
    try {
        const response = await axiosInstance.delete(`/convocatorias/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting convocatorias:", error);
        throw error;
    }
};

const getSingleConvocatoria= async (id: string): Promise<IGetAllConvocatoriasRes> => {
    try {
        const response = await axiosInstance.get(`/convocatorias/get/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching convocatoria by ID:", error);
        throw error;
    }
}

const patchConvocatorias = async (id: string, data: IPatchConvocatoriasReq): Promise<any> => {
    try {
        const response = await axiosInstance.patch(`/convocatorias/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating convocatorias:", error);
        throw error;
    }
};

export const convocatoriasRepository: IConvocatoriasRepository = {
    getAllConvocatorias,
    searchConvocatorias,
    uploadConvocatorias,
    deleteConvocatorias,
    getSingleConvocatoria,
    patchConvocatorias,
    downloadReport
};