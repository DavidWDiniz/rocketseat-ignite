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
    id,
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
      id,
    });
    this.cars.push(car);
    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find((car) => car.license_plate === license_plate);
  }

  async findAvailable(
    name?: string,
    brand?: string,
    category_id?: string
  ): Promise<Car[]> {
    let availableCars = this.cars.filter((car) => car.available);

    if (!name && !brand && !category_id) return availableCars;

    availableCars = availableCars.filter((car) => {
      if (car.name === name) return true;
      if (car.brand === brand) return true;
      return car.category_id === category_id;
    });

    return availableCars;
  }

  async findById(id: string): Promise<Car> {
    return this.cars.find((car) => car.id === id);
  }
}

export { CarsRepositoryInMemory };
