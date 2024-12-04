import jwt from 'jsonwebtoken'

export const getAccessToken = async (
  payload: any,
  secret: string,
  expiresIn: string,
) => {
  const accessToken = jwt.sign(payload, secret, { expiresIn: expiresIn })

  return accessToken
}
