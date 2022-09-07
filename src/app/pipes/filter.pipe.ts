import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../../models';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(todos: Todo[], filter: boolean): Todo[] {
    return [...todos].filter(todo => (filter ? todo.complete : !todo.complete));
  }
}
