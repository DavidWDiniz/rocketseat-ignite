import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const avatar_file = request.file.filename;
    const updateUserAvatar = container.resolve(UpdateUserAvatarUseCase);
    await updateUserAvatar.execute({ user_id: id, avatar_file });
    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };