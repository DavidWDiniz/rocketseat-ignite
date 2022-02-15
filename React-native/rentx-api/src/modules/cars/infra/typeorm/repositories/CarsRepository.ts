import {getRepository, MoreThan, Repository} from "typeorm";
import {ICarsRepository} from "../../../repositories/ICarsRepository";
import {Car} from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async listByUpdated(lastPulledVersion: number): Promise<Car[]> {
    return await this.repository
      .createQueryBuilder()
      .where("updated_at >= :lastPulledVersion AND updated_at <> created_at",
        {lastPulledVersion})
      .getMany();
  }

  async listByCreated(lastPulledVersion: number): Promise<Car[]> {
    return await this.repository.find({
      created_at: MoreThan(lastPulledVersion)
    });
  }

  async findById(id: string): Promise<Car> {
    return await this.repository.findOne(id, {
      relations: ['photos', 'accessories']
    });
  }

  async listAll(): Promise<Car[]> {
    return await this.repository.find({
      relations: ['photos', 'accessories']
    });
  }


}

export { CarsRepository };
