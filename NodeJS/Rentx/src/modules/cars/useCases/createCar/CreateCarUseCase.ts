import { ICarsRepository } from "../../repositories/ICarsRepository";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

class CreateCarUseCase {
  constructor(private carsRepository: ICarsRepository) {}
  async execute({
    category_id,
    brand,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: IRequest) {
    await this.carsRepository.create({
      category_id,
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });
  }
}

export { CreateCarUseCase };
