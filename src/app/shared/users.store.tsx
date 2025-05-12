import { create } from 'zustand';
import { UsersRepository } from '@/core/users/infrastructure/users.repository';
import { getAllUsersUseCase } from '@/core/users/application';
import { IGetAllUsersRes } from '@/core/users/domain/get-all-users';

type State = {
    users: IGetAllUsersRes[];
    loading: boolean;
    error: string | null;
}

type Actions = {
    getAllUsers: () => Promise<IGetAllUsersRes[]>;
}

type Store = State & Actions;

export const useUsersStore = create<Store>((set) => ({
    users: [],
    loading: false,
    error: null,
    getAllUsers: async () => {
        set({ loading: true, error: null });
        try {
            const users = await getAllUsersUseCase(UsersRepository)();
            set({ users, error: null, loading: false });
            return users;
        } catch (error) {
            console.error('Error fetching users:', error);
            set({ error: 'Error fetching users', loading: false });
            throw error;
        } finally {
            set({ loading: false });
        }
    },

}))