import { ProductStore } from '../../models/product.model';
import { OrderStore } from '../../models/order.model';
import { UserStore } from '../../models/user.model';

const order = new OrderStore();
const prod = new ProductStore();
const user = new UserStore();

describe('Order Model', () => {
  beforeAll(async () => {
    await user.create({
      user_name: 'userTest0',
      first_name: 'firstTest0',
      last_name: 'lastTest0',
      password: 'passTest0'
    });
    await prod.create({
      name: 'proTest0',
      price: 1,
      category: 'catTest0'
    });
  });
  describe('Methods exists', () => {
    it('should have a create method', () => {
      expect(order.create).toBeDefined();
    });

    it('should have an updateStatusComplete method', () => {
      expect(order.updateStatusComplete).toBeDefined();
    });

    it('should have a addProduct method', () => {
      expect(order.addProduct).toBeDefined();
    });

    it('should have an updateQuantity method', () => {
      expect(order.updateQuantity).toBeDefined();
    });

    it('should have an deleteProduct method', () => {
      expect(order.deleteProduct).toBeDefined();
    });

    it('should have an currentOrderByUser method', () => {
      expect(order.currentOrderByUser).toBeDefined();
    });

    it('should have an completedOrdersByUser method', () => {
      expect(order.completedOrdersByUser).toBeDefined();
    });
  });

  describe('Methods run', () => {
    it('create method should return new order', async () => {
      const result = await order.create('1');
      expect(result.user_id).toEqual('1');
      expect(result.status).toEqual('active');
    });

    it('addProduct method should return the added product', async () => {
      const result = await order.addProduct('1', '1', 1);
      expect(result.order_id).toEqual('1');
      expect(result.product_id).toEqual('1');
      expect(result.quantity).toEqual(1);
    });

    it('currentOrderByUser method should return a list of orders', async () => {
      await order.create('1');
      const result = await order.currentOrderByUser('1');
      expect(result[0].order_id).toEqual('1');
      expect(result[0].user_name).toEqual('userTest0');
      expect(result[0].name).toEqual('proTest0');
      expect(result[0].product_id).toEqual('1');
      expect(result[0].price).toBeCloseTo(1);
      expect(result[0].quantity).toEqual('1');
      expect(result[0].sum_price).toBeCloseTo(1);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('updateStatusComplete method should update order status', async () => {
      const result = await order.updateStatusComplete('1');
      expect(result.status).toEqual('complete');
    });

    it('completedOrdersByUser method should return a list of oders', async () => {
      const result = await order.completedOrdersByUser('1');
      expect(result[0].order_id).toEqual('1');
      expect(result[0].user_name).toEqual('userTest0');
      expect(result[0].name).toEqual('proTest0');
      expect(result[0].product_id).toEqual('1');
      expect(result[0].price).toBeCloseTo(1);
      expect(result[0].quantity).toEqual('1');
      expect(result[0].sum_price).toBeCloseTo(1);
      expect(result.length).toBeGreaterThanOrEqual(1);
    });

    it('updateQuantity method should update quantity', async () => {
      const result = await order.updateQuantity('1', '1', 2);
      expect(result.order_id).toEqual('1');
      expect(result.product_id).toEqual('1');
      expect(result.quantity).toEqual(2);
    });

    it('deleteProduct method should delete product', async () => {
      const result = await order.deleteProduct('1', '1');
      expect(result).toEqual('Product 1 was deleted from Order 1 / [object Object]');
    });
  });
});
