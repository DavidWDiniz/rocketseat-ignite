import { Request, Response } from "express";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    console.log("PUSH DO USUÁRIO")
    console.log(request.body)
    return response.status(201).json(response);
  }
}

export { UpdateUserController };
