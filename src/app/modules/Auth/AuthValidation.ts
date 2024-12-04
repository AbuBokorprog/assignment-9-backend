import { z } from 'zod'

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
})

export const authValidation = { refreshTokenValidationSchema }
