import { IUsersRepository } from "../domain/users.repository";

export const updateRoleUseCase = (usersRepository: IUsersRepository) => {
    return usersRepository.updateRole
}