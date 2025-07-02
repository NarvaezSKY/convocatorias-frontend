import { IUsersRepository } from "../domain/users.repository";

export const updateStatusUseCase = (usersRepository: IUsersRepository) => {
    return usersRepository.updateStatus
}