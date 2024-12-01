import bcrypt from 'bcrypt'
import config from '../config'
export const HashPassword = async (payload: string) => {
  const password = bcrypt.hashSync(payload, Number(config.salt))
  return password
}
