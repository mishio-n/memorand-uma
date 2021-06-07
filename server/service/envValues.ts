import dotenv from 'dotenv'

dotenv.config({ path: '../prisma/.env' })

const SERVER_PORT = process.env.SERVER_PORT || 8080
const BASE_PATH = process.env.BASE_PATH || '/api'
const API_ORIGIN = process.env.API_ORIGIN || 'http://localhost:8080'
const LINE_ROOM_ID = process.env.LINE_ROOM_ID || ''
const LINE_ACCESS_TOKEN = process.env.LINE_ACCESS_TOKEN || ''
const APP_URL = process.env.APP_URL || 'http://localhost:3000'
const RACECOURSE_API_URL = process.env.RACECOURSE_API_URL || ''
const RACECOURSE_API_KEY = process.env.RACECOURSE_API_KEY || ''

export {
  SERVER_PORT,
  BASE_PATH,
  API_ORIGIN,
  LINE_ROOM_ID,
  LINE_ACCESS_TOKEN,
  APP_URL,
  RACECOURSE_API_URL,
  RACECOURSE_API_KEY
}
