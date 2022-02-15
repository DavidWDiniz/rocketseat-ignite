import {getRepository, Repository} from "typeorm";
import {IUsersRepository} from "../../../repositories/IUsersRepository";
import {ICreateUsersDTO} from "../../../dtos/ICreateUserDTO";
import {User} from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    driver_license,
    password,
    avatar,
    id,
  }: ICreateUsersDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
      avatar,
      id,
    });

    await this.repository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.repository.findOne({email});
  }

  async findById(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }

  async save(user: User): Promise<User> {
    await this.repository.save(user);    

    return user;
  }
}

export { UsersRepository };
