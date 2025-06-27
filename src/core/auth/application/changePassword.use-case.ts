import { IAuthRepository } from "../domain/auth.repository";

export const changePasswordUseCase = (authRepository: IAuthRepository) => {
    return authRepository.changePassword;
}