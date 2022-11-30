import { Router } from 'express';

import ProductionProblemController from '../modules/productionProblem/controller';
import {ProductProblemObjectValidator} from '../modules/productionProblem/validators';

import AuthMiddleware from '../middlewares/auth';

const routes = new Router();

routes.get('/health', ProductionProblemController.health);

routes.use(AuthMiddleware);

routes.get('/production/problem', ProductionProblemController.index);
routes.post('/production/problem', ProductProblemObjectValidator, ProductionProblemController.create);
routes.put('/production/problem/:id', ProductProblemObjectValidator, ProductionProblemController.update);
routes.delete('/production/problem/:id', ProductionProblemController.delete);

export default routes;
