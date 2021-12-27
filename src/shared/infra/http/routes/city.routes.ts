import { Router } from 'express';

import { CreateCityController } from '@modules/cities/useCases/createCity/CreateCityController';

const citiesRoutes = Router();

const createCityController = new CreateCityController();

citiesRoutes.post('/', createCityController.handle);

export { citiesRoutes };
