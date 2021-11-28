import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtercustome'
})
export class FilterPipecustome implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    
    return items.filter(item => {

      return Object.keys(item).some(key => {
      //  console.log(item);
       console.log(item['item']['ApplicationForm_submission']['nSpotReferenceId']);

        return String(item['item']['ApplicationForm_submission']['nSpotReferenceId']).toLowerCase().includes(searchText.toLowerCase());
      });
    });
   }
  // transform(value: any, args?: any): any {
  //   if(!args)
  //    return value;
  //   return value.filter(
  //     item => item.product_name.toLowerCase().indexOf(args.toLowerCase()) > -1
  //  );
  // }
}
