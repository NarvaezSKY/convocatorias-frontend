import { IFilterUsersReq } from "./filter-users";
import { IGetAllUsersRes } from "./get-all-users";
import { IGetSingleUserRes } from "./get-single-user";
import { IUpdateRoleReq } from "./update-role";
import { IUpdateStatusReq } from "./update-status";

export interface IUsersRepository {
    getAllUsers(): Promise<IGetAllUsersRes[]>;
    updateRole(data: IUpdateRoleReq): Promise<void>;
    updateStatus(data: IUpdateStatusReq): Promise<void>;
    filterUsers(data: IFilterUsersReq): Promise<IGetAllUsersRes[]>;
    getSingleUser(id: string): Promise<IGetSingleUserRes>;
}