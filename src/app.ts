import express, { Request, Response } from 'express'
const app = express()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import router from './app/routers'
import GlobalErrorHandler from './app/middlewares/GlobalErrorHandler'
import NotFoundErrorHandler from './app/middlewares/NotFoundErrorHandler'

app.use(express.json())
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send('BazaarBridge Home page!')
})

app.use('/api', router)
app.use(GlobalErrorHandler)
app.use(NotFoundErrorHandler)

export default app
