import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { PG_HOST, PG_DB, PG_DB_TEST, PG_USER, PG_PW, ENV } = process.env;

let client;
console.log(ENV);

if (ENV === 'dev') {
  client = new Pool({
    host: PG_HOST,
    database: PG_DB,
    user: PG_USER,
    password: PG_PW
  });
}

if (ENV === 'test') {
  client = new Pool({
    host: PG_HOST,
    database: PG_DB_TEST,
    user: PG_USER,
    password: PG_PW
  });
}

export default client;
