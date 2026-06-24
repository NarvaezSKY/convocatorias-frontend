import { IAtencionEspecialJudicialRepository } from '../domain/atencionEspecialJudicial.repository';

export const filterCasesUseCase = (repository: IAtencionEspecialJudicialRepository) => {
  return repository.filterCases;
}
