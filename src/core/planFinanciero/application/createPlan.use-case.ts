import { IPlanFinancieroRepository } from '../domain/planFinanciero.repository';

export const createPlanFinancieroUseCase = (repository: IPlanFinancieroRepository) => {
    return repository.createPlanFinanciero;
}