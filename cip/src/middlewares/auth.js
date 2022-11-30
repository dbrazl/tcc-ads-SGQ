import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../config/auth';
import HTTP_STATUS from '../config/htttpStatus';

export default async (request, response, next) => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Token is not provide.' });
  }

  const [, token] = authorization.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    request.userId = decoded.id;

    return next();
  } catch (error) {
    return response.status(HTTP_STATUS.BAD_REQUEST).json({ error: 'Token invalid.' });
  }
};
