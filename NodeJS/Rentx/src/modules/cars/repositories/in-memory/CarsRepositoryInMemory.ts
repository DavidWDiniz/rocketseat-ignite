import { ICreateCarDTO } from "../../dtos/ICreateCarDTO";
import { Car } from "../../infra/typeorm/entities/Car";
import { ICarsRepository } from "../ICarsRepository";

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    license_plate,
    name,
    category_id,
    daily_rate,
    fine_amount,
    brand,
    description,
  }: ICreateCarDTO): Promise<void> {
    const car = new Car();
    Object.assign(car, {
      license_plate,
      name,
      category_id,
      daily_rate,
      fine_amount,
      brand,
      description,
    });
    this.cars.push(car);
  }
}

export { CarsRepositoryInMemory };
