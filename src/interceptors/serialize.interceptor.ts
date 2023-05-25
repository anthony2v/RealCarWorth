import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

// interface that describes any class
interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(DTO: ClassConstructor) {
  return UseInterceptors(new SerializeInterceptor(DTO));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly DTO: ClassConstructor) {}

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToInstance(this.DTO, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
