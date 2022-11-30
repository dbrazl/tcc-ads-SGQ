import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createInitialData } from './config/initialData';

import './database';

import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    createInitialData();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
