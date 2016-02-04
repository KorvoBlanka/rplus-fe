import {Pipe, PipeTransform} from 'angular2/core';

@Pipe({name: 'formatDate'})
export class FormatDatePipe implements PipeTransform {
  transform(value:number, args:string[]) : any {
    var r = '';
    if (value) {
      var d = moment(value * 1000);
      r = d.format('DD.MM.YY hh:mm');
    }
    return r;
  }
}
