// @ts-ignore
import Client from '../database';

export type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
};

export class ProductStore {
  // get all products
  // ordered by name ascending
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products ORDER BY name ASC';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`(model) Cannot get Products / Error: ${err}`);
    }
  }

  // get specific product by id
  async show(id: string): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE id=($1)';
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`(model) Cannot get Product / Error: ${err}`);
    }
  }

  // create new product
  async create(p: Product): Promise<Product> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'INSERT INTO products(name, price, category) VALUES($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [p.name, p.price, p.category]);
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`(model) Cannot create Product / Error: ${err}`);
    }
  }

  // get products by specific category
  async byCategory(cat: string): Promise<Product[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT id, name, price FROM products WHERE category=($1)';
      const result = await conn.query(sql, [cat]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`(model) Cannot get Products by Category / Error: ${err}`);
    }
  }

  // get the five most popular products
  // grouped by product name
  // ordered by count of product_id in order_products
  async popularProducts(): Promise<{ name: string; price: number; category: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT name, price, category FROM products INNER JOIN order_products ON products.id = order_products.product_id GROUP BY products.id ORDER BY COUNT(order_products.product_id) DESC LIMIT 5';
      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`(model) Cannot get popular Products / Error: ${err}`);
    }
  }
}
