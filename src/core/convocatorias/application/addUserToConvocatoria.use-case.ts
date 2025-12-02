import { IConvocatoriasRepository } from '../domain/convocatorias.repository';

export const addUserToConvocatoriaUseCase = (repository: IConvocatoriasRepository) => {
    return repository.addUserToConvocatoria;
}