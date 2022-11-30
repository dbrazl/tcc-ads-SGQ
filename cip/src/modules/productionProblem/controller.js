import HTTP_STATUS from "../../config/htttpStatus";
import ProductionProblem from '../../models/ProductionProblem';

class ProductionProblemController {
  async health(request, response) {
    return response.status(HTTP_STATUS.OK).json({
      application: 'on'
    });
  }

  async index(request, response) {
    const problems = await ProductionProblem.findAll();

    if (!problems) {
      response.status(HTTP_STATUS.NOT_FOUND).json({ error: 'Não há problemas de produção cadastrados' });
    }

    return response.status(HTTP_STATUS.OK).json(problems);
  }

  async create(request, response) {
    const {
      id,
      status,
      type,
      workShift,
      date,
      description,
    } = await ProductionProblem.create(request.body);

    return response.status(HTTP_STATUS.CREATED).json({
      id,
      status,
      type,
      workShift,
      date,
      description,
    });
  }

  async update(request, response) {
    const { id } = request.params;

    const problem = await ProductionProblem.findByPk(id);

    if (!problem) {
      return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Problema de produção não existe' });
    }

    const updated = await problem.update(request.body);

    return response.status(HTTP_STATUS.OK).json(updated);
  }

  async delete(request, response) {
    const { id } = request.params;

    const problem = await ProductionProblem.findByPk(id);

    if (!problem) {
      return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Problema de produção não existe' });
    }

    await ProductionProblem.destroy({ where: { id } });

    return response.status(HTTP_STATUS.OK).json();
  }
}

export default new ProductionProblemController();
