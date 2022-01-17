import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token =
      req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
      return res.status(403).send('A token is required for authentication');
    }
    try {
      const decoded = jwt.verify(token, 'AAAA');

      res.status(200).json({ status: 200, decoded });
    } catch (err) {
      return res.status(401).send('Invalid Token');
    }
    next();
  }
}
