import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let consoleLogSpy: jest.SpyInstance;
  let consoleErrorSpy: jest.SpyInstance;
  let consoleWarnSpy: jest.SpyInstance;
  let consoleDebugSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new JsonLogger();
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format log messages as JSON', () => {
    logger.log('Test message', 'param1', 'param2');
    expect(consoleLogSpy).toHaveBeenCalled();
    const callArgs = consoleLogSpy.mock.calls[0][0];
    const parsed = JSON.parse(callArgs);
    expect(parsed.level).toBe('log');
    expect(parsed.message).toBe('Test message');
    expect(parsed.optionalParams).toEqual(['param1', 'param2']);
  });

  it('should format error messages as JSON', () => {
    logger.error('Error message', 'error1');
    expect(consoleErrorSpy).toHaveBeenCalled();
    const callArgs = consoleErrorSpy.mock.calls[0][0];
    const parsed = JSON.parse(callArgs);
    expect(parsed.level).toBe('error');
    expect(parsed.message).toBe('Error message');
  });

  it('should format warn messages as JSON', () => {
    logger.warn('Warning message');
    expect(consoleWarnSpy).toHaveBeenCalled();
    const callArgs = consoleWarnSpy.mock.calls[0][0];
    const parsed = JSON.parse(callArgs);
    expect(parsed.level).toBe('warn');
    expect(parsed.message).toBe('Warning message');
  });

  it('should format debug messages as JSON', () => {
    logger.debug('Debug message');
    expect(consoleDebugSpy).toHaveBeenCalled();
    const callArgs = consoleDebugSpy.mock.calls[0][0];
    const parsed = JSON.parse(callArgs);
    expect(parsed.level).toBe('debug');
    expect(parsed.message).toBe('Debug message');
  });

  it('should format verbose messages as JSON', () => {
    logger.verbose('Verbose message');
    expect(consoleLogSpy).toHaveBeenCalled();
    const callArgs = consoleLogSpy.mock.calls[0][0];
    const parsed = JSON.parse(callArgs);
    expect(parsed.level).toBe('verbose');
    expect(parsed.message).toBe('Verbose message');
  });
});

