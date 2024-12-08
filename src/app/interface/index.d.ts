import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload // Or use your custom type for the decoded token
    }
  }
}

export interface DecodedToken {
  email: string
  role: string
  id: string
  exp: number
  [key: string]: any // If there are additional fields
}
