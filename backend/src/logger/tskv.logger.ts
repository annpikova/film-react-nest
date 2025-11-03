import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]): string {
    const timestamp = new Date().toISOString();
    const params = optionalParams.length > 0 ? optionalParams.join(' ') : '';
    const fullMessage = params ? `${message} ${params}` : message;

    // Формируем TSKV формат: key=value\tkey2=value2\n
    const fields = [
      `time=${timestamp}`,
      `level=${level}`,
      `message=${String(fullMessage)}`,
    ];

    return fields.join('\t') + '\n';
  }

  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('log', message, optionalParams));
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    process.stderr.write(this.formatMessage('error', message, optionalParams));
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('warn', message, optionalParams));
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('debug', message, optionalParams));
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('verbose', message, optionalParams));
  }
}

