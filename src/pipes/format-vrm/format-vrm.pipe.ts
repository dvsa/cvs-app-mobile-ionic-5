import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatVrm'
})
export class FormatVrmPipe implements PipeTransform {
  constructor() {}

  transform(vrm: string): string {
    return vrm && vrm.length > 4 ? `${vrm.slice(0, 4)} ${vrm.slice(4)}` : vrm;
  }
}
