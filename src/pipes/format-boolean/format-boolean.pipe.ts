import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatBoolean'
})
export class FormatBooleanPipe implements PipeTransform {
  constructor() {}

  transform(inputValue: boolean): string {
    return inputValue ? 'Yes' : 'No';
  }
}
