import { create } from "zustand";
import { UsersRepository } from "@/core/users/infrastructure/users.repository";
import {
  getAllUsersUseCase,
  updateRoleUseCase,
  updateStatusUseCase,
  filterUsersUseCase,
} from "@/core/users/application";
import { IGetAllUsersRes } from "@/core/users/domain/get-all-users";
import { IUpdateRoleReq } from "@/core/users/domain/update-role";
import { IUpdateStatusReq } from "@/core/users/domain/update-status";
import { IFilterUsersReq } from "@/core/users/domain/filter-users";

type State = {
  users: IGetAllUsersRes[];
  loading: boolean;
  error: string | null;
};

type Actions = {
  getAllUsers: () => Promise<IGetAllUsersRes[]>;
  updateRole: (data: IUpdateRoleReq) => Promise<void>;
  updateStatus: (data: IUpdateStatusReq) => Promise<void>;
  filterUsers: (data: IFilterUsersReq) => Promise<IGetAllUsersRes[]>;
};

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
      console.error("Error fetching users:", error);
      set({ error: "Error fetching users", loading: false });
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
          user._id === String(data.userId)
            ? { ...user, role: data.newRole }
            : user
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Error updating role:", error);
      set({ error: "Error updating role", loading: false });
    }
  },

  updateStatus: async (data) => {
    set({ loading: true, error: null });
    try {
      await updateStatusUseCase(UsersRepository)(data);

      set((state) => ({
        users: state.users.map((user) =>
          user._id === String(data.userId)
            ? { ...user, status: data.newStatus }
            : user
        ),
        loading: false,
      }));
    } catch (error) {
      console.error("Error updating status:", error);
      set({ error: "Error updating status", loading: false });
    }
  },
  filterUsers: async (data) => {
    set({ loading: true, error: null });
    try {
      const filteredUsers = await filterUsersUseCase(UsersRepository)(data);
      set({ users: filteredUsers, loading: false, error: null });
      return filteredUsers;
    } catch (error) {
      console.error("Error filtering users:", error);
      set({ error: "Error filtering users", loading: false });
      throw error;
    }
  },
}));
