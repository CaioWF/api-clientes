import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCityUseCase } from './CreateCityUseCase';

class CreateCityController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, state } = request.body;

    const createCityUseCase = container.resolve(CreateCityUseCase);

    const city = await createCityUseCase.execute({ name, state });

    return response.status(201).json(city);
  }
}

export { CreateCityController };
