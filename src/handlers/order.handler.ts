import express, { Request, Response } from 'express';
import { OrderStore } from '../models/order.model';
import { verifyNotActive, verifyNotComplete } from '../middleware/verifyOrderStatus';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new OrderStore();

// create new order with status='active'
const create = async (req: Request, res: Response) => {
  try {
    const user_id = req.params.userId;
    const newOrder = await store.create(user_id);
    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// update order status from active to complete
const updateStatusComplete = async (req: Request, res: Response) => {
  try {
    const result = await store.updateStatusComplete(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// add a Product to order_products (join table)
// references to orders.id and products.id
const addProduct = async (req: Request, res: Response) => {
  const order_id: string = req.body.order_id;
  const product_id: string = req.body.product_id;
  const quantity: number = req.body.quantity;

  try {
    const addedProduct = await store.addProduct(order_id, product_id, quantity);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// update quantity in order_products (join table)
const updateQuantity = async (req: Request, res: Response) => {
  try {
    const order_id = req.body.order_id;
    const product_id = req.body.product_id;
    const quantity = req.body.quantity;

    const editedOrder = await store.updateQuantity(order_id, product_id, quantity);
    res.json(editedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// delete a product from order_products (join table)
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const order_id = req.body.order_id;
    const product_id = req.body.product_id;

    const result = await store.deleteProduct(order_id, product_id);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// get the actice order with referenced products data from order_products table
const currentOrderByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.currentOrderByUser(req.params.userId);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// get the completed orders with referenced products data from order_products table
const completedOrdersByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.completedOrdersByUser(req.params.userId);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/orders/add-product', verifyAuthToken, verifyNotActive, addProduct);
  app.delete('/orders/delete-product', verifyAuthToken, deleteProduct);
  app.put('/orders/update-qty', verifyAuthToken, updateQuantity);
  app.put('/orders/update-status/:id', verifyAuthToken, verifyNotComplete, updateStatusComplete);
  app.get('/orders/curr-by-user/:userId', verifyAuthToken, currentOrderByUser);
  app.get('/orders/com-by-user/:userId', verifyAuthToken, completedOrdersByUser);
  app.post('/orders/:userId', verifyAuthToken, create);
};

export default orderRoutes;
