import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user.model';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import verifyAuthToken from '../middleware/verifyAuthToken';

dotenv.config();
const { TOKEN_SECRET } = process.env;

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const user = await store.show(req.params.id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password
    };

    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, TOKEN_SECRET as string);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const authenticate = async (req: Request, res: Response) => {
  try {
    const auth = await store.authenticate(req.body.user_name, req.body.password);
    res.send(auth);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/api/users', verifyAuthToken, index);
  app.get('/api/users/:id', verifyAuthToken, show);
  app.post('/api/users', create);
  app.get('/api/auth', verifyAuthToken, authenticate);
};

export default userRoutes;
