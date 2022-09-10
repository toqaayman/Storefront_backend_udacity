import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

const AuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHead = req.headers.authorization as string;
    const token: string = authHead ? authHead.split(' ')[1]: ''
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    next()
    return;
  } catch (err) {
    if (err instanceof Error) {
      res.status(401).send('Unauthenticated ' + err.message);
    }
  }
}

export default AuthToken;