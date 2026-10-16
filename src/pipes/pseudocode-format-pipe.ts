import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pseudocodeFormat',
  standalone: true,
})
export class PseudocodeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const lines = value.replace(/\r\n/g, '\n').split('\n');
    if (lines.length > 0 && lines[0].trim() === '') lines.shift();
    if (lines.length > 0 && lines[lines.length - 1].trim() === '') lines.pop();
    if (lines.length === 0) return '';

    const firstLine = lines.find(l => l.trim().length > 0) || '';
    const match = firstLine.match(/^[ \t\u00A0]+/);
    if (!match) return lines.join('\n').trim();

    const indentPrefix = match[0]; 
    return lines.map(line => {
        if (line.startsWith(indentPrefix)) return line.slice(indentPrefix.length);
        return line.trim() === '' ? '' : line.trimStart();
      }).join('\n').trim();
  }
}