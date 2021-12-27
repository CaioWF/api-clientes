import { Router } from 'express';

import { CreateCityController } from '@modules/cities/useCases/createCity/CreateCityController';
import { ListCitiesController } from '@modules/cities/useCases/listCities/ListCitiesController';

const citiesRoutes = Router();

const createCityController = new CreateCityController();
const listCitiesController = new ListCitiesController();

citiesRoutes.post('/', createCityController.handle);
citiesRoutes.get('/', listCitiesController.handle);

export { citiesRoutes };
