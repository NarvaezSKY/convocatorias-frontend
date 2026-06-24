import { IAtencionEspecialJudicialRepository } from '../domain/atencionEspecialJudicial.repository';

export const getAllCasesUseCase = (repository: IAtencionEspecialJudicialRepository) => {
  return repository.getAllCases;
}
