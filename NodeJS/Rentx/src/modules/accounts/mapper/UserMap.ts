import { instanceToPlain } from "class-transformer";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";

class UserMap {
  static toDTO({
    email,
    name,
    id,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserResponseDTO {
    const user = instanceToPlain({
      email,
      name,
      id,
      avatar,
      driver_license,
      avatar_url,
    });
    return <IUserResponseDTO>user;
  }
}

export { UserMap };
