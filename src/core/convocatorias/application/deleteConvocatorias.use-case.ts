import { IConvocatoriasRepository } from '../domain/convocatorias.repository';

export const deleteConvocatoriasUseCase = (repository: IConvocatoriasRepository) => {
    return repository.deleteConvocatorias;
}