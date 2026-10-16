import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pseudocodeFormat',
  standalone: true,
  pure: false
})
export class PseudocodeFormatPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    // 1. Normalize line endings AND convert all non-breaking spaces (\u00A0) into normal spaces ( )
    const normalized = value.replace(/\r\n/g, '\n').replace(/\u00A0/g, ' ');
    const lines = normalized.split('\n');

    // 2. Remove leading/trailing empty lines
    while (lines.length > 0 && lines[0].trim() === '') {
      lines.shift();
    }
    while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
      lines.pop();
    }

    if (lines.length === 0) return '';

    // 3. Find the minimum indentation length across all non-empty lines
    let minIndentLength = Infinity;

    for (const line of lines) {
      if (line.trim() === '') continue;

      const match = line.match(/^[ \t]+/);
      if (match) {
        const len = match[0].length;
        if (len < minIndentLength) {
          minIndentLength = len;
        }
      } else {
        // If any non-empty line has zero indentation, base indent is 0
        minIndentLength = 0;
        break;
      }
    }

    if (minIndentLength === Infinity || minIndentLength === 0) {
      return lines.join('\n').trim();
    }

    // 4. Strip up to that exact indentation length from the start of every line
    const regex = new RegExp(`^[ \\t]{0,${minIndentLength}}`);

    return lines
      .map(line => line.replace(regex, ''))
      .join('\n')
      .trim();
  }
}