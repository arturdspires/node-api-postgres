import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'

const server = fastify()

const database = new DatabasePostgres() 

// Declare a route
server.post('/', async (request, reply) => {
  const { id, name, location } = request.body

  await database.create({
    id,
    name,
    location,
  })

  return reply.status(201).send()
})

server.get('/', async (request, reply) => {
    const search = request.query.search

    const parks = await  database.list(search)

    return parks
})

server.put('/:id', async (request, reply) => {
    const parkId = request.params.id
    const { name, location} = request.body

    await database.update(parkId, {
        name,
        location,
    })

    return reply.status(204).send()
})

server.delete('/:id', async (request, reply) => {
    const parkId = request.params.id

    await database.delete(parkId)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333,
})