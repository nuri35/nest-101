import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/interfaces/response';
import { Reflector } from '@nestjs/core';
import { MESSAGE_KEY } from 'src/decorators/response.message';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  constructor(private reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<T>, // Burada CallHandler generic tipi belirtiliyor
  ): Observable<Response<T>> {
    const response = context.switchToHttp().getResponse();

    const statusCode = response.statusCode;

    const handler = context.getHandler();
    const defaultMessage =
      statusCode < 400 ? 'Request successful' : 'Request failed';
    const message =
      this.reflector.get<string>(MESSAGE_KEY, handler) || defaultMessage;

    return next.handle().pipe(
      map((data: T) => ({
        message: message,
        data,
      })),
    );
  }
}
