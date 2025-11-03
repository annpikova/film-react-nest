import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let stdoutWriteSpy: jest.SpyInstance;
  let stderrWriteSpy: jest.SpyInstance;

  beforeEach(() => {
    logger = new TskvLogger();
    stdoutWriteSpy = jest.spyOn(process.stdout, 'write').mockImplementation();
    stderrWriteSpy = jest.spyOn(process.stderr, 'write').mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should format log messages in TSKV format', () => {
    logger.log('Test message', 'param1');
    expect(stdoutWriteSpy).toHaveBeenCalled();
    const callArgs = stdoutWriteSpy.mock.calls[0][0] as string;

    // Проверяем формат TSKV: key=value\tkey2=value2\n
    expect(callArgs).toContain('time=');
    expect(callArgs).toContain('level=log');
    expect(callArgs).toContain('message=');
    expect(callArgs.endsWith('\n')).toBe(true);

    // Проверяем что поля разделены табуляцией
    const fields = callArgs.trim().split('\t');
    expect(fields.length).toBeGreaterThanOrEqual(3);

    // Проверяем структуру полей
    const timeField = fields.find((f) => f.startsWith('time='));
    const levelField = fields.find((f) => f.startsWith('level='));
    const messageField = fields.find((f) => f.startsWith('message='));

    expect(timeField).toBeDefined();
    expect(levelField).toBe('level=log');
    expect(messageField).toBeDefined();
  });

  it('should format error messages in TSKV format', () => {
    logger.error('Error message');
    expect(stderrWriteSpy).toHaveBeenCalled();
    const callArgs = stderrWriteSpy.mock.calls[0][0] as string;

    expect(callArgs).toContain('level=error');
    expect(callArgs).toContain('message=Error message');
    expect(callArgs.endsWith('\n')).toBe(true);
  });

  it('should format warn messages in TSKV format', () => {
    logger.warn('Warning message');
    expect(stdoutWriteSpy).toHaveBeenCalled();
    const callArgs = stdoutWriteSpy.mock.calls[0][0] as string;

    expect(callArgs).toContain('level=warn');
    expect(callArgs).toContain('message=Warning message');
    expect(callArgs.endsWith('\n')).toBe(true);
  });

  it('should format debug messages in TSKV format', () => {
    logger.debug('Debug message');
    expect(stdoutWriteSpy).toHaveBeenCalled();
    const callArgs = stdoutWriteSpy.mock.calls[0][0] as string;

    expect(callArgs).toContain('level=debug');
    expect(callArgs).toContain('message=Debug message');
    expect(callArgs.endsWith('\n')).toBe(true);
  });

  it('should format verbose messages in TSKV format', () => {
    logger.verbose('Verbose message');
    expect(stdoutWriteSpy).toHaveBeenCalled();
    const callArgs = stdoutWriteSpy.mock.calls[0][0] as string;

    expect(callArgs).toContain('level=verbose');
    expect(callArgs).toContain('message=Verbose message');
    expect(callArgs.endsWith('\n')).toBe(true);
  });

  it('should have valid TSKV format with tab separation', () => {
    logger.log('Test');
    const callArgs = stdoutWriteSpy.mock.calls[0][0] as string;
    const trimmed = callArgs.trim();

    // Проверяем что между полями есть табуляция
    expect(trimmed).toMatch(/time=[^\t]+\tlevel=[^\t]+\tmessage=.+/);
  });
});
