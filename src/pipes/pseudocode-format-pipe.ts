import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pseudocodeFormat',
  standalone: true,
  pure: false
})
export class PseudocodeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const lines = value.replace(/\r\n/g, '\n').split('\n');
    if (lines.length > 0 && lines[0].trim() === '')  lines.shift();
    if (lines.length > 0 && lines[lines.length - 1].trim() === '')  lines.pop();
    
    let baseIndent = '';
    for (const line of lines) {
      if (line.trim().length > 0) {
        const match = line.match(/^[ \t\u00A0]+/);
        if (match)  baseIndent = match[0];
        break;
      }
    }

    if (!baseIndent) return lines.join('\n').trim();

    return lines.map(line => line.startsWith(baseIndent) ?  line.slice(baseIndent.length) : line).join('\n') .trim();
  }
}