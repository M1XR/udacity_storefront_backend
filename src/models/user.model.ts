// @ts-ignore
import Client from '../database';

export type User = {
  id?: number;
  first_name?: string;
  last_name?: string;
  user_name?: string;
  password?: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Users ${err}`);
    }
  }

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

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'INSERT INTO users (first_name, last_name, user_name, password) VALUES($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [u.first_name, u.last_name, u.user_name, u.password]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create User ${err}`);
    }
  }

  async edit(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'UPDATE users SET first_name=($2), last_name=($3), user_name=($4), password=($5) WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [u.id, u.first_name, u.last_name, u.user_name, u.password]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot edit User ${err}`);
    }
  }

  async delete(id: string): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete User ${err}`);
    }
  }
}
