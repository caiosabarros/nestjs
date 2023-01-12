import {
  UseInterceptors,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {plainToClass} from "class-transformer";

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        });
    })
    );
  }
}