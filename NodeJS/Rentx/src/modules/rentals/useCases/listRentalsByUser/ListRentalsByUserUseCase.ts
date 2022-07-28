import { inject, injectable } from "tsyringe";

import { IRentalsRepository } from "../../repositories/IRentalsRepository";

@injectable()
class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) {}

  async execute(user_id: string) {
    return this.rentalsRepository.findByUser(user_id);
  }
}

export { ListRentalsByUserUseCase };
