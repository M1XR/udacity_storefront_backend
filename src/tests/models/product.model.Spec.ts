import { ProductStore } from '../../models/product.model';
import { OrderStore } from '../../models/order.model';
import { UserStore } from '../../models/user.model';

const order = new OrderStore();
const prod = new ProductStore();
const user = new UserStore();

describe('Product Model', () => {
  beforeAll(async () => {
    await user.create({
      user_name: 'userTest0',
      first_name: 'firstTest0',
      last_name: 'lastTest0',
      password: 'passTest0'
    });
    await order.create('1');
  });
  describe('Methods exists', () => {
    it('should have a create method', () => {
      expect(prod.create).toBeDefined();
    });

    it('should have an index method', () => {
      expect(prod.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(prod.show).toBeDefined();
    });

    it('should have an byCategory method', () => {
      expect(prod.byCategory).toBeDefined();
    });

    it('should have an popularProducts method', () => {
      expect(prod.popularProducts).toBeDefined();
    });
  });

  describe('Methods run', () => {
    it('create method should return new product', async () => {
      const result = await prod.create({
        name: 'proTest0',
        price: 1,
        category: 'catTest0'
      });
      expect(result.name).toEqual('proTest0');
      expect(result.price).toBeCloseTo(1);
      expect(result.category).toEqual('catTest0');
    });

    it('index method should return a list of products', async () => {
      await prod.create({
        name: 'proTest0',
        price: 1,
        category: 'catTest0'
      });
      const result = await prod.index();
      expect(result[0].name).toEqual('proTest0');
      expect(result[0].price).toBeCloseTo(1);
      expect(result[0].category).toEqual('catTest0');
    });

    it('show method should return one product with id=1', async () => {
      const result = await prod.show('1');
      expect(result.name).toEqual('proTest0');
      expect(result.price).toBeCloseTo(1);
      expect(result.category).toEqual('catTest0');
    });

    it('byCategory method should return products with category=catTest0', async () => {
      const result = await prod.byCategory('catTest0');
      expect(result[0].name).toEqual('proTest0');
      expect(result[0].price).toBeCloseTo(1);
    });

    it('popularProducts method should return a list of products', async () => {
      await prod.create({
        name: 'proTest0',
        price: 1,
        category: 'catTest0'
      });
      await order.addProduct('1', '1', 1);
      const result = await prod.popularProducts();
      expect(result[0].name).toEqual('proTest0');
      expect(result[0].price).toBeCloseTo(1);
      expect(result[0].category).toEqual('catTest0');
    });
  });
});
