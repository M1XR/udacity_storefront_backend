import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product.model';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new ProductStore();

// get all products
const index = async (_req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// show product with specific id
const show = async (req: Request, res: Response) => {
  try {
    const product = await store.show(req.params.id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//  create product
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

// get products by specific category
const getByCategory = async (req: Request, res: Response) => {
  try {
    const products = await store.byCategory(req.params.category);
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// get the five most popular products
const getPopularProducts = async (_req: Request, res: Response) => {
  try {
    const products = await store.popularProducts();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products/popular', getPopularProducts);
  app.get('/products/category/:category', getByCategory);
  app.get('/products/:id', show);
  app.get('/products', index);
  app.post('/products', verifyAuthToken, create);
};

export default productRoutes;
