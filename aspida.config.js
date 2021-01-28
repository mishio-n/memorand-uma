require('dotenv').config({ path: 'prisma/.env' })

module.exports = {
  input: 'server/api',
  baseURL: `${process.env.API_ORIGIN || ''}${process.env.BASE_PATH || ''}`
}
