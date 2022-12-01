import axios from 'axios';
import HTTP_STATUS from "../../config/htttpStatus";
import { Product } from "../../models/Product";

class ProductController {
  async index(request, response) {
    try {
      const products = await Product.find();

      return response.status(HTTP_STATUS.OK).json(products);
    } catch (error) {
      return response.status(HTTP_STATUS.SERVER_ERROR).json({ message: error.message });
    }
  }

  async create(request, response) {
    try {
      const product = await Product.create(request.body);

      return response.status(HTTP_STATUS.OK).json(product);
    } catch (error) {
      return response.status(HTTP_STATUS.SERVER_ERROR).json({ message: error.message });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;

      const product = await Product.findOne({ where: { _id: id } });

      if (!product) {
        return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: "O producto ou insumo não existe." });
      }

      if (request.body.name) {
        product.name = request.body.name;
      }

      if (request.body.quantity) {
        product.quantity = request.body.quantity;
      }

      if (request.body.workflow) {
        product.workflow = request.body.workflow;
      }

      if (request.body.order && request.body.order < product.order) {
        const token = request.bearer.token;

        const body = {
          status: "problema",
          type: "logistica",
          workShift: "primeiro turno",
          date: new Date().toISOString(),
          description: "O administrador da empilhareira durrubou as chapas de aço T4571"
        };

        await axios.post('http://cip-api:3001/production/problem', body, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      if (request.body.order) {
        product.order = request.body.order;
      }

      const updated = await product.save();

      return response.status(HTTP_STATUS.OK).json(updated);
    } catch (error) {
      return response.status(HTTP_STATUS.SERVER_ERROR).json({ message: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      const product = await Product.findOne({ _id: id });

      if (!product)
        return response.status(HTTP_STATUS.NOT_FOUND).json({ error: 'O produto não existe' });

      await Product.deleteOne({ _id: id });

      return response.status(HTTP_STATUS.OK).json();
    } catch (error) {
      return response.status(HTTP_STATUS.SERVER_ERROR).json({ message: error.message });
    }
  }
}

export default new ProductController();
