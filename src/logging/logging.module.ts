import { MiddlewareConsumer, Module } from '@nestjs/common';
import { LoggingMiddleware } from './logging.middleware';

@Module({})
export class LoggingModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
