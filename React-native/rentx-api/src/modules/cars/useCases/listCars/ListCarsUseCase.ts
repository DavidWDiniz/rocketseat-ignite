import {inject, injectable} from "tsyringe";

import {ICarsRepository} from "../../repositories/ICarsRepository";
import {Car} from "@modules/cars/infra/typeorm/entities/Car";

@injectable()
class ListCarsUseCase {
  constructor(
    @inject("CarsRepository")
    private usersRepository: ICarsRepository
  ) {}

  async execute(): Promise<Car[]> {
    return await this.usersRepository.listAll();
  }
}

export { ListCarsUseCase };
