import { BACKEND_URL } from '@/config/axios/config';
import axiosInstance from '../../../config/axios/instance';
import { IAuthRepository } from '../domain/auth.repository';
import { ILoginReq } from '../domain/login';
import { IRegisterReq } from '../domain/register';
import axios from 'axios';


const login = async (data: ILoginReq) => {
    try {
        const response = await axiosInstance.post("/auth/login", data);
        console.log(BACKEND_URL)
        return response.data;


    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

const adminRegister = async (data: IRegisterReq) => {
    try {
        const response = await axiosInstance.post("/auth/register/admin", data);
        return response.data;

    } catch (error) {
        console.error("Error during register:", error);
        throw error;
    }
}

const userRegister = async (data: IRegisterReq) => {
    try {
        const response = await axiosInstance.post("/auth/register/user", data);
        return response.data;
    } catch (error) {
        console.error("Error during register:", error);

        if (axios.isAxiosError(error)) {
            const message = error.response?.data?.message || "Unknown error";
            throw new Error(message);
        }

        throw new Error("Unexpected error occurred");
    }
}


const verify = async () => {
    try {
        const response = await axiosInstance.get("/auth/verify");
        return response.data;
    } catch (error) {
        console.error("Error during verification:", error);
        throw error;
    }
}

export const authRepository: IAuthRepository = {
    login,
    adminRegister,
    userRegister,
    verify
}