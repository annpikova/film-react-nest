import { DevLogger } from './dev.logger';
import { ConsoleLogger } from '@nestjs/common';

describe('DevLogger', () => {
  let logger: DevLogger;

  beforeEach(() => {
    logger = new DevLogger();
  });

  it('should be an instance of DevLogger', () => {
    expect(logger).toBeInstanceOf(DevLogger);
  });

  it('should extend ConsoleLogger', () => {
    expect(logger).toBeInstanceOf(ConsoleLogger);
  });

  it('should have log method', () => {
    expect(typeof logger.log).toBe('function');
    // Проверяем, что метод вызывается без ошибок
    expect(() => logger.log('Test message')).not.toThrow();
  });

  it('should have error method', () => {
    expect(typeof logger.error).toBe('function');
    expect(() => logger.error('Error message')).not.toThrow();
  });

  it('should have warn method', () => {
    expect(typeof logger.warn).toBe('function');
    expect(() => logger.warn('Warning message')).not.toThrow();
  });

  it('should have debug method', () => {
    expect(typeof logger.debug).toBe('function');
    expect(() => logger.debug('Debug message')).not.toThrow();
  });

  it('should have verbose method', () => {
    expect(typeof logger.verbose).toBe('function');
    expect(() => logger.verbose('Verbose message')).not.toThrow();
  });
});
