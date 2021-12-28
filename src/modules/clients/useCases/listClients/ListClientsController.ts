import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListClientsUseCase } from './ListClientsUseCase';

class ListClientsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { full_name, skip, take } = request.query;

    const listClientsUseCase = container.resolve(ListClientsUseCase);

    const paginate = await listClientsUseCase.execute({
      full_name: full_name as string,
      skip: Number(skip) as number,
      take: Number(take) as number,
    });

    return response.json(paginate);
  }
}

export { ListClientsController };
