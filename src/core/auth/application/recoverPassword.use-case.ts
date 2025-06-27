import { IAuthRepository } from "../domain/auth.repository";

export const recoverPasswordUseCase = (repository: IAuthRepository) => {
    return repository.recoverPassword
}