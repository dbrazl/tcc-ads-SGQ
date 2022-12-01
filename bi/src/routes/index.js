import { Router } from 'express';

import HealthController from '../modules/health/controller';

const routes = new Router();

routes.get('/health', HealthController.health);

export default routes;
