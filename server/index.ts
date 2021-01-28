import Fastify from 'fastify'
import cors from 'fastify-cors'
import helmet from 'fastify-helmet'
import fastifyStatic from 'fastify-static'
import path from 'path'
import server from './$server'
import { BASE_PATH, SERVER_PORT } from './service/envValues'

const fastify = Fastify()

fastify.register(helmet)
fastify.register(cors)
fastify.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: BASE_PATH
})

server(fastify, { basePath: BASE_PATH })

fastify.listen(SERVER_PORT)
