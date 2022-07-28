import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      category_id: "Category",
      brand: "Brand",
      daily_rate: 100,
      description: "Car description",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Car name",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car that already exists an license plate", async () => {
    await createCarUseCase.execute({
      category_id: "Category",
      brand: "Brand",
      daily_rate: 100,
      description: "Car description",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Car 1",
    });
    await expect(
      createCarUseCase.execute({
        category_id: "Category",
        brand: "Brand",
        daily_rate: 100,
        description: "Car description",
        fine_amount: 60,
        license_plate: "ABC-1234",
        name: "Car 2",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("Should be able to create a car with available tru by default", async () => {
    const car = await createCarUseCase.execute({
      category_id: "Category",
      brand: "Brand",
      daily_rate: 100,
      description: "Car description",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Car Available",
    });

    expect(car.available).toBe(true);
  });
});
