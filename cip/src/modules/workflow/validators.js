import * as Yup from 'yup';
import HTTP_STATUS from '../../config/htttpStatus';

export async function WorkflowStoreValidator(request, response, next) {
  try {
    const schema = Yup.object().shape({
      order: Yup.number().required(),
      status: Yup.number().string(),
      key: Yup.string(),
      toOrder: Yup.number(),
      end: Yup.boolean(),
    });
    schema.parse(request.body);

    return next();
  } catch (error) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json(errorHandler({ error: 'Validation fails.', messages: error.inner }));
  }
}
