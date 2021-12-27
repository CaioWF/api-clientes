import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCitiesUseCase } from './ListCitiesUseCase';

class ListCitiesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, state, skip, take } = request.query;

    const listCitiesUseCase = container.resolve(ListCitiesUseCase);

    const paginate = await listCitiesUseCase.execute({
      name: name as string,
      state: state as string,
      skip: Number(skip) as number,
      take: Number(take) as number,
    });

    return response.json(paginate);
  }
}

export { ListCitiesController };
