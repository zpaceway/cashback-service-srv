import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    res.on('finish', () => {
      const path = req.originalUrl;
      const method = req.method;
      const date = new Date();
      const statusCode = res.statusCode;

      console.log(`${date.toISOString()} ${method} ${path} ${statusCode}`);
    });

    next();
  }
}
