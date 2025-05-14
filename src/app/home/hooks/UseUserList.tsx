import { useUsersStore } from "@/app/shared/users.store";

import { useEffect } from "react";
import { toast } from "sonner";

export const useUserList = () => {
  const { users, getAllUsers, loading, updateRole } = useUsersStore();

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleEditRole = (userId: string, newRole: string) => {

    const data = {
      userId,
      newRole,
    };
    updateRole(data)
      .then(() => {
        toast.success("Rol actualizado correctamente");
        getAllUsers();
      })
      .catch((error) => {
        console.error("Error updating role:", error);
      });

  }
  return {
    users,
    loading,
    handleEditRole,
  };
}