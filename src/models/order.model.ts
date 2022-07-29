// @ts-ignore
import Client from '../database';

export type Order = {
  id?: number;
  user_id?: number;
  status?: string;
};

export class OrderStore {
  // create new order with status='active'
  async create(o: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
      const result = await conn.query(sql, [o.user_id, 'active']);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`(model) Cannot create Order / Error: ${err}`);
    }
  }

  // update order status from active to complete
  async updateStatusComplete(id: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'UPDATE orders SET status=($2) WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id, 'complete']);
      conn.release();
      return result;
    } catch (err) {
      throw new Error(`(model) Cannot complete Order ${id} / Error: ${err}`);
    }
  }

  // add a Product to order_products (join table)
  // references to orders.id and products.id
  async addProduct(
    order_id: string,
    product_id: string,
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
      throw new Error(`(model) Cannot add Product ${product_id} to Order ${order_id} / Error: ${err}`);
    }
  }

  // update quantity in order_products (join table)
  async updateQuantity(
    id: string,
    quantity: number
  ): Promise<{ id: number; order_id: string; product_id: string; quantity: number }> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'UPDATE order_products SET quantity=($2) WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id, quantity]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`(model) Cannot update Quantity ${quantity} / Error: ${err}`);
    }
  }

  // delete a product from order_products (join table)
  async deleteProduct(id: string): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'DELETE FROM order_products WHERE id=($1) RETURNING *';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Cannot delete Order ${err}`);
    }
  }

  // get the actice order with referenced products data from order_products table
  async currentOrderByUser(id: string): Promise<
    {
      order_id: string;
      user_name: string;
      user_id: string;
      name: string;
      product_id: string;
      price: number;
      quantity: number;
      sum_price: number;
    }[]
  > {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT order_id, user_name, users.id AS user_id, products.name, product_id, price, SUM(quantity) AS quantity, price*SUM(quantity) AS sum_price FROM order_products INNER JOIN orders ON orders.id = order_products.order_id INNER JOIN users ON users.id = orders.user_id INNER JOIN products ON order_products.product_id=products.id WHERE user_id=($2) AND status=($1) GROUP BY product_id, order_id, user_name, users.id, products.name, products.price';
      const result = await conn.query(sql, ['active', id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Order ${err}`);
    }
  }

  // get the completed orders with referenced products data from order_products table
  async completedOrdersByUser(id: string): Promise<
    {
      order_id: string;
      user_name: string;
      user_id: string;
      name: string;
      product_id: string;
      price: number;
      quantity: number;
      sum_price: number;
    }[]
  > {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT order_id, user_name, users.id AS user_id, products.name, product_id, price, SUM(quantity) AS quantity, price*SUM(quantity) AS sum_price FROM order_products INNER JOIN orders ON orders.id = order_products.order_id INNER JOIN users ON users.id = orders.user_id INNER JOIN products ON order_products.product_id=products.id WHERE user_id=($2) AND status=($1) GROUP BY product_id, order_id, user_name, users.id, products.name, products.price';
      const result = await conn.query(sql, ['complete', id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Cannot get Order ${err}`);
    }
  }
}
