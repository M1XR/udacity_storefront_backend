//@ts-ignore
import Client from '../database';
import { Request, Response, NextFunction } from 'express';

const verifyOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sql = 'SELECT status FROM orders WHERE id=($1)';
    //@ts-ignore
    const conn = await Client.connect();
    const result = await conn.query(sql, [req.params.id]);
    const order = result.rows[0];
    conn.release();

    if (order.status !== 'active') {
      res.json(
        `Could not add product ${req.body.product_id} to order ${req.params.id} because order status is ${order.status}`
      );
    } else {
      next();
    }
  } catch (err) {
    res.json(err as string);
  }
};

export default verifyOrderStatus;
