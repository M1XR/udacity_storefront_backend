// @ts-ignore
import Client from '../database';

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password_digest: string;
};

export class ProductStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Products ${err}`);
    }
  }
}
