import axiosInstance from '@/config/axios/instance';
import { IUsersRepository } from '../domain/users.repository';

import { IGetAllUsersRes } from '../domain/get-all-users';


const getAllUsers = async (): Promise<IGetAllUsersRes[]> => {
    try {
        const response = await axiosInstance.get('/auth/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
}

export const UsersRepository: IUsersRepository = {
    getAllUsers,
}