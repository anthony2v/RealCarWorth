import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    console.log(`I'm running before the handler ${context}`);
    const request = context.switchToHttp().getRequest;
    return next.handle().pipe(
      map((data: any) => {
        console.log(`I'm running before the response is sent out ${data}`);
      }),
    );
  }
}
