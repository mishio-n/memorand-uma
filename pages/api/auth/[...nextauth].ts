import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { InitOptions } from 'next-auth'
import Adapters from 'next-auth/adapters'
import Providers from 'next-auth/providers'

const prisma = new PrismaClient()

const options: InitOptions = {
  providers: [
    Providers.Slack({
      clientId: '542468805282.1594618548759',
      clientSecret: '2809e53ea4d7459718c489b4f3670a6a'
    })
  ],
  adapter: Adapters.Prisma.Adapter({ prisma })
}

export default (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)
