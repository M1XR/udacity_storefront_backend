import { Request, Response } from 'express';
import path from 'path';

// handling Bad Requests
const handlingBadRequest = (req: Request, res: Response): void => {
  try {
    res.sendFile(path.join(__dirname, '../../views/badRequest.html'));
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};

export default handlingBadRequest;
