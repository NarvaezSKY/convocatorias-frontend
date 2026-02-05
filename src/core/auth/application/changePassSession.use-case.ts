import { IAuthRepository } from "../domain/auth.repository";

export const changePassSessionUseCase = (authRepository: IAuthRepository) => {
    return authRepository.changePassSession;
}