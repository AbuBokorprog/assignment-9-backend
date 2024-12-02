import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  salt: process.env.SALT,
  access_token: process.env.ACCESS_TOKEN,
  access_expiresIn: process.env.EXPIRES_IN,
  refresh_token: process.env.REFRESH_TOKEN,
  refresh_expiresIn: process.env.REFRESH_EXPIRES_IN,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret_key: process.env.CLOUDINARY_SECRET_KEY,
}
