import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'

const prisma = new PrismaClient()

const options: NextAuthOptions = {
  providers: [
    Providers.LINE({
      clientId: process.env.LINE_CHANNEL_ID || '',
      clientSecret: process.env.LINE_CHANNEL_SECRET || ''
    })
  ],
  adapter: Adapters.Prisma.Adapter({ prisma })
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
