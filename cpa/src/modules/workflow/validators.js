import * as Yup from 'yup';
import HTTP_STATUS from '../../config/htttpStatus';

export async function WorkflowObjectValidator(request, response, next) {
  try {

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      steps: Yup.array().required(),
    });
    await schema.validate(request.body, { abortEarly: false });

    const stepSchema = Yup.object().shape({
      order: Yup.number().required(),
      status: Yup.string().required(),
      key: Yup.string(),
      toOrder: Yup.number(),
      end: Yup.boolean(),
    });

    await Promise.all(request.body.steps.map(
      async (step) => await stepSchema.validate(step, { abortEarly: false }))
    );


    return next();
  } catch (error) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Validation fails.', messages: error.inner });
  }
}
