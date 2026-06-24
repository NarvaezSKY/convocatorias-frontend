import { IAtencionEspecialJudicialRepository } from '../domain/atencionEspecialJudicial.repository';

export const createCaseUseCase = (repository: IAtencionEspecialJudicialRepository) => {
  return repository.createCase;
}
