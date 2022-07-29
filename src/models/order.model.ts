// @ts-ignore
import Client from '../database';

export type Order = {
  id?: number;
  user_id: number;
  status: string;
};

export class OrderStore {
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
      const sql = 'UPDATE orders SET user_id=($2), status=($3) WHERE id=($1) RETURNING *';
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
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete Order ${err}`);
    }
  }

  async addProduct(
    order_id: string,
    product_id: number,
    quantity: number
  ): Promise<{ id: number; order_id: string; product_id: string; quantity: number }> {
    try {
      const sql = 'INSERT INTO order_products (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();
      const result = await conn.query(sql, [order_id, product_id, quantity]);
      const order = result.rows[0];
      console.log(order);
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Cannot add Product to Order ${err}`);
    }
  }

  async currentOrders(id: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE status=($1) AND user_id=($2)';
      const result = await conn.query(sql, ['active', id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Order ${err}`);
    }
  }

  async completedOrders(id: string): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE status=($1) AND user_id=($2)';
      const result = await conn.query(sql, ['complete', id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Order ${err}`);
    }
  }
}
