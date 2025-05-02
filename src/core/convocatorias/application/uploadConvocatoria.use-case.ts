import { IConvocatoriasRepository } from '../domain/convocatorias.repository';

export const uploadConvocatoriasUseCase = (repository: IConvocatoriasRepository) => {
    return repository.uploadConvocatorias;
}