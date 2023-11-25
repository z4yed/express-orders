import bcrypt from 'bcrypt';
import config from '../config';

const saltRounds = config.salt_rounds;

export default async function hashPassword(password: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, Number(saltRounds));
    return hashedPassword;
  } catch (error) {
    throw new Error('Password hashing failed');
  }
}
