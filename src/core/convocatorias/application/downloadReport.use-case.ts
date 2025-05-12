import { IConvocatoriasRepository } from '../domain/convocatorias.repository';

export const downloadReportUseCase = (repository: IConvocatoriasRepository) => {
    return repository.downloadReport;
}