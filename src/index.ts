import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'
import * as dotenv from 'dotenv'
import helmet from 'helmet'
import UsersRoutes from './routes/users'
import ProductsRoutes from './routes/products'
import OrdersRoutes from './routes/orders'
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit'


dotenv.config()

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
app.use(bodyParser.json())
// HTTP request logger middleware
app.use(morgan('short'))
app.use(helmet());
// add routing for / path
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})
// Apply the rate limiting middleware to all requests
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 1 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'el3b b3ed ya ro7 mama',
  })
)
//routes
UsersRoutes(app);
ProductsRoutes(app);
OrdersRoutes(app);
// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app