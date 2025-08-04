
import { IUsersRepository } from "../domain/users.repository";

export const getSingleUserUseCase = (usersRepository: IUsersRepository) => {
    return usersRepository.getSingleUser;
}