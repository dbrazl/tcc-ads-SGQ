import * as Yup from 'yup';
import HTTP_STATUS from '../../config/htttpStatus';

export async function SessionValidator (request, response, next) {
  try {
    const schema = Yup.object().shape({
      username: Yup.string().required(),
      password: Yup.string().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    return next();
  } catch (error) {
    return response
      .status(HTTP_STATUS.BAD_REQUEST)
      .json({ error: 'Validation fails.', messages: error.inner });
  }
};
