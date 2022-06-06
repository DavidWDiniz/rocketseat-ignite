import { AppError } from "../../../../shared/errors/AppError";
import { ICarsRepository } from "../../repositories/ICarsRepository";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    private specificationsRepository: ISpecificationsRepository
  ) {}
  async execute({ car_id, specifications_id }: IRequest) {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car does not exists!");
    }

    carExists.specifications = await this.specificationsRepository.findByIds(
      specifications_id
    );

    await this.carsRepository.create(carExists);
  }
}

export { CreateCarSpecificationUseCase };
