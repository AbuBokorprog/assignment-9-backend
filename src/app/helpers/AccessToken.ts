import jwt from 'jsonwebtoken'

export const getAccessToken = async (payload: any) => {
  const accessToken = jwt.sign(payload, 'secret', { expiresIn: '10d' })

  return accessToken
}
