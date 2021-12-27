import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateClientNameUseCase } from './UpdateClientNameUseCase';

class UpdateClientNameController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { full_name } = request.body;

    const removeClientUseCase = container.resolve(UpdateClientNameUseCase);

    const client = await removeClientUseCase.execute({ id, full_name });

    return response.status(200).json(client);
  }
}

export { UpdateClientNameController };
