import { Router } from 'express';

import { CreateClientController } from '@modules/clients/useCases/createClient/CreateClientController';
import { FindClientByIdController } from '@modules/clients/useCases/findClientById/FindClientByIdController';
import { ListClientsController } from '@modules/clients/useCases/listClients/ListClientsController';
import { RemoveClientController } from '@modules/clients/useCases/removeClient/RemoveClientController';
import { UpdateClientNameController } from '@modules/clients/useCases/updateClientName/UpdateClientNameController';

const clientsRoutes = Router();

const createClientController = new CreateClientController();
const findClientByIdController = new FindClientByIdController();
const removeClientController = new RemoveClientController();
const updateClientNameController = new UpdateClientNameController();
const listClientsController = new ListClientsController();

clientsRoutes.post('/', createClientController.handle);
clientsRoutes.get('/:id', findClientByIdController.handle);
clientsRoutes.delete('/:id', removeClientController.handle);
clientsRoutes.patch('/:id', updateClientNameController.handle);
clientsRoutes.get('/', listClientsController.handle);

export { clientsRoutes };
