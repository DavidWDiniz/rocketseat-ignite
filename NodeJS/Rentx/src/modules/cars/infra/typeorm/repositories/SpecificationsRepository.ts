import { In, Repository } from "typeorm";

import { AppDataSource } from "../../../../../shared/infra/typeorm";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../../../repositories/ISpecificationsRepository";
import { Specification } from "../entities/Specification";

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
    return specification;
  }

  async findByName(name: string) {
    return this.repository.findOneBy({ name });
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    return this.repository.findBy({ id: In(ids) });
  }
}

export { SpecificationsRepository };
