import axiosInstance from '@/config/axios/instance';
import { IUsersRepository } from '../domain/users.repository';
import { IGetAllUsersRes } from '../domain/get-all-users';
import { IUpdateRoleReq } from '../domain/update-role';
import { IUpdateStatusReq } from '../domain/update-status';
import { IFilterUsersReq } from '../domain/filter-users';
import { IGetSingleUserRes } from '../domain/get-single-user';

const getAllUsers = async (): Promise<IGetAllUsersRes[]> => {
    try {
        const response = await axiosInstance.get('/auth/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

const updateRole = async (data: IUpdateRoleReq): Promise<void> => {
    try {
        const response = await axiosInstance.patch('/auth/update-role', data);
        return response.data;
    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
    }
}

const updateStatus = async (data: IUpdateStatusReq): Promise<void> => {
    try {
        const response = await axiosInstance.patch('/auth/update-status', data);
        return response.data;
    } catch (error) {
        console.error('Error updating user status:', error);
        throw error;
    }
}

const filterUsers = async (data: IFilterUsersReq): Promise<IGetAllUsersRes[]> => {
    try {
        const response = await axiosInstance.get('/auth/filter-users', { params: data });
        return response.data;
    } catch (error) {
        console.error('Error filtering users:', error);
        throw error;
    }
}

const getSingleUser = async (id: string): Promise<IGetSingleUserRes> => {
    try {
        const response = await axiosInstance.get(`/auth/user/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching single user:', error);
        throw error;
    }
}

export const UsersRepository: IUsersRepository = {
    getAllUsers,
    updateRole,
    updateStatus,
    filterUsers,
    getSingleUser
}