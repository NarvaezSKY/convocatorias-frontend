import { IPlanFinancieroRepository } from '../domain/planFinanciero.repository';

export const updatePlanFinancieroUseCase = (repository: IPlanFinancieroRepository) => {
    return repository.updatePlanFinanciero;
}