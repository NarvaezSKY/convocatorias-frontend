import { IConvocatoriasRepository } from '../domain/convocatorias.repository';

export const searchConvocatoriasUseCase = (repository: IConvocatoriasRepository) => {
    return repository.searchConvocatorias;
}