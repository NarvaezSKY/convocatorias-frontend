import axiosInstance from "@/config/axios/instance";

import { IGetPlanFinancieroByIdRes } from "../domain/get-by-id";
import { IPlanFinancieroRepository } from "../domain/planFinanciero.repository";
import { IUploadPlanFinancieroReq } from "../domain/upload";

const getSinglePlanFinanciero = async (id: string): Promise<IGetPlanFinancieroByIdRes> => {
    try {
        const response = await axiosInstance.get(`/plan-financiero/get/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching plan financiero by ID:", error);
        throw error;
    }
};

const createPlanFinanciero = async (data: IUploadPlanFinancieroReq): Promise<any> => {
    try {
        const response = await axiosInstance.post("/plan-financiero/create", data);
        return response.data;
    } catch (error) {
        console.error("Error creating plan financiero:", error);
        throw error;
    }
};

const updatePlanFinanciero = async (id: string, data: any): Promise<any> => {
    try {
        const response = await axiosInstance.patch(`/plan-financiero/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating plan financiero:", error);
        throw error;
    }
}


export const planFinancieroRepository: IPlanFinancieroRepository = { getSinglePlanFinanciero, createPlanFinanciero, updatePlanFinanciero };