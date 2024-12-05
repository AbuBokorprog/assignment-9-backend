import { JwtPayload } from 'jsonwebtoken'
import { Request } from 'express'

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload // Replace `any` with the appropriate type of `user` (e.g., `User` interface)
    }
  }
}
