import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product.model';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const products = await store.index();
  res.json(products);
};

const show = async (req: Request, res: Response) => {
  const product = await store.show(req.params.id);
  res.json(product);
};

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      id: req.body.id,
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
  const deleted = await store.delete(req.params.id);
  res.send(`Product ${deleted.name} was deleted!`);
};

const productRoutes = (app: express.Application) => {
  app.get('api/products', index);
  app.get('api/products/:id', show);
  app.post('api/products', create);
  app.put('api/products', edit);
  app.delete('api/products/:id', destroy);
};

export default productRoutes;
