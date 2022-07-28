import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const { TOKEN_SECRET } = process.env;

const verifyAuthToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization as string;
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, TOKEN_SECRET as string);
    next();
  } catch (err) {
    res.status(401);
    res.json('Invalid token');
  }
};

export default verifyAuthToken;
