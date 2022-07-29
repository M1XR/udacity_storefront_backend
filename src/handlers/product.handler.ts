import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product.model';
import verifyAuthToken from '../middleware/verifyAuthToken';

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

const productRoutes = (app: express.Application) => {
  app.get('/api/products', verifyAuthToken, index);
  app.get('/api/products/:id', show);
  app.post('/api/products', verifyAuthToken, create);
};

export default productRoutes;
