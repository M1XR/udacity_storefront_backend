import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/orderModel';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const orders = await store.show(req.params.id);
  res.json(orders);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status
    };

    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400).json(err);
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      id: req.body.id,
      user_id: req.body.user_id,
      status: req.body.status
    };
    const editedOrder = await store.edit(order);
    res.json(editedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.send(`Order ${deleted.id} was deleted!`);
};

const current = async (_req: Request, res: Response) => {
  const orders = await store.currentOrders();
  res.json(orders);
};

const complete = async (_req: Request, res: Response) => {
  const orders = await store.completeOrders();
  res.json(orders);
};

const orderRoutes = (app: express.Application) => {
  app.get('/api/orders', index);
  app.get('/api/orders/:id', show);
  app.post('/api/orders', create);
  app.put('/api/orders', edit);
  app.delete('/api/orders/:id', destroy);
  app.get('/api/orders-current', current);
  app.get('/api/orders-complete', complete);
};

export default orderRoutes;
