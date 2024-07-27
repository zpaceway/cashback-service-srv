import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    if (
      request.headers['x-api-key'] === process.env.SERVICE_API_KEY ||
      request.originalUrl.startsWith('/api/users')
    ) {
      return true;
    }

    return false;
  }
}
