import { IAuthRepository } from "../domain/auth.repository"

export const activateUserUseCase = (authRepository: IAuthRepository) => {
    return authRepository.activateUser
}