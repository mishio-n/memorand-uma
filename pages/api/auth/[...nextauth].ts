import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { InitOptions } from 'next-auth'
import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'

const prisma = new PrismaClient()

const options: InitOptions = {
  providers: [
    Providers.Slack({
      clientId: process.env.SLACK_CLIENT_ID || '',
      clientSecret: process.env.SLACK_CLIENT_SECRET || ''
    })
  ],
  adapter: Adapters.Prisma.Adapter({ prisma })
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
