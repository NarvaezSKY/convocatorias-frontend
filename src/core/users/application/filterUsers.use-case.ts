import { IUsersRepository } from "../domain/users.repository";

export const filterUsersUseCase = (usersRepository: IUsersRepository) => {
    return usersRepository.filterUsers;
}