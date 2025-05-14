import axiosInstance from '@/config/axios/instance';
import { IUsersRepository } from '../domain/users.repository';

import { IGetAllUsersRes } from '../domain/get-all-users';
import { IUpdateRoleReq } from '../domain/update-role';


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

export const UsersRepository: IUsersRepository = {
    getAllUsers,
    updateRole
}