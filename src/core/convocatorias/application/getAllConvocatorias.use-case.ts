import { IConvocatoriasRepository } from '../domain/convocatorias.repository';

export const getAllConvocatoriasUseCase = (repository: IConvocatoriasRepository) => {
    return repository.getAllConvocatorias;
}

