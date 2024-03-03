import { sql } from './db.js'

sql
`
CREATE TABLE parks (
        id TEXT PRIMARY KEY, 
        name TEXT, 
        location TEXT
);
`.then(() => {
    console.log('Tabela criada!')
})