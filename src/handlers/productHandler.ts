import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/productModel';

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };

    const newProduct = await store.create(product);
    res.json(newProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const edit = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category
    };
    const editedProduct = await store.edit(product);
    res.json(editedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const deleted = await store.delete(req.params.id);
    res.send(`Product ${deleted.name} was deleted!`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const indexPopular = async (_req: Request, res: Response) => {
  try {
    const products = await store.indexPopular();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const groupByCategory = async (req: Request, res: Response) => {
  try {
    const products = await store.byCategory(req.params.category);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/api/products', index);
  app.get('/api/products/:id', show);
  app.post('/api/products', create);
  app.put('/api/products', edit);
  app.delete('/api/products/:id', destroy);
  app.get('/api/products-popular', indexPopular);
  app.get('/api/products-category/:category', groupByCategory);
};

export default productRoutes;
