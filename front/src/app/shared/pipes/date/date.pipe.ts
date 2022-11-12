import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'datePipe',
})
export class DatePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    return new Date(value).toLocaleDateString();
  }
}
