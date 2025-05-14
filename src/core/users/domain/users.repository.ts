import { IGetAllUsersRes } from "./get-all-users";
import { IUpdateRoleReq } from "./update-role";

export interface IUsersRepository {
    getAllUsers(): Promise<IGetAllUsersRes[]>;
    updateRole(data: IUpdateRoleReq): Promise<void>;
}