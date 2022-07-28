//@ts-ignore
import Client from '../database';

export class DashboardQueries {
  async mostPopular(): Promise<{ productname: string; price: number; order_id: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT name, price, category FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY products.id ORDER BY COUNT(order_products.product_id) DESC LIMIT 5';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
}
