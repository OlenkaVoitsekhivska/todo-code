import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../../models';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(todos: Todo[], filter: boolean): Todo[] {
    if (filter) {
      return [...todos].filter(todo => todo.complete);
    }
    return [...todos].filter(todo => !todo.complete);
  }
}
