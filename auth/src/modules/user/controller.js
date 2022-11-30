import HTTP_STATUS from "../../config/htttpStatus";
import jwt from 'jsonwebtoken';
import User from '../../models/User';
import auth from '../../config/auth';

class UserController {
  async health(request, response) {
    return response.status(HTTP_STATUS.OK).json({
      application: 'on'
    });
  }

  async session(request, response) {
    const { username, password } = request.body;

    const user = await User.findOne({ where: { username } });

    if (!user) {
      return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'Usuário não existe' });
    }

    if (!(await user.checkPassword(password))) {
      return response.status(HTTP_STATUS.UNAUTHORIZED).json({ error: 'A senha não bate' });
    }

    const token = jwt.sign({ id: user.id }, auth.secret, {
      expiresIn: auth.expiresIn,
    });



    return response.json({
      user: {
        id: user.id,
        username
      },
      token,
    });
  }
}

export default new UserController();
