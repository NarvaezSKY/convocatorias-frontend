import { IConvocatoriasRepository } from "../domain/convocatorias.repository";

export const patchConvocatoriasUseCase = (repository: IConvocatoriasRepository) => {
    return repository.patchConvocatorias
}