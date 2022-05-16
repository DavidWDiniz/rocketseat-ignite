import { Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;
  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }
  async create({ name, description }: ICreateSpecificationDTO) {
    const specification = this.repository.create({
      description,
      name,
    });
    await this.repository.save(specification);
  }

  async findByName(name: string) {
    return this.repository.findOneBy({ name });
  }
}

export { SpecificationsRepository };
