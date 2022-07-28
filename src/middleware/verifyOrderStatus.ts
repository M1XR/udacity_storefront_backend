//@ts-ignore
import Client from '../database';
import { Request, Response, NextFunction } from 'express';

const verifyOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sql = 'SELECT status FROM orders WHERE id=($1)';
    //@ts-ignore
    const conn = await Client.connect();
    const result = await conn.query(sql, [req.body.order_id]);
    const order = result.rows[0];
    conn.release();

    if (order.status !== 'active') {
      throw new Error(
        `Could not add product ${req.body.product_id} to order ${req.body.order_id} because order status is ${order.status}`
      );
    } else {
      next();
    }
  } catch (err) {
    throw new Error(err as string);
  }
};

export default verifyOrderStatus;
