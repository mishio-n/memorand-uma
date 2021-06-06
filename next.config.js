require('dotenv').config({ path: 'prisma/.env' })
const withPWA = require('next-pwa')

module.exports = withPWA({
  env: {
    SLACK_CLIENT_ID: process.env.SLACK_CLIENT_ID,
    SLACK_CLIENT_SECRET: process.env.SLACK_CLIENT_SECRET,
    LINE_CHANNEL_ID: process.env.LINE_CHANNEL_ID,
    LINE_CHANNEL_SECRET: process.env.LINE_CHANNEL_SECRET
  },
  pwa: {
    dest: 'public'
  }
})
