import User from '../models/User';
import bcrypt from 'bcryptjs';

export async function createInitialData() {
  try {
    await User.sync({ force: true });

    await User.create({
      username: 'kable',
      password_hash: await bcrypt.hash('123456', 10)
    });
  } catch (error) {
    console.log(error);
  }

}
