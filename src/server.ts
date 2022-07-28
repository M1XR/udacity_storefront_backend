import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import handlingBadRequest from './middleware/handlingBadRequest';
import cors from 'cors';
import userRoutes from './handlers/user.handler';
import productRoutes from './handlers/product.handler';
import orderRoutes from './handlers/order.handler';

const app: express.Application = express();
const address: string = '0.0.0.0:3000';

app.use(cors());
app.use(bodyParser.json());
userRoutes(app);
productRoutes(app);
orderRoutes(app);
app.use(handlingBadRequest);

app.listen(3000, (): void => {
  console.log(`starting CORS-enabled web server app on: ${address}`);
});
