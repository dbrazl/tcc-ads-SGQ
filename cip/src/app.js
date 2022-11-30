import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import './database';

import routes from './routes';
import ProductionProblem from './models/ProductionProblem';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.createDatabase();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  routes() {
    this.server.use(routes);
  }

  async createDatabase() {
    await ProductionProblem.sync()
  }
}

export default new App().server;
