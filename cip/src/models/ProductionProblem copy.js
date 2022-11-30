import Sequelize, { Model } from 'sequelize';

class ProductionProblem extends Model {
  static init(sequelize) {
    super.init(
      {
        status: Sequelize.STRING,
        type: Sequelize.STRING,
        workShift: Sequelize.STRING,
        date: Sequelize.STRING,
        description: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default ProductionProblem;
