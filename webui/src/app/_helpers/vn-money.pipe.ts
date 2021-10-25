import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'vnMoney'
})
export class VnMoneyPipe implements PipeTransform {

  transform(number: number): any {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
  }

}
