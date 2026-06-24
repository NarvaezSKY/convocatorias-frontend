import { IAtencionEspecialJudicialRepository } from '../domain/atencionEspecialJudicial.repository';

export const getCaseByIdUseCase = (repository: IAtencionEspecialJudicialRepository) => {
  return repository.getCaseById;
}
