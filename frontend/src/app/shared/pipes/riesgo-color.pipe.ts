import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'riesgoColor',
  standalone: true
})
export class RiesgoColorPipe implements PipeTransform {

  transform(value: string): string {

    switch (value) {
      case 'BAJO':
        return 'green';

      case 'MEDIO':
        return 'orange';

      case 'ALTO':
        return 'darkorange';

      case 'CRITICO':
        return 'red';

      default:
        return 'black';
    }

  }

}