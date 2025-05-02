import { ILoginReq, ILoginRes } from "./login";
import { IRegisterReq } from "./register";

export interface IAuthRepository {
    login: (data: ILoginReq) => Promise<ILoginRes>;
    adminRegister: (data: IRegisterReq) => Promise<void>;
    userRegister: (data: IRegisterReq) => Promise<void>;
}