import HTTP_STATUS from "../../config/htttpStatus";
import { Workflow } from "../../models/Workflow";

class MedicinesController {
  async index(request, response) {
    try {
      const workflows = await Workflow.find();

      return response.status(HTTP_STATUS.OK).json(workflows);
    } catch (error) {
      return response.status(HTTP_STATUS.SERVER_ERROR).json({ message: error.message });
    }
  }

  async store(request, response) {
    try {
      const workflow = await Workflow.create(request.body);

      return response.status(HTTP_STATUS.OK).json(workflow);
    } catch (error) {
      return response.status(HTTP_STATUS.SERVER_ERROR).json({ message: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      const workflow = await Workflow.findOne({ _id: id });

      if (!workflow)
        return response.status(HTTP_STATUS.NOT_FOUND).json({ error: 'O Workflow não existe' });

      await Workflow.deleteOne({ _id: id });

      return response.status(HTTP_STATUS.OK).json();
    } catch (error) {
      return response.status(HTTP_STATUS.SERVER_ERROR).json({ message: error.message });
    }
  }
}

export default new MedicinesController();
