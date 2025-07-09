import { IFilterUsersReq } from "@/core/users/domain/filter-users";
import { useUsersStore } from "@/app/shared/users.store";

export const useSearchUsers = () => {
  const { filterUsers, getAllUsers, loading } = useUsersStore();
  const handleSearch = (searchParams: IFilterUsersReq) => {
    const filtrosLimpios = Object.fromEntries(
      Object.entries(searchParams).filter(
        ([_, v]) => v?.toString().trim() !== ""
      )
    );
    if (Object.keys(filtrosLimpios).length > 0) {
      filterUsers(filtrosLimpios);
    } else {
      getAllUsers();
    }
  };
  return { handleSearch, loading };
};
