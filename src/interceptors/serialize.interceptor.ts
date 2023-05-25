import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { plainToClass } from 'class-transformer';
import { UserDTO } from 'src/users/dtos/user.dto';

export class SerializeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data: any) => {
        return plainToClass(UserDTO, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
