import { IUsersRepository } from "../domain/users.repository";

export const updateUserUseCase = (usersRepository: IUsersRepository) => {
    return usersRepository.updateUser
}