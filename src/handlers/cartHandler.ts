import express, { Request, Response } from 'express';
import { Cart, CartStore } from '../models/cartModel';

const store = new CartStore();

const index = async (_req: Request, res: Response) => {
  try {
    const cart = await store.index();
    res.json(cart);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const cart = await store.show(req.params.id);
    res.json(cart);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const cart: Cart = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };

    const newCart = await store.create(cart);
    res.json(newCart);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const cart: Cart = {
      id: req.body.id,
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity
    };

    const editedCart = await store.edit(cart);
    res.json(editedCart);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.send(`Cart ${deleted.id} was deleted!`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const cartRoutes = (app: express.Application) => {
  app.get('/api/cart', index);
  app.get('/api/cart/:id', show);
  app.post('/api/cart', create);
  app.put('/api/cart', edit);
  app.delete('/api/cart/:id', destroy);
};

export default cartRoutes;
