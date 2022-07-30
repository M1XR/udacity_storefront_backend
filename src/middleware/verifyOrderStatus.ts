/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-ignore
import Client from '../database';
import { Request, Response, NextFunction } from 'express';

export const verifyNotActive = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sql = 'SELECT status FROM orders WHERE id=($1)';
    //@ts-ignore
    const conn = await Client.connect();
    const result = await conn.query(sql, [req.body.order_id]);
    const order = result.rows[0];
    conn.release();

    if (order.status !== 'active') {
      res.json(`Order Status is not active`);
    } else {
      next();
    }
  } catch (err) {
    res.json(err as string);
  }
};

export const verifyNotComplete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sql = 'SELECT status FROM orders WHERE id=($1)';
    //@ts-ignore
    const conn = await Client.connect();
    const result = await conn.query(sql, [req.params.id]);
    const order = result.rows[0];
    conn.release();

    if (order.status !== 'complete') {
      next();
    } else {
      res.json('Order Status is currently complete');
    }
  } catch (err) {
    res.json(err as string);
  }
};
