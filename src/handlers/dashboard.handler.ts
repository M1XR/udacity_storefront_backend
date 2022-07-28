import express, { Request, Response } from 'express';

import { DashboardQueries } from '../services/dashboard';

const dashboard = new DashboardQueries();

const getMostPopular = async (_req: Request, res: Response) => {
  try {
    const products = await dashboard.mostPopular();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const dashboardRoutes = (app: express.Application) => {
  app.get('/most-popular', getMostPopular);
};

export default dashboardRoutes;
