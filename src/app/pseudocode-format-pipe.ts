import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pseudocodeFormat',
})
export class PseudocodeFormatPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
