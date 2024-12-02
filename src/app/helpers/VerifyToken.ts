import jwt from 'jsonwebtoken'

export const VerifyToken = async (token: string) => {
  const decoded = jwt.verify(token, 'secret')

  return decoded
}
