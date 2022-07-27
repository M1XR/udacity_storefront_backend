import express, { Request, Response } from 'express';
import { Cart, CartStore } from '../models/shoppingcartModel';

const store = new CartStore();

const index = async (_req: Request, res: Response) => {
  const cartItems = await store.index();
  res.json(cartItems);
};

const show = async (req: Request, res: Response) => {
  const cartItems = await store.show(req.params.id);
  res.json(cartItems);
};

const create = async (req: Request, res: Response) => {
  try {
    const cartItem: Cart = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };

    const newCartItem = await store.create(cartItem);
    res.json(newCartItem);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const cartItem: Cart = {
      id: req.body.id,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };

    const editedCartItem = await store.edit(cartItem);
    res.json(editedCartItem);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.params.id);
  res.send(`Shoppingcart Item ${deleted.id} was deleted!`);
};

const cartRoutes = (app: express.Application) => {
  app.get('/api/cart', index);
  app.get('/api/cart/:id', show);
  app.post('/api/cart', create);
  app.put('/api/cart', edit);
  app.delete('/api/cart/:id', destroy);
};

export default cartRoutes;
