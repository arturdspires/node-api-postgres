import { randomUUID } from "node:crypto"
import { sql } from './db.js'

export class DatabasePostgres {
    async list(search) {
        let parks

        if(search) {
            parks = await sql`select * from parks where name ilike ${'%' + search + '%'}`
        } else {
            parks = await sql`select * from parks`
        }
        
        return parks
    }

    async create(park) {
        const parkId = randomUUID()
        const { name, location} = park

        await sql`insert into parks (id, name, location) VALUES (${parkId}, ${name}, ${location})`
    }

    async update(id, park) {
        const {name, location} = park

        await sql`update parks set name = ${name}, location = ${location} where id = ${id}`
    }

    async delete(id) {
        await sql`delete from parks where id = ${id}`
    }
}