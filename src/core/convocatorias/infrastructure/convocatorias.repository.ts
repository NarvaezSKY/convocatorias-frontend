import { IConvocatoriasRepository } from "../domain/convocatorias.repository";
import { IGetAllConvocatoriasRes } from "../domain/get-all-convocatorias";
import { ISearchConvocatoriasReq } from "../domain/search-convocatorias";
import axiosInstance from "@/config/axios/instance";
import { IUploadConvocatoriaReq } from "../domain/upload-convocatorias";

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
        const response = await axiosInstance.post("/convocatorias/search", data);
        return response.data;
    } catch (error) {
        console.error("Error searching convocatorias:", error);
        throw error;
    }
};

export const convocatoriasRepository: IConvocatoriasRepository = {
    getAllConvocatorias,
    searchConvocatorias,
    uploadConvocatorias
};