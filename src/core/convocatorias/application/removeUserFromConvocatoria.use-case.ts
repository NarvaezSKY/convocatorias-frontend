import { IConvocatoriasRepository } from '../domain/convocatorias.repository';

export const removeUserFromConvocatoriaUseCase = (repository: IConvocatoriasRepository) => {
    return repository.removeUserFromConvocatoria;
}