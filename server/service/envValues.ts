import dotenv from 'dotenv'

dotenv.config({ path: '../prisma/.env' })

const SERVER_PORT = process.env.SERVER_PORT || 8080
const BASE_PATH = process.env.BASE_PATH || '/api'
const API_ORIGIN = process.env.API_ORIGIN || 'http://localhost:8080'
const SLACK_CHANNEL = process.env.SLACK_CHANNEL || ''
const SLACK_TOKEN = process.env.SLACK_TOKEN || ''
const APP_URL = process.env.APP_URL || 'http://localhost:3000'

export {
  SERVER_PORT,
  BASE_PATH,
  API_ORIGIN,
  SLACK_CHANNEL,
  SLACK_TOKEN,
  APP_URL
}
