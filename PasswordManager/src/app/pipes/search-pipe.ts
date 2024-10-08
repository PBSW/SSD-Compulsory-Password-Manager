import { Pipe, PipeTransform } from '@angular/core';
import {CredentialsResponse} from '../../models/response';

@Pipe({
  standalone: true,
  name: 'filter'
})
export class SearchPipe implements PipeTransform {

  transform(items: CredentialsResponse[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    if (searchText == "") return items;

    searchText = searchText.toLowerCase();

    return items.filter(it => {
      return it.serviceName.toLowerCase().includes(searchText)
        || it.serviceUsername.toLowerCase().includes(searchText);
    });
  }
}
