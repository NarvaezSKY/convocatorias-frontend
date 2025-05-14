import { create } from 'zustand';
import { UsersRepository } from '@/core/users/infrastructure/users.repository';
import { getAllUsersUseCase, updateRoleUseCase } from '@/core/users/application';
import { IGetAllUsersRes } from '@/core/users/domain/get-all-users';
import { IUpdateRoleReq } from '@/core/users/domain/update-role';

type State = {
    users: IGetAllUsersRes[];
    loading: boolean;
    error: string | null;
}

type Actions = {
    getAllUsers: () => Promise<IGetAllUsersRes[]>;
    updateRole: (data: IUpdateRoleReq) => Promise<void>;
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

    updateRole: async (data) => {
        set({ loading: true, error: null });
        try {
            await updateRoleUseCase(UsersRepository)(data);

            set((state) => ({
                users: state.users.map((user) =>
                    user._id === String(data.userId) ? { ...user, role: data.newRole } : user
                ),
                loading: false,
            }));
        } catch (error) {
            console.error('Error updating role:', error);
            set({ error: 'Error updating role', loading: false });
        }
    }

}))