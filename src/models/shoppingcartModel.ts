// @ts-ignore
import Client from '../database';

export type Cart = {
  id?: number;
  order_id: number;
  product_id: number;
  quantity: number;
};

export class CartStore {
  async index(): Promise<Cart[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM shoppingcart';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Shoppingcart Items ${err}`);
    }
  }

  async show(id: string): Promise<Cart> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM shoppingcart WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot get Shoppingcart Item ${err}`);
    }
  }
  async create(c: Cart): Promise<Cart> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO shoppingcart (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [
        c.order_id,
        c.product_id,
        c.quantity
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot create Shoppingcart Item ${err}`);
    }
  }

  async edit(c: Cart): Promise<Cart> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'UPDATE shoppingcart SET order_id=($2), product_id=($3), quantity=($4) WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [
        c.id,
        c.order_id,
        c.product_id,
        c.quantity
      ]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot edit Shoppingcart Item ${err}`);
    }
  }

  async delete(id: string): Promise<Cart> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'DELETE FROM shoppingcart WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete Shoppingcart Item ${err}`);
    }
  }
}
