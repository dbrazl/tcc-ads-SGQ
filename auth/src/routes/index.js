import { Router } from 'express';

import UserController from '../modules/user/controller';
import {SessionValidator} from '../modules/user/validators';

const routes = new Router();

routes.get('/health', UserController.health);
routes.post('/session', SessionValidator, UserController.session);

export default routes;
