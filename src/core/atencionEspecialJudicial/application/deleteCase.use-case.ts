import { IAtencionEspecialJudicialRepository } from '../domain/atencionEspecialJudicial.repository';

export const deleteCaseUseCase = (repository: IAtencionEspecialJudicialRepository) => {
  return repository.deleteCase;
}
