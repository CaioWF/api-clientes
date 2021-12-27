import { Router } from 'express';

import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { FindClientByIdController } from '@modules/clients/useCases/findClientById/FindClientByIdController';

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const findClientByIdController = new FindClientByIdController();

clientsRoutes.post('/', createClientController.handle);
clientsRoutes.get('/:id', findClientByIdController.handle);

export { clientsRoutes };
