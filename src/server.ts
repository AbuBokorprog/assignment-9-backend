import { Server } from 'http'
import app from './app'
import config from './app/config'
import { seedSuperAdmin } from './app/seed/seed'

async function main() {
  // ... you will write your Prisma Client queries here
  const server: Server = app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`)
    seedSuperAdmin()
  })
}

main()
