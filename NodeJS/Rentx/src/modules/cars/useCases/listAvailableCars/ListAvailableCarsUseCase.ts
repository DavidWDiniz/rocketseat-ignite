import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) {}
  async execute({ name, category_id, brand }: IRequest) {
    return this.carsRepository.findAvailable(name, brand, category_id);
  }
}

export { ListAvailableCarsUseCase };
