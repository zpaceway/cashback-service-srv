import { LoggingMiddleware } from './logger.middleware';

describe('LoggingMiddleware', () => {
  it('should be defined', () => {
    expect(new LoggingMiddleware()).toBeDefined();
  });
});
