import supertest from 'supertest';
import app from '../server';

const request = supertest(app);

let token: string;

describe('Endpoint Tests', () => {
  describe('/users Endpoint Test', () => {
    it('[POST] /users should response with status 200', async () => {
      const response = await request
        .post('/users')
        .send({ user_name: 'test', first_name: 'test', last_name: 'test', password: 'test' });
      token = response.text;
      expect(response.status).toBe(200);
    });

    it('[GET] /users should response with status 200', async () => {
      const response = await request.get('/users').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('[GET] /users/:id should response with status 200', async () => {
      const response = await request.get('/users/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('[GET] /users/auth should response with status 200', async () => {
      const response = await request
        .get('/users/auth')
        .set('Authorization', `Bearer ${token}`)
        .send({ user_name: 'test', password: 'test' });
      expect(response.status).toBe(200);
    });

    it('[POST] /products should response with status 200', async () => {
      const response = await request
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'test', price: 1, category: 'test' });
      expect(response.status).toBe(200);
    });

    it('[GET] /products should response with status 200', async () => {
      const response = await request.get('/products');
      expect(response.status).toBe(200);
    });

    it('[GET] /products/:id should response with status 200', async () => {
      const response = await request.get('/products/1');
      expect(response.status).toBe(200);
    });

    it('[GET] /products/category/:category should response with status 200', async () => {
      const response = await request.get('/products/category/test');
      expect(response.status).toBe(200);
    });

    it('[POST] /orders/:userId should response with status 200', async () => {
      const response = await request.post('/orders/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('[POST] /orders/add-product should response with status 200', async () => {
      const response = await request
        .post('/orders/')
        .set('Authorization', `Bearer ${token}`)
        .send({ order_id: '1', product_id: '1', quantity: 1 });
      expect(response.status).toBe(200);
    });

    it('[PUT] /orders/update-qty should response with status 200', async () => {
      const response = await request
        .put('/orders/update-qty')
        .set('Authorization', `Bearer ${token}`)
        .send({ order_id: '1', product_id: '1', quantity: '3' });
      expect(response.status).toBe(200);
    });

    it('[GET] /orders/curr-by-user/:userId should response with status 200', async () => {
      const response = await request.get('/orders/curr-by-user/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('[PUT] /orders/update-status/:id should response with status 200', async () => {
      const response = await request.put('/orders/update-status/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('[GET] /orders/com-by-user/:userId should response with status 200', async () => {
      const response = await request.get('/orders/com-by-user/1').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('[GET] /products/popular should response with status 200', async () => {
      const response = await request.get('/products/popular').set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
    });

    it('[DELETE] /orders/delete-product should response with status 200', async () => {
      const response = await request
        .delete('/orders/delete-product')
        .set('Authorization', `Bearer ${token}`)
        .send({ order_id: '1', product_id: '1' });
      expect(response.status).toBe(200);
    });
  });
});
