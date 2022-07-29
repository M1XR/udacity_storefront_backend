import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order.model';
import verifyOrderStatus from '../middleware/verifyOrderStatus';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      user_id: req.body.user_id,
      status: req.body.status
    };
    const newOrder = await store.create(order);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
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
  try {
    const deleted = await store.delete(req.params.id);
    res.send(`Order ${deleted.id} was deleted!`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id;
  const productId: number = req.body.product_id;
  const quantity: number = req.body.quantity;

  try {
    const addedProduct = await store.addProduct(orderId, productId, quantity);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const current = async (req: Request, res: Response) => {
  try {
    const orders = await store.currentOrders(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const completed = async (req: Request, res: Response) => {
  try {
    const orders = await store.completedOrders(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/api/orders', verifyAuthToken, create);
  app.put('/api/orders', verifyAuthToken, edit);
  app.delete('/api/orders/:id', verifyAuthToken, destroy);
  app.post('/api/orders/:id/products', verifyAuthToken, verifyOrderStatus, addProduct);
  app.get('/api/orders/:id/current', verifyAuthToken, current);
  app.get('/api/orders/:id/complete', verifyAuthToken, completed);
};

export default orderRoutes;
