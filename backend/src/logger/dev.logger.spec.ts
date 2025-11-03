import { DevLogger } from './dev.logger';

describe('DevLogger', () => {
  let logger: DevLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new DevLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log messages', () => {
    logger.log('Test message');
    expect(consoleLogSpy).toHaveBeenCalled();
  });

  it('should log errors', () => {
    logger.error('Error message');
    expect(consoleErrorSpy).toHaveBeenCalled();
  });

  it('should log warnings', () => {
    logger.warn('Warning message');
    expect(consoleWarnSpy).toHaveBeenCalled();
  });

  it('should log debug messages', () => {
    logger.debug('Debug message');
    expect(consoleDebugSpy).toHaveBeenCalled();
  });

  it('should log verbose messages', () => {
    logger.verbose('Verbose message');
    expect(consoleLogSpy).toHaveBeenCalled();
  });
});

