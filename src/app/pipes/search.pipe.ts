import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/products';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(productList: Product[], term: string): Product[] {
    return productList.filter(p => p.title.toLowerCase().includes(term.toLowerCase()));
  }

}
