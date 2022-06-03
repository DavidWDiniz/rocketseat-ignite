import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

beforeEach(() => {
  carsRepositoryInMemory = new CarsRepositoryInMemory();
  listAvailableCarsUseCase = new ListAvailableCarsUseCase(
    carsRepositoryInMemory
  );
});

describe("List Cars", () => {
  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      license_plate: "123456",
      name: "car",
      category_id: "1",
      daily_rate: 140,
      fine_amount: 100,
      brand: "car brand",
      description: "car description",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      license_plate: "123456",
      name: "car 2",
      category_id: "2",
      daily_rate: 140,
      fine_amount: 100,
      brand: "car brand 2",
      description: "car description",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "car 2",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      license_plate: "123456",
      name: "car 3",
      category_id: "3",
      daily_rate: 140,
      fine_amount: 100,
      brand: "car brand 3",
      description: "car description",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "car brand 3",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category id", async () => {
    const car = await carsRepositoryInMemory.create({
      license_plate: "123456",
      name: "car 4",
      category_id: "4",
      daily_rate: 140,
      fine_amount: 100,
      brand: "car brand 4",
      description: "car description",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "4",
    });

    expect(cars).toEqual([car]);
  });
});
