import { IGetAllUsersRes } from "./get-all-users";

export interface IUsersRepository {
    getAllUsers(): Promise<IGetAllUsersRes[]>;
}