// @ts-ignore
import Client from '../database';

export type Order = {
  id?: number;
  user_id?: number;
  status?: string;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Orders ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get Order ${err}`);
    }
  }
  async create(o: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.user_id, o.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create Order ${err}`);
    }
  }

  async edit(o: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'UPDATE orders SET user_id=($2), status=($3) WHERE id=($1)';
      const result = await conn.query(sql, [o.id, o.user_id, o.status]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot edit Order ${err}`);
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'DELETE FROM orders WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete Order ${err}`);
    }
  }
}
