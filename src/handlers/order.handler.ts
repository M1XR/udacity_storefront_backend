import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order.model';
import { verifyNotActive, verifyNotComplete } from '../middleware/verifyOrderStatus';
import verifyAuthToken from '../middleware/verifyAuthToken';

const store = new OrderStore();

// create new order with status='active'
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
  const orderId: string = req.params.id;
  const productId: string = req.body.product_id;
  const quantity: number = req.body.quantity;

  try {
    const addedProduct = await store.addProduct(orderId, productId, quantity);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// update quantity in order_products (join table)
const updateQuantity = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const quantity = req.body.quantity;

    const editedOrder = await store.updateQuantity(id, quantity);
    res.json(editedOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// delete a product from order_products (join table)
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const result = await store.deleteProduct(req.params.id);
    res.json(result);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// get the actice order with referenced products data from order_products table
const currentOrderByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.currentOrderByUser(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

// get the completed orders with referenced products data from order_products table
const completedOrdersByUser = async (req: Request, res: Response) => {
  try {
    const orders = await store.completedOrdersByUser(req.params.id);
    res.json(orders);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/orders', verifyAuthToken, create);
  app.post('/orders/add-product/:id', verifyAuthToken, verifyNotActive, addProduct);
  app.delete('/orders/delete-product/:id', verifyAuthToken, deleteProduct);
  app.put('/orders/update-quantity/:id', verifyAuthToken, updateQuantity);
  app.put('/orders/update-status/:id', verifyAuthToken, verifyNotComplete, updateStatusComplete);
  app.get('/orders/current/:id', verifyAuthToken, currentOrderByUser);
  app.get('/orders/completed/:id', verifyAuthToken, completedOrdersByUser);
};

export default orderRoutes;
