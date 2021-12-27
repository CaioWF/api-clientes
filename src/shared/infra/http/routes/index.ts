import { Router } from 'express';

import { citiesRoutes } from './city.routes';
import { clientsRoutes } from './client.routes';

const router = Router();

router.use('/cities', citiesRoutes);
router.use('/clients', clientsRoutes);

export { router };
