import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTimestamp',
})
export class CustomTimestampPipe implements PipeTransform {
  transform(ms: number | undefined | null): Date {
    return new Date(ms ?? 0);
  }
}
