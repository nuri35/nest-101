import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  BadRequestException,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse();
    const status = exception.getStatus();

    const request = context.getRequest<Request>();

    const exceptionResponse: any = exception.getResponse();

    const message = this.formatMessage(exception, exceptionResponse);
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }

  private formatMessage(
    exception: HttpException,
    exceptionResponse: any,
  ): string {
    if (exception instanceof BadRequestException) {
      const responseMessage = exceptionResponse.message;
      if (Array.isArray(responseMessage)) {
        return responseMessage.join(', ');
      } else if (typeof responseMessage === 'string') {
        return responseMessage;
      }
    }
    return exception.message;
  }
}
