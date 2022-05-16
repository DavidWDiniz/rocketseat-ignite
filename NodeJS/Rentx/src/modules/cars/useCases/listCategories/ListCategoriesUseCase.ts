import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";

@injectable()
class ListCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository
  ) {}
  async execute() {
    return this.categoriesRepository.list();
  }
}

export { ListCategoriesUseCase };
