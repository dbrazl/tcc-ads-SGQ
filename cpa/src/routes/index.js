import { Router } from 'express';

import HealthController from '../modules/health/controller';
import WorflowController from '../modules/workflow/controller';
import {WorkflowObjectValidator} from '../modules/workflow/validators';
import ProductController from '../modules/product/controller';
import {ProductStoreValidator, ProductUpdateValidator} from '../modules/product/validators'

import AuthMiddleware from '../middlewares/auth';

const routes = new Router();

routes.get('/health', HealthController.health);

routes.use(AuthMiddleware);

routes.get('/workflow', WorflowController.index);
routes.post('/workflow', WorkflowObjectValidator, WorflowController.create);
routes.put('/workflow/:id', WorkflowObjectValidator, WorflowController.update);
routes.delete('/workflow/:id', WorflowController.delete);

routes.get('/product', ProductController.index);
routes.post('/product', ProductStoreValidator, ProductController.create);
routes.put('/product/:id', ProductUpdateValidator, ProductController.update);
routes.delete('/product/:id', ProductController.delete);

export default routes;
