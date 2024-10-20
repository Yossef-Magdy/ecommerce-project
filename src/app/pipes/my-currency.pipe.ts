import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency } from '@angular/common';

@Pipe({
  name: 'myCurrency',
  standalone: true,
})
export class MyCurrencyPipe implements PipeTransform {
  transform(
    value: number,
    currencyCode: string = 'EGP',
    display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
    digitsInfo: string = '1.2-2',
    locale: string = 'USD'
  ): string | null {
    const customCurrencySymbol = 'E£';
    return formatCurrency(
      value,
      locale,
      customCurrencySymbol,
      currencyCode,
      digitsInfo
    );
  }
}
