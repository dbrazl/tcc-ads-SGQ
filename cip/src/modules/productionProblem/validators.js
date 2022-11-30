import * as Yup from 'yup';
import HTTP_STATUS from '../../config/htttpStatus';

export async function ProductProblemObjectValidator (request, response, next) {
  try {
    const schema = Yup.object().shape({
      status: Yup.string().required(),
      type: Yup.string().required(),
      workShift: Yup.string().required(),
      date: Yup.string().required(),
      description: Yup.string().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (error) {
    return response
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: 'Validation fails.', messages: error.inner });
  }
};
