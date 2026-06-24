import { IAtencionEspecialJudicialRepository } from '../domain/atencionEspecialJudicial.repository';

export const updateCaseUseCase = (repository: IAtencionEspecialJudicialRepository) => {
  return repository.updateCase;
}
