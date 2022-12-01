import * as Yup from 'yup';
import HTTP_STATUS from '../../config/htttpStatus';

export async function ProductStoreValidator(request, response, next) {
  try {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      quantity: Yup.number().required(),
    });
    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (error) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Validation fails.', messages: error.inner });
  }
}

export async function ProductUpdateValidator(request, response, next) {
  try {
    const schema = Yup.object().shape({
      name: Yup.string(),
      quantity: Yup.number(),
      workflow: Yup.string(),
      order: Yup.number()
    });
    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (error) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Validation fails.', messages: error.inner });
  }
}
