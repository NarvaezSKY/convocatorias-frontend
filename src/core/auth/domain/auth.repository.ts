import { ILoginReq, ILoginRes } from "./login";
import { IRegisterReq } from "./register";
import { IVerifyRes } from "./verify";

export interface IAuthRepository {
    login: (data: ILoginReq) => Promise<ILoginRes>;
    verify() : Promise<IVerifyRes>;
    adminRegister: (data: IRegisterReq) => Promise<void>;
    userRegister: (data: IRegisterReq) => Promise<void>;
}