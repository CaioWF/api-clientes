import { Router } from 'express';

import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { FindClientByIdController } from '@modules/clients/useCases/findClientById/FindClientByIdController';
import { RemoveClientController } from '@modules/clients/useCases/removeClient/RemoveClientController';

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const findClientByIdController = new FindClientByIdController();
const removeClientController = new RemoveClientController();

clientsRoutes.post('/', createClientController.handle);
clientsRoutes.get('/:id', findClientByIdController.handle);
clientsRoutes.delete('/:id', removeClientController.handle);

export { clientsRoutes };
