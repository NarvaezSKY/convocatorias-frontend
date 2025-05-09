import { IConvocatoriasRepository } from "../domain/convocatorias.repository";


export const getSingleConvocatoriaUseCase = (repository: IConvocatoriasRepository) => {
    return repository.getSingleConvocatoria;
}