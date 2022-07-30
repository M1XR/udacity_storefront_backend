/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

// import environment variables
dotenv.config();
const { BCRYPT_PW, SALT_ROUNDS } = process.env;

export type User = {
  id?: number;
  user_name?: string;
  first_name?: string;
  last_name?: string;
  password?: string;
  password_digest?: string;
};

export class UserStore {
  // get all users
  // ordered by last_name ascending
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users ORDER BY last_name ASC';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Users ${err}`);
    }
  }

  // get specific user by id
  async show(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get User ${err}`);
    }
  }

  // create new user
  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (user_name, first_name, last_name, password_digest) VALUES($1, $2, $3, $4) RETURNING *';

      // password hashing
      const pw = u.password as string;
      const hash = bcrypt.hashSync(pw + BCRYPT_PW, parseInt(SALT_ROUNDS as string));

      const result = await conn.query(sql, [u.user_name, u.first_name, u.last_name, hash]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create User ${err}`);
    }
  }

  // authenticate user with user_name and password
  async authenticate(user_name: string, password: string): Promise<{ password_digest: string } | string> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT password_digest FROM users WHERE user_name=($1)';
      const result = await conn.query(sql, [user_name]);
      conn.release();

      // password authentication with bcrypt if user_name exist in db
      if (result.rows.length) {
        const user = result.rows[0];

        if (bcrypt.compareSync(password + BCRYPT_PW, user.password_digest)) {
          return user;
        }
      }
      return 'Authentification failed';
    } catch (err) {
      throw new Error(`Cannot authenticate User ${err}`);
    }
  }
}
