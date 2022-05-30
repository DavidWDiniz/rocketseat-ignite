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
  }: ICreateCarDTO): Promise<Car> {
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
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }
}

export { CarsRepositoryInMemory };
