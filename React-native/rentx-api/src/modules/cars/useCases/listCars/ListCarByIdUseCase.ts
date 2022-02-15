import {inject, injectable} from "tsyringe";

import {ICarsRepository} from "../../repositories/ICarsRepository";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";

@injectable()
class ListCarByIdUseCase {
  constructor(
    @inject("CarsRepository")
    private usersRepository: ICarsRepository
  ) {}

  async execute(id: string): Promise<Car> {
    return await this.usersRepository.findById(id);
  }
}

export { ListCarByIdUseCase };
