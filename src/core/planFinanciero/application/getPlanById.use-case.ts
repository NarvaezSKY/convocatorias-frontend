import { IPlanFinancieroRepository } from '../domain/planFinanciero.repository';

export const getSinglePlanFinancieroUseCase = (repository: IPlanFinancieroRepository) => {
    return repository.getSinglePlanFinanciero;
}