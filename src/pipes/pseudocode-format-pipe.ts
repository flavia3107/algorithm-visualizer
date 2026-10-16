import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pseudocodeFormat',
  standalone: true
})
export class PseudocodeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const trimmed = value.trim();
    const lines = trimmed.split('\n');
    const firstLineIndent = lines[0]?.match(/^\s*/)?.[0].length || 0;

    return lines
      .map(line => line.slice(firstLineIndent))
      .join('\n');
  }
}